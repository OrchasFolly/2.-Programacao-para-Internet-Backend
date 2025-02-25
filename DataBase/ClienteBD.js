import conectar from "./conexao.js";
import PacoteViagem from "../Model/Cliente.js"
export default class ClienteDB{

    constructor(){
        this.init();
    }
    // Comunicação com uma aplicação externa (banco de dados)
    // Necessário utilizar métodos assíncronos (atrasar execução)
    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS cliente (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                nomeCliente VARCHAR(100) NOT NULL,
                nomePacote VARCHAR(100) NOT NULL,
                dataC DATETIME,
                endereco VARCHAR(100) NOT NULL
            )`
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log(`Erro ao iniciar a tabela do banco de dados: ${erro}`);
        }
    }

    async gravar(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (cpf, nomeCliente, nomePacote, dataC, endereco)
                         VALUES(?, ?, ?, ?, ?)`;
            const parametros = [
                cliente.cpf,
                cliente.nomeCliente,
                cliente.nomePacote,
                cliente.dataC,
                cliente.endereco
            ];
            await conexao.execute(sql, parametros); // Executando
            await conexao.release(); // Liberando conexão
        }
    }

    async editar(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET 
                         nomeCliente = ?, nomePacote = ?, dataC = ?, endereco = ?
                         WHERE cpf = ?`;
            const parametros = [
                cliente.nomeCliente,
                cliente.nomePacote,
                cliente.dataC,
                cliente.endereco,
                cliente.cpf,
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?`;
            const parametros = [cliente.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(cliente){
        const conexao = await conectar();
        const sql = `SELECT * FROM cliente ORDER BY nomeCliente`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new PacoteViagem(registro.cpf,
                                             registro.nomeCliente,
                                             registro.nomePacote,
                                             registro.dataC,
                                             registro.endereco
                                            );
            listaClientes.push(cliente);
        }
        return linhas;
    }
}