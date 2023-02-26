import { Sequelize } from "sequelize";


const db = new Sequelize("mysql://dev:sandbox@127.0.0.1:3306/musicplayer");

export default db;