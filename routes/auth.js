const express = require('express');
const authCtrl = require('../controllers/authCtr');
// const isAuth = require('../middleware/is-auth');

// const rootProject = path.dirname(process.mainModule.filename);

const router = express.Router();

// Liste des routes
router.post('/signin', authCtrl.postLogin);

module.exports = router;
