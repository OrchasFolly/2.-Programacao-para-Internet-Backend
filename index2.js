import express from 'express';
import session from "express-session";
import autenticar from "./secure/auten.js";
import rotaCliente from './Rotas/rotaC.js';

const porta = 3400;
const localhost = "0.0.0.0"; // Disponível para todos os dispositivos (Domínio)
const app = express();

// Configurar para aceitar objetos aninhados
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(session({
    // Para fins acadêmicos
    secret: "Dk24DFE23vFE3gCFF434Se2Cr42DEX",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10 // Minutos maximos de sessão
    }
}));

app.use('/clientes', rotaCliente);

// Oferecer um recurso de login
app.get("/login", (req, resp) => {
    resp.redirect("/login.html");
});

app.post("/login", (req, resp) => {
    const user = req.body.nameValid;
    const pass = req.body.passValid;
    if(user == "Admin" && pass == "Admin"){
        req.session.autenticado = true;
        resp.redirect("/index.html");
    } else{
        resp.redirect("/login.html");
    }
});

app.get("/logout", (req, resp) => {
    req.session.autenticado = false;
    resp.redirect("/index.html");
});

//erro: http://localhost:3000/publico/index.html
//certo: http://localhost:3000/index.html
app.use(express.static("./public"));

// autenticar é um middleware
app.use(autenticar, express.static("./private"));

// Configurar para processar formato JSON
// MOVER PARA CIMA EM CASO DE TESTES NO POSTMAN

app.listen(porta,localhost, ()=>{
    console.log(`Backend e Servidor rodando em http://${localhost}:${porta}`);
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