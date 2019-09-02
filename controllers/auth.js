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

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let newFileName = `${file.originalname}_${Date.now()}`;
  
      let fileUpload = bucket.file(newFileName);
  
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
  
      blobStream.on('error', (error) => {
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    });
}

const signup = (req, res) => {
    const {name, email, phone, password, type} = req.body;

    console.log(req.body);

    let file = req.file;
    console.log(file);
    if (file) {
        uploadImageToStorage(file).then(() => {
        res.status(200).send({
            status: 'success'
        });
        }).catch((error) => {
            console.error(error);
        });
    } else {
        console.error('file not found');
    }

    // bcrypt.genSalt(8).then((salt) => {
    //     bcrypt.hash(password, salt).then((hash) => {

        

    //         User.create({name, email, phone, password: hash, type}).then((response) => {
    //             console.log('user created successfully.');
    //             res.status(200).send({message: "user created successfully"});
    //         }).catch((error) => {
    //             console.log(error);
    //         }); 
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }).catch((error) => {
    //     console.log(error);
    // });
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