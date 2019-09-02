import {signup, login} from '../controllers/auth';
import {getTypes} from '../controllers/types';

module.exports = (app) => {
    app.post('/signup', signup);
    app.post('/signin', login);

    app.get('/userTypes', getTypes);
}
