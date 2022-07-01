const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/route')
const { default: mongoose } = require('mongoose');
const app = express();
const multer = require("multer")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
mongoose.connect("mongodb+srv://vpandey:qVLIgv7EqMycOrmr@cluster0.lvp0c.mongodb.net/resumeExracter?retryWrites=true&w=majority", {

        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected now"))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});