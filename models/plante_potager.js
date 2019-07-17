const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const plante_potagerSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    planteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plante'
    }
});

module.exports = mongoose.model('plante_potager', plante_potagerSchema);