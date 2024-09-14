const User = require('../model/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 async function generateToken(id, name){
    try{
        const userId = id.toString();
        const hash = await bcrypt.hash(userId,10);
        const token = jwt.sign({userId:hash, name:name},'secretkey');
        return token;
    }
    catch(err){
        console.log(err);
        return null;
    }
    
}

exports.addUser = async (req,res,next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password

    try{
        const user = await User.findOne({where:{phone:phone}})
        if(user){
            res.status(204).send("User already exists!")

        }
        else{
            bcrypt.hash(password, 10, async(err, hash) => {
                if(err){
                    throw new Error(err)
                }
                else{
                    await User.create({
                        name:name,
                        email:email,
                        phone:phone,
                        password:hash
                    })
                    return res.status(200).json({message:"User created."})
                }
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}

exports.loginUser = async(req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    

    try{
        const user = await User.findOne({where:{email:email}})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        else{
            bcrypt.compare(password, user.password,async (err,result) => {
                if(err){
                    throw new Error("Something went wrong.")
                }
                if(result === true){
                    const token = await generateToken(user.id,user.name);
                    console.log(token)
                    return res.status(200).json({message:"success", token:token})

                }
                else{
                    res.status(400).json({message:"Wrong Password"})
                }
            })
        }
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }

}
