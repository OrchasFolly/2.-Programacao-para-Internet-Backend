import ClienteDB from "../DataBase/clienteDB.js";
export default class PacoteViagem {

    // atributos do pacote de viagem
    // Definição de atributos privados e seus respectivos métodos de acesso públicos
    #cpf;  // # é utilizado pelo javascript para definir que um atributo é privado
    #nomeCliente;
    #nomePacote;
    #dataPartida;
    #endereco;

    constructor(cpf, nomeCliente, nomePacote, dataPartida, endereco) {
        this.#cpf = cpf;
        this.#nomeCliente = nomeCliente;
        this.#nomePacote = nomePacote;
        this.#dataPartida = dataPartida;
        this.#endereco = endereco;
    }

    

    get cpf() {
        return this.#cpf; //this se refere ao próprio objeto
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nomeCliente() {
        return this.#nomeCliente;
    }

    set nomeCliente(novoNome) {    
        this.#nomeCliente = novoNome;
    }

    get nomePacote() {
        return this.#nomePacote;
    }

    set nomePacote(novoPacote) {    
        this.#nomePacote = novoPacote;
    }

    get dataPartida() {
        return this.#dataPartida;
    }

    set dataPartida(novaData) {
        this.#dataPartida = novaData;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "cpf": this.#cpf,
            "nomeCliente": this.#nomeCliente,
            "nomePacote": this.#nomePacote,
            "dataPartida": this.#dataPartida,
            "endereco": this.#endereco,
        }
    }

    async gravar(){
        const cliDB = new ClienteDB();
        cliDB.gravar(this);
    }

    async alterar(){
        const cliDB = new ClienteDB();
        cliDB.alterar(this);
    }

    async excluir(){
        const cliDB = new ClienteDB();
        cliDB.excluir(this);
    }

    async consultar(){
        const cliDB = new ClienteDB();
        return await cliDB.consultar(this);
    }

    async consultarPeloCPF(cpf){
        const cliDB = new ClienteDB();
        return await cliDB.consultarPeloCPF(cpf);
    }
}