const User = require("../models/user");
const jwt = require ('jsonwebtoken');
const bycrypt = require('bcrypt');

module.exports.signup = (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json("all fields are mandetory");
    }

    User.findOne({email: email}).then((user) => {
        if(user){
            return res.status(400).json("this email is already registered with us")
        }
        //create hash password
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                //create new user
                const newUser = new User( {name: name, email:email, password: hash});

                newUser
                .save()
                .then((user) => {
                    return res.status(200).json(user)
                })
                .catch((err) => {
                    return res.status(400).json({message: err.message || "something went wrong"})
                });
            });
        });

    });
};

module.exports.login = (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json("All fields are mandetory")
    }
    User.findOne({email:email}).then((user) => {
        if(!user){
            return res.status(400).json("this eemail is not registered withus. Please register first")
        }
        bycrypt.compare(password, user.password).then((isMatch) =>{
            if(!isMatch){
                return res.status(400).json('incorrect password')
            }
            //jwt sign
            jwt.sign({
                _id: user.id
            },
            "process.env.JWT_KEY",
            {expiresIn: 3600},
            (err, token) => {
                return res.status(200).json({
                    token: token,
                    user:{ name: user.name, email:user.email}
                })
            }
            )
        })

    })
}
