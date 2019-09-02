import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {User} from '../models/user';

const signup = (req, res) => {
    const {name, email, phone, password, type} = req.body;
    User.find({email}).then((emailData) => {
        if(!emailData) {
        bcrypt.genSalt(8).then((salt) => {
            bcrypt.hash(password, salt).then((hash) => {
                User.create({name, email, phone, password: hash, type}).then((response) => {
                    console.log('user created successfully.');
                    res.status(200).send({message: "user created successfully"});
                }).catch((error) => {
                    console.log(error);
                }); 
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    } else {
        res.status(409).send({message: 'User already exists!'});
    }
    }).catch((error) => {
        console.log(error);
    });
};

const login = (req, res) => {
    const {email, password} = req.body;
    email ? User.findOne({email}).then((data) => {
        password ?
        bcrypt.compare(password, data.password).then((compare) => {
            if(compare) {
                res.send({token: jwt.sign(data.toObject(), key), message: 'login successfull'});
            }
        }).catch((error) => {
            console.log(error);
        }) : res.send({message: 'password not found'});
    }).catch((error) => {
        console.log(error);
    }) : res.send({message: "email not found"});
}

module.exports = {signup, login};