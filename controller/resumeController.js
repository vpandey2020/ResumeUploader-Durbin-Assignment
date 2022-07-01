const resumeModel = require("../model/resumeModel")
const validation = require("../validation/validator")

const AWS = require("aws-sdk");
const mongoose = require("mongoose")
const aws = require("../controller/awsController")

let isValid = function(value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
let isValidRequestBody = function(reqBody) {
    return Object.keys(reqBody).length > 0
}


let registerResume = async function(req, res) {
    try {
        const reqBody = req.body
        const files = req.files
        if (!isValidRequestBody(reqBody)) {
            res.status(400).send({ status: false, message: "please provide data " })
            return
        }
        if (!validation.isValid(files)) {
            return res.status(400).send({ status: false, message: "please insert the file" });
        }
        if (!validation.validFile(files[0])) {
            return res.status(400).send({ status: false, msg: "please insert an image in files" });
        }

        let { firstName, lastName, email, phoneNo, WorkExperince, skills, certifications, address } = reqBody

        if (!isValid(firstName)) {
            res.status(400).send({ status: false, message: "First name is required" })
            return
        }
        if (!isValid(lastName)) {
            res.status(400).send({ status: false, message: "Last name is required" })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, message: "Email is required" })
            return
        }

        if (!isValid(phoneNo)) {
            res.status(400).send({ status: false, message: "Phone  is required" })
            return
        }

        //Unique Validation
        let findPhone = await resumeModel.findOne({ phoneNo });
        if (findPhone) {
            res.status(400).send({ status: false, message: "Phone is already registered" })
            return
        }
        let findEmail = await resumeModel.findOne({ email });
        if (findEmail) {
            res.status(400).send({ status: false, message: "Email is already registered" })
            return
        }

        //let isWorkExp = JSON.parse(WorkExperince)
        //let { timeline } = isWorkExp;
        //let totalexperince = timeline.Count()

        const newDocs = await aws.uploadFiles(files[0])

        if (!newDocs) {
            res.status(400).send({ status: false, msg: "error in uloading the files" });
            return;
        }

        let savedData = {
            firstName,
            lastName,
            phoneNo,
            email,
            WorkExperince,
            address,
            newDocs,
            skills,
            certifications,

        }




        console.log(savedData)
        const total_experince = await resumeModel.count({
            WorkExperince: WorkExperince.timeline
        })
        console.log(total_experince)



        const newData = await resumeModel.create(savedData)
        return res.status(201).send({ status: true, message: "success", data: newData, total_experince: total_experince })












    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
        return
    }
}



module.exports.registerResume = registerResume