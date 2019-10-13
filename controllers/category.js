import { Category } from '../models/categories';

const getCategories = (req, res) => {
    Category.find().then((data) => {
        res.send({data});
    }).catch(error => console.log(error));
}

module.exports = { getCategories };