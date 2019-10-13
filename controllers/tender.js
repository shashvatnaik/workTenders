import mongoose from 'mongoose';

import { Tenders } from '../models/tenders';
import { User } from '../models/user';

const addTender = (req, res) => {
    const { title, description, picture, category, country, state, city } = req.body;
    const newTender = { title, description, picture, category, location: { country, state, city }, createdBy: mongoose.Types.ObjectId(req.user._id) };
    Tenders.create(newTender).then((data) => {
        res.send({ message: "Tender created succussfully!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ message: "There was some problem creating this tender please try again after sometime" });
    });
}

const getAllTender = (req, res) => {
    User.findById(req.user._id).then((userData) => {
        console.log(userData);
        if(userData.type === 'customer') {
            Tenders.find({ createdBy: mongoose.Types.ObjectId(req.user._id) }).populate('createdBy').then((data) => {
                res.send({data});
            }).catch(error => {
                console.log(error);
            });
        } else {
            Tenders.find().then((tenders) => {
                res.send({data: tenders});
            }).catch((error) => {
                console.log(error);
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = { addTender, getAllTender };