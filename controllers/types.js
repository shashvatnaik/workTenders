import {Types} from '../models/types';

const getTypes = (req, res) => {
    Types.find({}).then((data) => {
        res.send({data});
    }).catch((error) => {
        console.log(error);
    });
};

const addType = (req, res) => {
    //TODO: add admin authentication with this method
};

const updateType = (req, res) => {
    //TODO: add admin authentication with this method
};

module.exports = {getTypes}, addType, updateType;