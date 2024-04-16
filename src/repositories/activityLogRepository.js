// userRepository.js
const ActivityLogModel = require('../models/activityLogModel');
const BaseRepository = require('./baseRepostory');

class ActivityLogRepository extends BaseRepository {
    constructor() {
        super(ActivityLogModel);
    }

    // Jika dibutuhkan, bisa ditambahkan function spesifik untuk class Activity Log
}

module.exports = ActivityLogRepository;