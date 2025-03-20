import conectar from "./conexao.js";
import PacoteViagem from "../Model/cliente.js";
export default class ClienteDB{

    constructor(){
        this.init();
    }
    // Comunicação com a aplicação externa (banco de dados)
    // Utilizar métodos assíncronos
    // Métodos assíncronos atrasam a resposta
    // A resposta depende do banco de dados
    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS pacote (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                nomeCliente VARCHAR(100) NOT NULL,
                nomePacote VARCHAR(150) NOT NULL,
                dataPartida VARCHAR(20) NOT NULL,
                endereco VARCHAR(100) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela cliente:" + erro);
        }

    }

    async gravar(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `INSERT INTO pacote (cpf, nomeCliente, nomePacote, dataPartida, endereco)
                         VALUES ( ?, ?, ?, ?, ? )`;
            const parametros = [
                cliente.cpf,
                cliente.nomeCliente,
                cliente.nomePacote,
                cliente.dataPartida,
                cliente.endereco
            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); // Liberar a conexão de volta para o pool
                         
        }
    }

    async alterar(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `UPDATE pacote SET 
                         nomeCliente = ?, nomePacote = ?, dataPartida = ?, endereco = ?
                         WHERE cpf = ?`;            
            const parametros = [
                cliente.nomeCliente,
                cliente.nomePacote,
                cliente.dataPartida,
                cliente.endereco,
                cliente.cpf
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof PacoteViagem){
            const conexao = await conectar();
            const sql = `DELETE FROM pacote WHERE cpf = ?`;
            const parametros = [cliente.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = `SELECT * FROM pacote ORDER BY nomeCliente`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new PacoteViagem(registro.cpf,
                                        registro.nomeCliente,
                                        registro.nomePacote,
                                        registro.dataPartida,
                                        registro.endereco
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
    
    async consultarPeloCPF(cpf){
        const conexao = await conectar();
        const sql = `SELECT * FROM pacote WHERE cpf = ?`;
        const [registros, campos] = await conexao.execute(sql, [cpf]);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new PacoteViagem(registro.cpf,
                                        registro.nomeCliente,
                                        registro.nomePacote,
                                        registro.dataPartida,
                                        registro.endereco
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
}