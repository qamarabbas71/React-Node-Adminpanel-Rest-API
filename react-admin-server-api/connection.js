import mysql from 'mysql2';

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234567890",
    database:"test",
})