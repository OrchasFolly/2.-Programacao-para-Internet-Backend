import ClienteDB from "../DataBase/ClienteBD.js";

export default class PacoteViagem {
    // Atributos de cliente
    // Definição de atributos privados e seus metodos
    #cpf;
    #nomeCliente;
    #nomePacote;
    #data;
    #endereco;

    constructor(cpf, nomeCli, nomePocote, data, endereco){
        this.#cpf = cpf;
        this.#nomeCliente = nomeCli;
        this.#nomePacote = nomePocote;
        this.#data = data;
        this.#endereco = endereco;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nomeCli(){
        return this.#nomeCliente;
    }

    set nomeCli(novoNome){
        this.#nomeCliente = novoNome;
    }

    get nomePocote(){
        return this.#nomePacote;
    }

    set nomePocote(novoPacote){
        this.#nomePacote = novoPacote;
    }

    get data(){
        return this.#data;
    }

    set data(novaData){
        this.#data = novaData;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    // Formato JSON
    toJSON(){
        return {
            "cpf": this.#cpf,
            "nomeCliente": this.#nomeCliente,
            "nomePacote": this.#nomePacote,
            "data": this.#data,
            "endereco": this.#endereco,
        }
    }

    async gravar(){
        const cliDB = new ClienteDB();
        cliDB.gravar(this);
    }

    async editar(){
        const cliDB = new ClienteDB();
        cliDB.editar(this);
    }

    async excluir(){
        const cliDB = new ClienteDB();
        cliDB.excluir(this);
    }

    async consultar(){
        const cliDB = new ClienteDB();
        return await cliDB.consultar(this);
    }
}