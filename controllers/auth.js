import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import googleStorage from '@google-cloud/Storage';
import admin from 'firebase-admin';

import {User} from '../models/user';

const serviceAccount = require("../work-tenders-firebase-adminsdk-kylrh-e6b1484417.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "work-tenders.appspot.com"
});

const bucket = admin.storage().bucket();

const signup = (req, res) => {
    const {name, email, phone, password, type} = req.body;
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