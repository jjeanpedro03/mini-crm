document.addEventListener("DOMContentLoaded", () => {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    const tituloInput = document.getElementById("titulo");
    const descricaoInput = document.getElementById("descricao");
    const btnCriar = document.getElementById("btnCriar");
    const lista = document.getElementById("listaChamados");

    btnCriar.addEventListener("click", criarChamado);

    lista.addEventListener("click", (event) => {
        const index = Number(event.target.dataset.index);

        if (event.target.classList.contains("btn-status")) {
            mudarStatus(index);
        }

        if (event.target.classList.contains("btn-delete")) {
            excluirChamado(index);
        }
    });

    function criarChamado() {
        const titulo = tituloInput.value;
        const descricao = descricaoInput.value;

        if (!titulo || !descricao) {
            alert("Preencha todos os campos");
            return;
        }

        const novoChamado = {
            titulo,
            descricao,
            status: "Aberto",
        };

        chamados.push(novoChamado);
        salvarDados();
        renderizarChamados();

        tituloInput.value = "";
        descricaoInput.value = "";
    }

    function renderizarChamados() {
        lista.innerHTML = "";

        chamados.forEach((chamado, index) => {
            lista.innerHTML += `
                <div class="chamado">
                    <h3>${chamado.titulo}</h3>
                    <p>${chamado.descricao}</p>

                    <span class="status ${getClasseStatus(chamado.status)}">
                        ${chamado.status}
                    </span>

                    <div class="acoes">
                        <button class="btn-status" data-index="${index}">
                            Alterar Status
                        </button>

                        <button class="btn-delete" data-index="${index}">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
        });
    }

    function mudarStatus(index) {
        const statusAtual = chamados[index].status;

        if (statusAtual === "Aberto") {
            chamados[index].status = "Em andamento";
        } else if (statusAtual === "Em andamento") {
            chamados[index].status = "Resolvido";
        } else {
            chamados[index].status = "Aberto";
        }

        salvarDados();
        renderizarChamados();
    }

    function excluirChamado(index) {
        chamados.splice(index, 1);
        salvarDados();
        renderizarChamados();
    }

    function getClasseStatus(status) {
        if (status === "Aberto") return "aberto";
        if (status === "Em andamento") return "andamento";
        return "resolvido";
    }

    function salvarDados() {
        localStorage.setItem("chamados", JSON.stringify(chamados));
    }

    renderizarChamados();
});
