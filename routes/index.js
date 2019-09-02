import {signup, login} from '../controllers/auth';
import Multer from 'multer';
 
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });

module.exports = (app) => {
    app.post('/signup', multer.single('file'), signup);
    app.post('/signin', login);

    app.get('/userTypes', );
}
