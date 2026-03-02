import {Pool} from 'pg';
export const db = new Pool({
    host:"localhost",
    port:5432,
    password:"123",
    database:"marryme",
    user:"postgres"
});