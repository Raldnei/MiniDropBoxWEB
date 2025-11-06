<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=850&lines=Este+%C3%A9+um+prot%C3%B3tipo+de+mini+Dropbox+com+fins+educacionais&color=6A0DAD" alt="Typing SVG" />

# 🧾 Tecnologias utilizadas
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" width="32" height="32" style="margin-right: 10px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" width="32" height="32" style="margin-right: 10px;" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" width="40" height="40" style="margin-right: 10px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="32" height="32" style="margin-right: 10px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="32" height="32" style="margin-right: 10px;" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="32" height="32" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" width="32" height="32" style="margin-right: 10px;" />
</p>

---

## 📂 Estrutura do Projeto

```
📁 MiniDropBox/
├── docker-compose.yml
├── app.py                 # FastAPI + MinIO API
├── web/                    # Front-end
│   ├── index.html
│   ├── style.css
│   └── script.js
├── nginx.conf
├── requirements.txt
└── data/                   # Volumes Docker para persistência
```
---

## 🚀 Como Rodar o Projeto

### ✅ Pré-requisitos

- Docker  
- Docker Desktop  
- Git (opcional)  
- Navegador moderno para acessar o front-end
- LiveServer ou Live Preview(Sugestão para vizualização rápida)

---

### 🧠 Etapas para rodar:

1. **Abra o Docker Desktop** e verifique se o **Docker Engine está rodando**.

2. **Clone o repositório ou abra a pasta do projeto**.

3. No terminal, execute:

```bash
docker-compose up --build
```

4. Em seguida abra novamente o terminal e execute:
```bash
pip install urllib3
```

5. Inicie a API usando o seguinte comando no terminal:

```bash
uvicorn app:app --reload
```

Isso iniciará o MinIO e o backend FastAPI.
---
4. Aguarde até que os MinIOs estejam completamente iniciados.

   - MinIO 1: API http://localhost:9001 | Console http://localhost:9005
   - MinIO 2: API http://localhost:9002 | Console http://localhost:9006
   - MinIO 3: API http://localhost:9003 | Console http://localhost:9007

Ao acessar basta informas o seguinte usuário e senha.
   - Usuário: `admin`
   - Senha: `admin123`

---

## 🌐 Acessando o Sistema

- Front-end: http://127.0.0.1:5500/web/index.html (ou conforme porta do Live Server se utilizado)
- API FastAPI: http://127.0.0.1:8000
---

## 📦 Comandos úteis

```bash
# Subir os containers (backend + MinIO)
docker-compose up -d

# Parar todos os containers
docker-compose down

# Ver logs do backend FastAPI
docker-compose logs main

# Ver logs do MinIO
docker-compose logs minio
```

---

## ⚙️ Funcionalidades do Sistema

- Upload de arquivos com descrição  
- Listagem de arquivos com miniaturas e descrição  
- Download de arquivos diretamente pelo front-end  
- Modal para visualizar imagem e descrição antes de baixar  
- Persistência de arquivos via volumes Docker no MinIO  

---

## 🌐 Endpoints da API

- **POST /upload/** → envia arquivo + descrição  
- **GET /list/** → lista todos os arquivos com URLs temporárias  
- **GET /download/{filename}** → baixa arquivo específico  

---

## 💡 Dicas

- Use **Uvicorn com --reload** para desenvolvimento:  

```bash
uvicorn main:app --reload
```

- Front-end pode ser aberto com **Live Server** para atualização automática.  
- O MinIO utiliza um bucket chamado `dropbox` e cria automaticamente se não existir.  
- Se algum container falhar, os volumes Docker garantem que os arquivos não sejam perdidos.  
---

## ⚡ Escalabilidade e Tolerância a Falhas

- **Escalabilidade:**  
 > O FastAPI permite atender múltiplas requisições simultaneamente.  
 > HTML, CSS e JS separados tornam o front-end modular e fácil de atualizar.  
 > O MinIO facilita a expansão do armazenamento conforme a necessidade.

- **Tolerância a falhas:**  
> O MinIO replica arquivos nos volumes Docker para evitar perda de dados.  
> O FastAPI trata erros e mantém o sistema ativo mesmo em caso de falhas.  
> Três volumes Docker foram utilizados para garantir redundância: se um falhar, os outros mantêm o sistema funcional.


---

## 📌 Observações

- Este projeto é **um protótipo para fins educativos** e não deve ser usado em produção sem ajustes de segurança.  
- URLs temporárias geradas pelo MinIO expiram após 1 hora.  
- Arquivos grandes podem exigir configuração adicional no Docker e FastAPI.


---
## Autores 🧑‍💻

| <img src="https://avatars.githubusercontent.com/Raldnei" width="50" height="50" style="border-radius: 50%;"> | [**Raldnei Miguel**](https://github.com/Raldnei)<br><small>Desenvolvedor</small> |
|---------------------------------------------------------------|--------------------------------------------------------------------------------------|
| <img src="https://avatars.githubusercontent.com/Messias-Acacy" width="50" height="50" style="border-radius: 50%;"> | [**Messias Accacy**](https://github.com/Messias-Acacy)<br><strong>Desenvolvedor</strong> |

---
