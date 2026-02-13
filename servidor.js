import express from "express";
import cors from "cors";
import { conexao } from "./db.js";

const app = express();
const PORTA = 5000;

app.use(cors());
app.use(express.json());


app.get("/db", async (req, res) => {
    const [resultado] = await conexao.query("SELECT 1 AS OK");
    res.json(resultado);
});


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello World!" });
});



app.get("/alunos", async (req, res) => {
    const [resultado] = await conexao.query(`
        SELECT ID, NOME FROM ALUNOS ORDER BY ID
    `);
    res.status(200).json(resultado);
});


app.get("/alunos/:codigo", async (req, res) => {
    const valor = req.params.codigo;

    let resultado;

    if (!Number.isNaN(Number(valor))) {
        [resultado] = await conexao.query(
            "SELECT ID, NOME FROM ALUNOS WHERE ID = ?",
            [valor]
        );
    } else {
        [resultado] = await conexao.query(
            "SELECT ID, NOME FROM ALUNOS WHERE NOME = ?",
            [valor]
        );
    }

    if (resultado.length === 0)
        return res.status(404).json({ msg: "Aluno não encontrado" });

    res.status(200).json(resultado.length === 1 ? resultado[0] : resultado);
});


app.post("/alunos", async (req, res) => {
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ msg: "Informe o nome" });

    const [resultado] = await conexao.query(
        "INSERT INTO ALUNOS (NOME) VALUES (?)",
        [nome]
    );

    res.status(201).json({
        msg: "Aluno cadastrado com sucesso",
        id: resultado.insertId
    });
});


app.put("/alunos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ msg: "Informe o nome" });

    const [resultado] = await conexao.query(
        `UPDATE ALUNOS SET NOME = ? WHERE ID = ?`,
        [nome, id]
    );

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Aluno não encontrado" });

    res.status(200).json({ msg: "Aluno atualizado com sucesso" });
});


app.delete("/alunos/:id", async (req, res) => {
    const id = Number(req.params.id);

    const [resultado] = await conexao.query(
        `DELETE FROM ALUNOS WHERE ID = ?`,
        [id]
    );

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Aluno não encontrado" });

    res.status(200).json({ msg: "Aluno removido com sucesso" });
});


app.get("/cursos", async (req, res) => {
    const [resultado] = await conexao.query(`
        SELECT ID, NOME_CURSO FROM CURSOS ORDER BY ID
    `);
    res.status(200).json(resultado);
});


app.get("/cursos/:codigo", async (req, res) => {
    const valor = req.params.codigo;
    let resultado;

    if (!Number.isNaN(Number(valor))) {
        [resultado] = await conexao.query(
            "SELECT ID, NOME_CURSO FROM CURSOS WHERE ID = ?",
            [valor]
        );
    } else {
        [resultado] = await conexao.query(
            "SELECT ID, NOME_CURSO FROM CURSOS WHERE NOME_CURSO = ?",
            [valor]
        );
    }

    if (resultado.length === 0)
        return res.status(404).json({ msg: "Curso não encontrado" });

    res.status(200).json(resultado.length === 1 ? resultado[0] : resultado);
});


app.post("/cursos", async (req, res) => {
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ msg: "Informe o nome do curso" });

    await conexao.query(
        "INSERT INTO CURSOS (NOME_CURSO) VALUES (?)",
        [nome]
    );

    res.status(201).json({ msg: "Curso cadastrado com sucesso" });
});


app.put("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ msg: "Informe o nome do curso" });

    const [resultado] = await conexao.query(
        "UPDATE CURSOS SET NOME_CURSO = ? WHERE ID = ?",
        [nome, id]
    );

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Curso não encontrado" });

    res.status(200).json({ msg: "Curso atualizado com sucesso" });
});


app.delete("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id);

    const [resultado] = await conexao.query(
        "DELETE FROM CURSOS WHERE ID = ?",
        [id]
    );

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Curso não encontrado" });

    res.status(200).json({ msg: "Curso removido com sucesso" });
});



app.get("/matriculas", async (req, res) => {
    const [resultado] = await conexao.query(`
        SELECT matriculas.id, alunos.NOME AS ALUNO,CURSOS.NOME_CURSO AS CURSO FROM MATRICULAS
        INNER JOIN alunos ON MATRICULAS.ALUNO_ID = alunos.ID
        INNER JOIN cursos ON MATRICULAS.CURSO_ID = cursos.ID
    `);

    res.status(200).json(resultado);
});


app.post("/matriculas", async (req, res) => {
    const { aluno_id, curso_id } = req.body;

    if (!aluno_id || !curso_id)
        return res.status(400).json({ msg: "Informe aluno_id e curso_id" });

    await conexao.query(
        "INSERT INTO MATRICULAS (ALUNO_ID, CURSO_ID) VALUES (?, ?)",
        [aluno_id, curso_id]
    );

    res.status(201).json({ msg: "Matrícula realizada com sucesso" });
});


app.delete("/matriculas", async (req, res) => {
    const { aluno_id, curso_id } = req.body;

    if (!aluno_id || !curso_id)
        return res.status(400).json({ msg: "Informe aluno_id e curso_id" });

    const [resultado] = await conexao.query(
        "DELETE FROM MATRICULAS WHERE ALUNO_ID = ? AND CURSO_ID = ?",
        [aluno_id, curso_id]
    );

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Matrícula não encontrada" });

    res.status(200).json({ msg: "Matrícula removida com sucesso" });
});



app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
