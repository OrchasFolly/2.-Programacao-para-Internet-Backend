import express from 'express';
import rotaCliente from './Rotas/rotaC.js';
const app = express();

// Configurar para aceitar objetos aninhados
app.use(express.urlencoded({extended:false}));

// Configurar para processar formato JSON
app.use(express.json());
app.use('/clientes', rotaCliente);
app.listen(3340,()=>{
    console.log("BackEnd ouvindo em http://localhost:3340");
});


// import PacoteViagem from "./Model/cliente.js";


// var cliente = new PacoteViagem("222.222.222-22", 
//                           "Exemplo", 
//                           "Ex Feriado Especial",
//                           "14/02/2025",
//                           "Aeroporto de Presidente Prudente");

// Gravar pacote no banco de dados
// cliente.gravar().then(() => {
//     console.log("Pacote gravado com sucesso!");
// }).catch((erro) => {
//     console.log("Erro ao gravar o pacote: " + erro);
// });

// Editar pacote no banco de dados
// cliente.alterar().then(() => {
//    console.log("Pacote alterado com sucesso!");
// }).catch((erro) => {
//    console.log("Erro ao alterar o pacote: " + erro);
// });

// Excluindo pacote do banco de dados
// cliente.excluir().then(() => {
//    console.log("Pacote excluido com sucesso!");
// }).catch((erro) => {
//    console.log("Erro ao excluir o pacote: " + erro);
// })

// Recuperando informação do banco de dados
// cliente.consultar().then((listaClientes) => {
//    for (const cliente of listaClientes) {
//        console.log(cliente.toJSON());
//    }
// });