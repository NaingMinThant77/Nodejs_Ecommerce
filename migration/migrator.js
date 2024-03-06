const Helper = require("../utils/helper");
const fs = require('fs');
const UserDB = require("../models/user")

const migrate = () => {
    let data = fs.readFileSync("./migration/users.json");
    let users = JSON.parse(data);

    users.forEach(async (user) => {
        user.password = Helper.encode(user.password)
        let result = await new UserDB(user).save();
        console.log(result)
    });
}

const backup = async () => {
    let users = await UserDB.find();
    fs.writeFileSync("./migration/backups/users.json", JSON.stringify(users));
    console.log("User DB Backups")
}

module.exports = {
    migrate, backup
}