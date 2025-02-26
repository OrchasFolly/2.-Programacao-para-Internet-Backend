import PacoteViagem from "./Model/cliente.js";


var cliente = new PacoteViagem("132.121.231-21", 
                          "Lucas Alvares", 
                          "Feriado Especial",
                          "14/02/2025",
                          "Aeroporto de Presidente Prudente");

// Gravar pacote no banco de dados
cliente.gravar().then(() => {
    console.log("Cliente gravado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao gravar o cliente: " + erro);
});

// Editar pacote no banco de dados
/*cliente.alterar().then(() => {
    console.log("Cliente alterado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao alterar o cliente: " + erro);
});*/

// Excluindo pacote do banco de dados
/*cliente.excluir().then(() => {
    console.log("Cliente excluido com sucesso!");
}).catch((erro) => {
    console.log("Erro ao excluir o cliente: " + erro);
})*/

// Recuperando informação do banco de dados
/*cliente.consultar().then((listaClientes) => {
    for (const cliente of listaClientes) {
        console.log(cliente.toJSON());
    }
});*/