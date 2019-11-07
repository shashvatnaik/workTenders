import mongoose from 'mongoose';
import { Bids } from '../models/bids';
import { Tenders } from '../models/tenders';

const addBid = (req, res) => {
    const { title, description, estimatedAmount, tenderId } = req.body;
    Bids.find({ userId: mongoose.Types.ObjectId(req.user._id), tenderId: mongoose.Types.ObjectId(tenderId) }).then((alreadyBids) => {
        if (!alreadyBids.length) {
            Bids.create({ title, description, estimatedAmount, tenderId, userId: req.user._id }).then(() => {
                res.send({ message: "successfully placed bid on this tender" });
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500).send({ message: error.message });
            });
        } else {
            res.status(409).send({ message: "You already placed bid on this tender." });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
    })
}

const getAllTenders = (req, res) => {
    if (req.query.userType === "contractor") {
        Bids.find({ userId: mongoose.Types.ObjectId(req.user._id) }).then((data) => {
            res.send({ data });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ message: error.message });
        })
    } else {
        Tenders.find({ createdBy: mongoose.Types.ObjectId(req.user._id) }).then((tenders) => {
            if (tenders.length) {
                const bidsPromise = new Promise((resolve, reject) => {
                    let bids = [];
                    tenders.forEach((x, index) => {
                        Bids.find({ tenderId: mongoose.Types.ObjectId(x._id) }).then((bidsData) => {
                            bids.push(bidsData);
                            if (index === tenders.length - 1) {
                                resolve(bids.flat());
                            }
                        }).catch((error) => {
                            console.log(error);
                            res.status(500).send({ message: error.message });
                        })
                    });
                });
                bidsPromise.then((bids) => {
                    res.send({ data: bids });
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send({ message: error.message });
                })
            } else {
                res.status(404).send({ message: "No Bids Found" })
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ message: error.message });
        });
    }
}

const deleteBid = (req, res) => {
    Bids.deleteOne({ _id: mongoose.Types.ObjectId(req.query.bidId) }).then(() => {
        res.send({ message: "bid successfully deleted" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
    })
}

module.exports = { addBid, getAllTenders, deleteBid };