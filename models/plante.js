const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const planteSchema = new Schema({
    nom_plante: {
        type: String,
        required: true
    },
    type_plante: {
        type: String,
        enum: ['fruit', 'légume'],
        required: true
    },
    etat: {
        type: String,
        enum: ['planté', 'poussé', 'fleuri', 'recolté'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    updated_date: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('plante', planteSchema);