const bcrypt = require("bcryptjs");

module.exports = {
    encode: payload => bcrypt.hashSync(payload),
    FormatMsg: (res, msg = "", result = []) => res.status(200).json({ con: true, msg, result })
}