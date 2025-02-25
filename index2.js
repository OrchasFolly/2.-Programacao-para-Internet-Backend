
import PacoteViagem from "./Model/Cliente.js"

var cliente = new PacoteViagem("234.111.111-11",
                               "Lucas Salvato",
                               "Pacote: Feriado Especial",
                               "14/02/2025",
                               "Aeroporto de Presidente Prudente",
                                );
// Gravando

cliente.gravar().then(() => {
    console.log("--------------------------",
                "\nPacote gravado com sucesso",
                "\n--------------------------",
                );
}).catch((erro) => {
    console.log(`Erro ao gravar pacote: ${erro}`);
});