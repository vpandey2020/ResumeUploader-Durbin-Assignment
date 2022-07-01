const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true

    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    Address: {
        type: String,

        trim: true
    },
    WorkExperince: {
        company: {
            type: String,
            trim: true
        },
        position: {
            type: String,
            trim: true
        },
        timeline: {
            type: String,
            trim: true
        }

    },
    certifications: {
        type: String,
        trim: true
    },
    skills: {
        type: String,
        trim: true
    },

}, { timestamps: true });

module.exports = mongoose.model('resume', resumeSchema)