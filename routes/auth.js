// REGISTER QISMI
import express from 'express';
import bcrypt from 'bcrypt';
import {db} from '../database/db.js'
import {loginMiddleWare} from '../middleWare/validate.js'

const router = express.Router()

router.post('/register',loginMiddleWare ,async(req,res)=>{
    try{
    const {firstName,lastName,birthDate,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const users = await db.query(`INSERT INTO users(firstName,lastName,birthDate,email,password)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING * ;`,
[firstName,lastName,birthDate,email,hashedPassword])

res.status(201).json(users.rows[0]);


    }catch (error){
        return res.status(500).json({message:"Server xatoligi",
            error:error.message
        })
    }

});

//LOGIN QISMI

router.post('/login',async (req,res)=>{
    try{
const  {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email va Passwordni ham kiriting!"})
    }

    const user = await db.query('SELECT * FROM users WHERE email = $1',
        [email]
    )

    if(user.rows.length === 0){
        return res.status(401).json({message:"Email yoki parol noto'g'ri!"});
    }

    const parol = await bcrypt.compare(password,user.rows[0].password);
    if(!parol){
        return res.status(401).json({message:"Parol yoki email noto'g'ri"});
    }

    return res.json({message:"Login muvafaqqiyatli",
        id:user.rows[0].id,
        email:user.rows[0].email
    })

    }catch(error){
        return res.status(500).json({message:"Server xatoligi",
            error:error.message
        })
    }
    
})

export default router;