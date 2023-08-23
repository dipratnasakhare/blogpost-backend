import mysql from "mysql"
import { Sequelize, DataTypes } from 'sequelize'


export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "root369",
    database:"blogpost"
})

