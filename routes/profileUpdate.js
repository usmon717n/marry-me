import express from 'express';
import {db} from '../database/db.js'

const router = express.Router();

router.patch('/profile/:id',async(req,res)=>{
    try{
    const { id } = req.params
    const {firstName,lastName,birthDate,email,password} = req.body;
 
    const result = await db.query(`UPDATE users SET firstName = COALESCE($1,firstName),
    lastName = COALESCE($2,lastName),
    birthDate = COALESCE($3,birthDate),
    email = COALESCE($4,email),
    password = COALESCE($5,password)
    WHERE id = $6`,
    [firstName ?? null,lastName ?? null,birthDate ?? null,email ?? null,password ?? null,id])

    res.status(200).json({message:"Muvafaqiyatli o'chirildi!",
    user:result.rows[0]})

}catch(error){
    res.status(500).json({message:"Server Xatoligi!",
        error:error.message});
};

});

export default router;