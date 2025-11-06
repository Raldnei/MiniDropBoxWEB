from fastapi import FastAPI, HTTPException, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from minio import Minio
from io import BytesIO
from datetime import timedelta

# Importar o urllib3 
import urllib3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Criar um cliente HTTP com timeouts curtos
http_client = urllib3.PoolManager(
    timeout=urllib3.Timeout(
        connect=2.0, 
        read=300.0    
    ),
    retries=urllib3.Retry(
        total=2, 
        backoff_factor=0.1
    )
)


client = Minio(
    "localhost:9000", # Aponta para o  Nginx
    access_key="admin",
    secret_key="admin123",
    secure=False,
    http_client=http_client 
)


print("\n\n### API TA PEGANDO ###\n\n")


BUCKET_NAME = "dropbox"
if not client.bucket_exists(BUCKET_NAME):
    client.make_bucket(BUCKET_NAME)

# Upload com descrição salva como metadado
@app.post("/upload/")
async def upload(file: UploadFile, descricao: str = Form(...)):
    data = await file.read()
    metadata = {"x-amz-meta-descricao": descricao}

    client.put_object(
        BUCKET_NAME,
        file.filename,
        BytesIO(data),
        length=len(data),
        metadata=metadata
    )
    return {"filename": file.filename, "descricao": descricao}


# Listar arquivos + URL temporária + descrição
@app.get("/list/")
def list_files():
    result = []
    
    
    try:
        for obj in client.list_objects(BUCKET_NAME):
            try:
                stat = client.stat_object(BUCKET_NAME, obj.object_name)
                descricao = stat.metadata.get("x-amz-meta-descricao", "")
                
                url = client.get_presigned_url(
                    "GET",
                    BUCKET_NAME,
                    obj.object_name,
                    expires=timedelta(hours=1)
                )
                # Passar os links de cada Cluster
                url = url.replace("http://minio1:9000", "http://localhost:9000")
                url = url.replace("http://minio2:9000", "http://localhost:9000")
                url = url.replace("http://minio3:9000", "http://localhost:9000")

                result.append({"name": obj.object_name, "url": url, "descricao": descricao})
            
            except Exception as e:
                # Se falhar ao buscar pula para o próximo
                print(f"Erro ao processar objeto {obj.object_name}: {e}") 
                continue
                
    except Exception as e:
        # Se lascar tudo
        print(f"Erro CRÍTICO MAYDAY MAYDAY {e}")
        return [] 
        
    return result


# Baixar arquivo
@app.get("/download/{filename}")
def download_file(filename: str):
    try:
        obj = client.get_object(BUCKET_NAME, filename)
        return StreamingResponse(
            obj,
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")