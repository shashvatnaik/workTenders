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
        if (userData.type === 'customer') {
            Tenders.find({ createdBy: mongoose.Types.ObjectId(req.user._id) }).populate('createdBy').exec().then((data) => {
                res.send({ data });
            }).catch(error => {
                console.log(error);
            });
        } else {
            Tenders.find().populate('createdBy').exec().then((tenders) => {
                res.send({ data: tenders });
            }).catch((error) => {
                console.log(error);
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

const updateTender = (req, res) => {
    const { newTender } = req.body;
    Tenders.findOneAndUpdate({_id: newTewnder._id}, {$set: newTender}).then(() => {
        res.send({message: `successfully updated tender "${newTender.title}"`});
    }).catch(error => {
        console.log(error);
        res.sendStatus(500).send({message: error.message});
    })
}

const deleteTender = (req, res) => {
    const {tenderId} = req.query;
    Tenders.deleteOne({_id: tenderId}).then(() => {
        res.send({message: "successfully deleted one tender"});
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500).send({message: error.message});
    })
}

const getOneTender = (req, res) => {
    const { tenderId } = req.params;
    Tenders.findById(tenderId).populate('category').populate('createdBy').exec().then(data => {
        if (data) {
            res.send({ data });
        }
    }).catch(error => {
        console.log(error);
    })
}

module.exports = { addTender, getAllTender, getOneTender, deleteTender, updateTender };