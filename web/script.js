// Base URL da nossa API FastAPI
const API_BASE = "http://127.0.0.1:8000";

// Pegando os elementos do DOM que vamos usar
const uploadForm = document.getElementById("uploadForm"); 
const fileInput = document.getElementById("fileInput"); 
const descricaoInput = document.getElementById("descricaoInput"); 
const uploadStatus = document.getElementById("uploadStatus"); 

const listStatus = document.getElementById("listStatus"); 
const filesList = document.getElementById("filesList"); 

// Seções da página (enviar e baixar)
const secaoEnviar = document.getElementById("secaoEnviar");
const secaoBaixar = document.getElementById("secaoBaixar");
const btnEnviar = document.getElementById("btnEnviar"); 
const btnBaixar = document.getElementById("btnBaixar"); 

// Modal para visualizar imagem
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg"); 
const descricaoImg = document.getElementById("descricaoImg"); 
const botaoDownload = document.getElementById("botaoDownload"); 
const fecharModal = document.querySelector(".fechar");

// Alternar entre seções

btnEnviar.onclick = () => {
  secaoEnviar.style.display = "block"; 
  secaoBaixar.style.display = "none";
};

btnBaixar.onclick = () => {
  secaoEnviar.style.display = "none"; 
  secaoBaixar.style.display = "block"; 
  carregarLista(); 
};

// Envio de arquivo

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const file = fileInput.files[0]; 
  const descricao = descricaoInput.value.trim();

  // validações básicas
  if (!file) return alert("Selecione um arquivo!");
  if (!descricao) return alert("Digite uma descrição!");

  uploadStatus.textContent = "Enviando..."; 

  // cria o FormData para enviar o arquivo e a descrição
  const formData = new FormData();
  formData.append("file", file);
  formData.append("descricao", descricao);

  try {
    // faz a requisição POST para a API
    const res = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Erro no upload"); 
    const data = await res.json();
    
    // mostra mensagem de sucesso
    uploadStatus.textContent = `✅ Enviado: ${data.filename}`;
    fileInput.value = ""; 
    descricaoInput.value = ""; 
  } catch (err) {
    console.error(err);
    uploadStatus.textContent = "❌ Erro ao enviar arquivo"; 
  }
});

// Listar arquivos

async function carregarLista() {
  listStatus.textContent = "Carregando..."; 
  filesList.innerHTML = ""; 

  try {
    const res = await fetch(`${API_BASE}/list/`); 
    if (!res.ok) throw new Error("Falha ao listar arquivos");
    const arquivos = await res.json();

    if (!arquivos.length) {
      filesList.innerHTML = "<p class='muted'>Nenhum arquivo encontrado.</p>";
    } else {
      arquivos.forEach((item) => {
        const div = document.createElement("div"); 
        div.className = "item-lista";

        const img = document.createElement("img"); 
        img.src = item.url;
        img.alt = item.name;
        img.className = "miniatura";
        img.onclick = () => abrirModal(item); 

        const nome = document.createElement("p"); 
        nome.textContent = item.name;

        div.appendChild(img);
        div.appendChild(nome);
        filesList.appendChild(div); 
      });
    }

    listStatus.textContent = ""; 
  } catch (err) {
    console.error(err);
    listStatus.textContent = "❌ Erro ao carregar lista.";
  }
}

// Abrir modal com imagem + descrição + download

function abrirModal(item) {
  modal.style.display = "flex"; 
  modalImg.src = item.url; 
  descricaoImg.textContent = item.descricao || "Sem descrição."; 
  botaoDownload.onclick = () => {
    window.open(`${API_BASE}/download/${item.name}`, "_blank");
  };
}


if (fecharModal) {
  fecharModal.onclick = () => {
    modal.style.display = "none"; 
  };
}

// fecha modal se clicar fora da imagem
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
