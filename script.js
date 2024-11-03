let dinheiro = 1000;
let reputacao = 50;
let moral = 100;
let turno = 0;
let concorrenteReputacao = 50;
let nivelDificuldade = "facil"; // Dificuldade inicial
let funcionarios = []; // Lista de funcionários
let projetos = []; // Lista de projetos

// Configurações de dificuldade
const dificuldades = {
    facil: { concorrenteCrescimento: 5 },
    medio: { concorrenteCrescimento: 10 },
    dificil: { concorrenteCrescimento: 15 },
    impossivel: { concorrenteCrescimento: 20 }
};

// Atualiza a dificuldade do jogo
function mudarDificuldade() {
    nivelDificuldade = document.getElementById("dificuldade").value;
    document.getElementById("nivel-dificuldade").innerText = nivelDificuldade.charAt(0).toUpperCase() + nivelDificuldade.slice(1);
}

// Simula um turno
function simularTurno() {
    turno++;
    dinheiro += 100; // Exemplo de ganho por turno
    reputacao += Math.floor(Math.random() * 5); // Aumento aleatório de reputação
    concorrenteReputacao += dificuldades[nivelDificuldade].concorrenteCrescimento; // Crescimento da reputação do concorrente

    // Atualiza os valores na interface
    document.getElementById("dinheiro").innerText = dinheiro;
    document.getElementById("reputacao").innerText = reputacao;
    document.getElementById("turno").innerText = turno;
    document.getElementById("concorrente-reputacao").innerText = concorrenteReputacao;

    // Log de histórico
    const historicoDiv = document.getElementById("historico");
    historicoDiv.innerHTML += `<p>Turno ${turno}: Dinheiro: R$ ${dinheiro}, Reputação: ${reputacao}, Concorrente: ${concorrenteReputacao}</p>`;
}

// Adiciona funcionário
function adicionarFuncionario() {
    const nomeFuncionario = document.getElementById("nome-funcionario").value;
    const nivelFuncionario = parseInt(document.getElementById("nivel-funcionario").value);
    const salarios = [100, 200, 300];
    
    if (dinheiro >= salarios[nivelFuncionario]) {
        dinheiro -= salarios[nivelFuncionario];
        document.getElementById("dinheiro").innerText = dinheiro;

        funcionarios.push({ nome: nomeFuncionario, nivel: nivelFuncionario });
        atualizarListaFuncionarios();
        alert(`Funcionário ${nomeFuncionario} adicionado ao nível ${nivelFuncionario + 1}!`);
        document.getElementById("nome-funcionario").value = ""; // Limpa o campo
    } else {
        alert("Dinheiro insuficiente para contratar funcionário!");
    }
}

// Atualiza a lista de funcionários na interface
function atualizarListaFuncionarios() {
    const listaFuncionarios = document.getElementById("lista-funcionarios");
    listaFuncionarios.innerHTML = ""; // Limpa a lista atual
    funcionarios.forEach(funcionario => {
        const li = document.createElement("li");
        li.textContent = `${funcionario.nome} - Nível ${funcionario.nivel + 1}`;
        listaFuncionarios.appendChild(li);
    });
}

// Remover Funcionário
function removerFuncionario() {
    const nomeRemover = document.getElementById("nome-remover").value;
    funcionarios = funcionarios.filter(funcionario => funcionario.nome !== nomeRemover);
    atualizarListaFuncionarios();
    alert(`Funcionário ${nomeRemover} removido!`);
    document.getElementById("nome-remover").value = ""; // Limpa o campo
}

// Promover Funcionário
function promoverFuncionario() {
    const nomePromover = document.getElementById("nome-promover").value;
    const funcionario = funcionarios.find(func => func.nome === nomePromover);
    if (funcionario && funcionario.nivel < 2) {
        funcionario.nivel++;
        alert(`Funcionário ${nomePromover} promovido para Nível ${funcionario.nivel + 1}!`);
        atualizarListaFuncionarios();
    } else {
        alert("Funcionário não encontrado ou já no nível máximo.");
    }
    document.getElementById("nome-promover").value = ""; // Limpa o campo
}

// Realizar Investimento
function realizarInvestimento(tipo) {
    const investimento = parseInt(document.getElementById("investimento-marketing").value);
    if (dinheiro >= investimento) {
        dinheiro -= investimento;
        document.getElementById("dinheiro").innerText = dinheiro;
        alert(`Investimento de R$ ${investimento} realizado em ${tipo}!`);
        document.getElementById("investimento-marketing").value = ""; // Limpa o campo
    } else {
        alert("Dinheiro insuficiente para realizar o investimento!");
    }
}

// Iniciar Projeto Especial
function iniciarProjeto() {
    const nomeProjeto = document.getElementById("nome-projeto").value;
    if (nomeProjeto) {
        projetos.push(nomeProjeto);
        atualizarListaProjetos();
        alert(`Projeto ${nomeProjeto} iniciado!`);
        document.getElementById("nome-projeto").value = ""; // Limpa o campo
    } else {
        alert("Por favor, insira um nome para o projeto!");
    }
}

// Atualiza a lista de projetos na interface
function atualizarListaProjetos() {
    const listaProjetos = document.getElementById("lista-projetos");
    listaProjetos.innerHTML = ""; // Limpa a lista atual
    projetos.forEach(projeto => {
        const li = document.createElement("li");
        li.textContent = projeto;
        listaProjetos.appendChild(li);
    });
}

// Encerrar Projeto
function encerrarProjeto() {
    const nomeProjetoEncerrar = document.getElementById("nome-projeto-encerrar").value;
    const projetoIndex = projetos.indexOf(nomeProjetoEncerrar);
    if (projetoIndex !== -1) {
        projetos.splice(projetoIndex, 1);
        atualizarListaProjetos();
        alert(`Projeto ${nomeProjetoEncerrar} encerrado!`);
    } else {
        alert("Projeto não encontrado!");
    }
    document.getElementById("nome-projeto-encerrar").value = ""; // Limpa o campo
}

// Contratar Consultor
function contratarConsultor() {
    const custoConsultor = parseInt(document.getElementById("custo-consultor").value);
    if (dinheiro >= custoConsultor) {
        dinheiro -= custoConsultor;
        document.getElementById("dinheiro").innerText = dinheiro;
        alert(`Consultor contratado por R$ ${custoConsultor}!`);
        document.getElementById("custo-consultor").value = ""; // Limpa o campo
    } else {
        alert("Dinheiro insuficiente para contratar o consultor!");
    }
}

// Investir em P&D
function investirPD() {
    const investimentoPD = parseInt(document.getElementById("investimento-pd").value);
    if (dinheiro >= investimentoPD) {
        dinheiro -= investimentoPD;
        document.getElementById("dinheiro").innerText = dinheiro;
        alert(`Investimento de R$ ${investimentoPD} realizado em P&D!`);
        document.getElementById("investimento-pd").value = ""; // Limpa o campo
    } else {
        alert("Dinheiro insuficiente para investir em P&D!");
    }
}
