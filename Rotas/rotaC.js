import { Router } from "express";
import ClienteControl from "../Controller/clienteControl.js";
const rotaCliente = new Router();
const clienteControl = new ClienteControl();

// Definição de endpoints
rotaCliente.post('/', clienteControl.gravar)
.put('/',clienteControl.alterar)
.delete('/',clienteControl.excluir)
.get('/',clienteControl.consultar)
.get('/:cpf',clienteControl.consultar);

export default rotaCliente;

