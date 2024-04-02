const mongoose = require('mongoose');
const { Schema } = mongoose;

// Membuat skema dasar dengan default field-nya createdAt dan updatedAt
const BaseSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Fungsi untuk auto update updatedAt
BaseSchema.methods.updateTimestamps = function() {
    this.updatedAt = new Date();
};

// Memanggil fungsi update setiap kali dokumen disimpan
BaseSchema.pre('save', function(next) {
    this.updateTimestamps();
    next();
});

const BaseModel = mongoose.model('BaseModel', BaseSchema);

module.exports = BaseModel;
