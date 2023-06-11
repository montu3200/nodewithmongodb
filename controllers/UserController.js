const UserModel=require('./../services/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validate=require('./../middleware/validation');
exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password=hash;
        const user = await UserModel.createUser(req.body);
        res.json({ data: user, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.login=async (req,res) => {
    try {
        const { error, value } = validate.loginSchema.validate(req.body);

        if (error) {
          // Validation failed, return an error response
          return res.status(400).json({ error: error.details[0].message });
        }
        const checkEmail=await UserModel.checkEmail(req.body);
        if(checkEmail){
            bcrypt.compare(req.body.password, checkEmail.password, function(err, result) {
                if(result){
                    var token = jwt.sign({ ...checkEmail }, 'sdfsdjkf347557384$^$^%^$', { expiresIn: '60s' });
                    res.json({data:checkEmail,status:"success",token});
                }else{
                    res.status(400).json({status: "failed", error: 'Incorrect password' });
                }
            });
        }else{
            res.status(400).json({status: "failed", error: 'Incorrect email' });
        }
        
    } catch (error) {
        res.status((500).json({error:err.message}));
    }
}

exports.getAllUser=async (req,res) => {
    try {
        const checkEmail=await UserModel.getAllUser();
        res.json({data:checkEmail,status:"success"});    
    } catch (error) {
        res.status((500).json({error:err.message}));
    }
    
}