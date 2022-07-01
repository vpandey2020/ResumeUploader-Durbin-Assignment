const mongoose = require("mongoose")
const imageRegex = /.*\.(jpeg|jpg|png|pdf|doc)$/;
const validFile = function(files) {
    return imageRegex.test(files.originalname);
};

const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
const validPhone = function(phone) {
    return phoneRegex.test(phone);
};

const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const validEmail = function(email) {
    return emailRegex.test(email);
};




const isValid = function(value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidRequestBody = function(reqBody) {
    return Object.keys(reqBody).length > 0
}



module.exports = {
    validFile,
    validPhone,
    validEmail,
    isValid,
    isValidRequestBody,


};