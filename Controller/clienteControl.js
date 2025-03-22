import PacoteViagem from "../Model/cliente.js"

// Classe responsavel por manipular o cliente
export default class ClienteControl{

    // Método responsável por gravar os dados do cliente por meio do protocolo HTTP
    // Responsavel por recuperar os dados de um cliente(JSON) vindos da requisição
    gravar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nomeCliente;
            const pacote = dados.nomePacote;
            const data = dados.dataPartida;
            const edr = dados.endereco;

            if(cpf && nome && pacote && data && edr){
                const cliente = new PacoteViagem(cpf, nome, pacote, data, edr);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nomeCliente;
            const pacote = dados.nomePacote;
            const data = dados.dataPartida;
            const edr = dados.endereco;

            if(cpf && nome && pacote && data && edr){
                const cliente = new PacoteViagem(cpf, nome, pacote, data, edr);
                cliente.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;

            if(cpf){
                const cliente = new PacoteViagem(cpf);
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const cliente = new PacoteViagem();

            if (requisicao.params.cpf){
                cliente.consultarPeloCPF(requisicao.params.cpf).then((listaClientes) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaClientes
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaClientes) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaClientes
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }
}