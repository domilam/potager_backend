
const express = require('express');
const potagerCtrl = require('../controllers/potagerCtr');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

// Liste des routes
router.get('/list', potagerCtrl.listPlantsCatalogue);
router.get('/get/:planteId', isAuth, potagerCtrl.getPlantCatalogue);
router.post('/addPlant', isAuth, potagerCtrl.addPlantCatalogue);
router.post('/deletePlant/:planteId', isAuth, potagerCtrl.deletePlantCatalogue);
router.post('/updatedPlant',isAuth, potagerCtrl.updatedPlantCatalogue);

router.post('/addPlantePotager', potagerCtrl.addPlantePotager);
router.post('/listPlantesPotager', potagerCtrl.listPlantsPotager);
router.post('/deletePlantePotager', potagerCtrl.deletePlantePotager);

module.exports = router;

