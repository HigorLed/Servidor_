const API = "http://localhost:5000/alunos"

async function carregarTable() {
    const resultado = await fetch(API)

    const dados = await resultado.json()

    console.log(dados)
}

carregarTable()