import mysql from "mysql2/promise";


export const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "escola",
    port: 3306,
    //define se o pool deve esperar se não houver conexões disponíveis 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})  

