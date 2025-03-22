
const formCadastro = document.getElementById("formCliente");
const endpoint = "http://localhost:3400/clientes";

function manipularForm(evento){
    if (!formCadastro.checkValidity()){
        formCadastro.classList.add('was-validated');
    }
    else{
        cadastrandoCliente();
        formCadastro.reset();
        mostrarTabela();
    }
    evento.preventDefault();
    evento.stopPropagation();
}

function pegandoDados(){
    const cpf = document.getElementById("cpfRegister").value;
    const nomeCliente = document.getElementById("cliRegister").value;
    const nomePacote = document.getElementById("packRegister").value;
    const dataPartida = document.getElementById("dateRegister").value;
    const endereco = document.getElementById("endRegister").value;

    return {
        "cpf": cpf,
        "nomeCliente": nomeCliente,
        "nomePacote": nomePacote,
        "dataPartida": dataPartida,
        "endereco": endereco
    }
}

function cadastrandoCliente(){
    const dadosCliente = pegandoDados();
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosCliente)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });
}

function atualizandoCliente(){
    const dadosCliente = pegandoDados();
    fetch(endpoint, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosCliente)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });

    formCadastro.reset();
    document.getElementById("cpfRegister").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("excluir").disabled = true;
}

function excluidoCliente(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cpf: document.getElementById("cpfRegister").value
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });
    
    formCadastro.reset();
    document.getElementById("cpfRegister").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("excluir").disabled = true;
}

function mostrarMensagem(mensagem, tipo="success"){
    const aviso = document.getElementById("alert-message");
    aviso.innerHTML = `<div class="alert alert-${tipo}" role="alert">Mensagem: ${mensagem}</div>`
    setInterval(() => {
        aviso.innerHTML = "";
    }, 5000);
}

function mostrarTabela(){
    fetch(endpoint, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            const clientes = dadosRecebidos.clientes;
            if (clientes.length > 0){
                const divTable = document.getElementById("get-tab");
                divTable.innerHTML = "";
                const table = document.createElement("table");
                table.className = "table table-striped table-hover";
                const header = document.createElement("thead");
                const body = document.createElement("tbody");
                header.innerHTML = `
                    <tr>
                        <th>CPF</th>
                        <th>Cliente</th>
                        <th>Pacote</th>
                        <th>Data</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                `;
                table.appendChild(header);
                for (let i = 0; i < clientes.length; i++){
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${clientes[i].cpf}</td>
                        <td>${clientes[i].nomeCliente}</td>
                        <td>${clientes[i].nomePacote}</td>
                        <td>${clientes[i].dataPartida}</td>
                        <td>${clientes[i].endereco}</td>
                        <td>
                            <button style="width:60px" class="btn btn-sm btn-warning" onclick="btnPegarDados(
                            '${clientes[i].cpf}',
                            '${clientes[i].nomeCliente}',
                            '${clientes[i].nomePacote}',
                            '${clientes[i].dataPartida}',
                            '${clientes[i].endereco}','atualizar'
                            )">Editar<button>
                            <button style="width:60px" class="btn btn-sm btn-danger" onclick="btnPegarDados(
                            '${clientes[i].cpf}',
                            '${clientes[i].nomeCliente}',
                            '${clientes[i].nomePacote}',
                            '${clientes[i].dataPartida}',
                            '${clientes[i].endereco}','excluir'
                            )">Delete</button>
                        </td>
                    `;
                    table.appendChild(linha);
                }
                table.appendChild(body);
                divTable.appendChild(table);
            }
            else{
                mostrarMensagem("Não há pacotes", "warning");
            }
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    })
}

function btnPegarDados(cpf, nome, pacote, data, endereco, acao="atualizar"){
    document.getElementById("cpfRegister").value = cpf;
    document.getElementById("cliRegister").value = nome;
    document.getElementById("packRegister").value = pacote;
    document.getElementById("dateRegister").value = data;
    document.getElementById("endRegister").value = endereco;

    if (acao == "atualizar"){
        document.getElementById("cpfRegister").disabled = true;
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    }
    else if (acao == "excluir"){
        document.getElementById("cpfRegister").disabled = true;
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = false;
    }
}

formCadastro.onsubmit = manipularForm; // Atribuindo a função
document.getElementById("atualizar").onclick = atualizandoCliente
document.getElementById("excluir").onclick = excluidoCliente
mostrarTabela();