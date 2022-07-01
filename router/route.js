const express = require('express');
const router = express.Router();


const ResumeController = require('../controller/resumeController')


router.post('/createResume', ResumeController.registerResume)



module.exports = router;