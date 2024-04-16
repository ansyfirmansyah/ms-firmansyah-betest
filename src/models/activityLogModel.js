const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
}, {
    timestamps: true, // auto handle timestamp
    strict: false // menambah field secara dinamis
})

const ActivityLogModel = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = ActivityLogModel;