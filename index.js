import express from 'express';
import authRotes from './routes/auth.js';
import upPro from './routes/profileUpdate.js'

const app  = express();

app.use(express.json());
app.use(authRotes)
app.use(upPro)

app.listen(3000,async ()=> console.log("Server is running . . ."));