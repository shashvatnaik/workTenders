import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { User } from '../models/user';

const key = 'mysecretkey54';

const signup = (req, res) => {
    const { name, email, phone, password, type, personal_info, profile, preferences } = req.body;
    User.find({ email, type: mongoose.Types.ObjectId(type) }).then((emailData) => {
        console.log(emailData);
        if (!emailData.length) {
            bcrypt.genSalt(8).then((salt) => {
                bcrypt.hash(password, salt).then((hash) => {
                    User.create({ name, email, phone, password: hash, type, about: personal_info, profile, preferences }).then((response) => {
                        console.log('user created successfully.');
                        const token = jwt.sign({ name, email, phone, type, personal_info, profile }, key);
                        res.status(200).send({ message: "user created successfully", token });
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
            res.status(409).send({ message: 'User already exists!' });
        }
    }).catch((error) => {
        console.log(error);
    });
};

const login = (req, res) => {
    const { email, password, type } = req.body;
    if(!type) {
        res.status(400).send({message: "Please select a type."});
    } else {    
        email ? User.findOne({ email, type: mongoose.Types.ObjectId(type) }).then((data) => {
        if (data) {
            password ?
                bcrypt.compare(password, data.password).then((compare) => {
                    if (compare) {
                        delete data.password;
                        res.send({ token: jwt.sign(data.toObject(), key), message: 'login successfull' });
                    } else {
                        res.status(401).send({message: 'Wrong Email/Password'});
                    }
                }).catch((error) => {
                    console.log(error);
                }) : res.send({ message: 'password not found' });
        } else {
            res.status(404).send({ message: 'No user found with this email' });
        }
    }).catch((error) => {
        console.log(error);
    }) : res.send({ message: "email not found" });
}
}

module.exports = { signup, login, key };