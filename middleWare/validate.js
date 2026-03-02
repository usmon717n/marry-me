export const loginMiddleWare = (req,res,next)=>{
    const {firstName,lastName,birthDate,email,password} = req.body;
    if (!firstName || !lastName || !birthDate || !email || !password ){
        return res.status(400).json({message:"Barcha maydonlarni to'ldiring!"})
    }
    next();
}