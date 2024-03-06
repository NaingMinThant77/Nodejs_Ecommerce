require('dotenv').config();
const express = require("express"),
    app = express(),
    mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DbName}`)
    .then(() => console.log('Connected!'));

app.use(express.json());

const permitRouter = require('./routes/permit')

app.use("/permit", permitRouter)

const roleRouter = require('./routes/role')
app.use("/roles", roleRouter)

app.use((err, req, res, next) => {
    err.status = err.status || 200
    res.status(err.status).json({ con: false, msg: err.message })
})

const defaultData = async() => {
    let migrator = require("../FME-commerce/migration/migrator");
    // migrator.migrate();
    migrator.backup();
}
defaultData();

const PORT = process.env.PORT ;

app.listen(PORT, console.log(`Server is running at port ${PORT}`))