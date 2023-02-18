const fs = require("fs");

const logUser = (username, role) => {
    // console.log(username,role)

    const logMessage = `Username : ${username} logged in with role : ${role}`
    fs.appendFileSync("logs.txt", `${logMessage}\n`, (err) => {
        if (err) throw err;


    })
}

module.exports = logUser