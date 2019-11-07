import jwt from 'jsonwebtoken';

import { signup, login, key } from '../controllers/auth';
import { getTypes } from '../controllers/types';
import { getCategories } from '../controllers/category';
import { addTender, getAllTender, getOneTender, deleteTender } from '../controllers/tender';
import { addBid, getAllTenders, deleteBid } from '../controllers/bids';

const privateRouteMiddleware = (req, res, next) => {
    const token = req.get('Authorization').split('Bearer ')[1];
    req.user = jwt.decode(token, key);
    next();
}

module.exports = (app) => {
    app.post('/signup', signup);
    app.post('/signin', login);

    app.get('/categories', getCategories);
    app.get('/userTypes', getTypes);

    app.post('/tender', privateRouteMiddleware, addTender);
    app.get('/tender', privateRouteMiddleware, getAllTender);
    app.get('/tender/:tenderId', privateRouteMiddleware, getOneTender);
    app.delete('/tender', privateRouteMiddleware, deleteTender);

    app.get('/bids', privateRouteMiddleware, getAllTenders);
    app.post('/bids', privateRouteMiddleware, addBid);
    app.delete('/bids', privateRouteMiddleware, deleteBid);
}
