import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

const key = 'mysecretkey54';

const signup = (req, res) => {
    const { name, email, phone, password, type, personal_info, profile } = req.body;
    User.find({ email }).then((emailData) => {
        console.log(emailData);
        if (!emailData.length) {
            bcrypt.genSalt(8).then((salt) => {
                bcrypt.hash(password, salt).then((hash) => {
                    User.create({ name, email, phone, password: hash, type, about: personal_info, profile }).then((response) => {
                        console.log('user created successfully.');
                        const token = jwt.sign({ name, email, phone, type, personal_info }, key);
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
    const { email, password } = req.body;
    email ? User.findOne({ email }).then((data) => {
        if (data) {
            password ?
                bcrypt.compare(password, data.password).then((compare) => {
                    if (compare) {
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

module.exports = { signup, login };