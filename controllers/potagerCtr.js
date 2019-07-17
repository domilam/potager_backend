
const Plante = require('../models/plante');
const PlantePotager = require('../models/plante_potager');

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const mongoose = require('mongoose');



//retourne la liste des plantes
exports.listPlantsCatalogue = (req, res, next) => {
    Plante.find()
    .then(plantes =>{
        res.status(201).json({message: 'Liste de plantes retournées', data: plantes})
        console.log(plante);
    })
    .catch((err)=>{
        res.status(422).json({message: 'Liste de plantes non trouvé', data: err});
        console.log(err);
    });
}

//liste des plantes d'un potager donné
exports.listPlantsPotager = (req, res, next) =>{
    const email = req.session.user.email
    console.log(email);
    let listPlantes = [];

    PlantePotager.find({email: email})
        .populate('planteId')
    .then(plantesPotager => {
        console.log(plantesPotager);
        res.status(200).json({message: "liste de plante du potager de "+email, data: plantesPotager});
    })
    .catch(err => {
        console.log(err);
        res.status(422).json({message: "erreur plante"});
    });
}


//retourne la plante  du catalogue à partir de son Id
exports.getPlantCatalogue = (req, res, next) => {
    const planteId = req.params.planteId;

    Plante.findById(plantId)
    .then(result => {
        res.status(201).json({message: 'Plante trouvée !!!', data: result});
        console.log('Plante trouvée');
    })
    .catch(err => {
        res.status(422).json({message: 'Plante non trouvé !!', data: err});
        console.log(err);
    });
}

//Créé une nouvelle plante au catalogue
exports.addPlantCatalogue = (req, res, next) => {
    const nom_plante = req.body.nom_plante;
    const type_plante = req.body.type_plante;
    const description = req.body.description;

    const plante = new Plante({
        nom_plante: nom_plante,
        type_plante: type_plante,
        etat: "planté",
        description: description
    });

    plante.save()
    .then(result =>{
        res.status(201).json({message: 'Plante créé !!', data: plante});
        console.log('Plante créé !!');
    })
    .catch(err => {
        res.status(422).json({message: 'plante non créé !!', data: err});

        console.log(err);
    });
}

//Supprime la plante au catalogue correspondant à l'id reçu
exports.deletePlantCatalogue = (req, res, next) => {
    const planteId = req.params.planteId  //'5d2cd7401a38db0a64c31ff4'

    Plante.findByIdAndDelete(planteId)
    .then(result => {
        res.status(201).json({message: 'Plante supprimée', data: result});
        console.log('Plante supprimée: '+ planteId );
    })
    .catch(err => {
        res.status(422).json({message: 'Plante non supprimée', data: err});
        console.log(err);
    })
}

//Met à jour une plante au catalogue
exports.updatedPlantCatalogue = (req, res, next) => {
    const planteId = req.body.planteId;
    const updated_nom_plante = req.body.nom_plante;
    const updated_type_plante = req.body.type_plante;
    const updated_etat = req.body.etat;
    const updated_description = req.body.description;

    Plante.findById(planteId)
    .then(plante => {
        plante.nom_plante = updated_nom_plante;
        plante.type_plante = updated_type_plante;
        plante.description = updated_description;
        
        if (plante.etat != updated_etat) {
            plante.etat = updated_etat;
            plante.updated_date = Date.now();
        }
        plante.save()
        .then(result => {
            res.status(201).json({message: 'Plante modifiée !!', data: result});
            console.log('Plante modifiée !!');
        })
        .catch(err => {
            res.status(422).json({message: 'Plante non modifiée !!', data: err});
            console.log('Plante non modifiée !!');
        });
    })
    .catch(err => {
        res.status(422).json({message: "Plante non trouvée !!", data: err});
        console.log(err);
    })
}

exports.addPlantePotager = (req, res, next) => {
    const planteId = req.body.planteId;
    const email = req.session.user.email;

    plantePotager = new PlantePotager({
        email: email ,
        planteId: planteId
    });

    plantePotager.save()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'plante créée dans le potager de '+email, data: result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'erreur', data: err});
    })
}


