const {User} = require("../models");
const auth = require("../helpers/auth");

exports.login = function (req, res) {

    const authIn = req.body;

    if (authIn.role !== "user" && authIn.role !== "admin") {
        res.writeHead(400, {"Content-Type": "application/json"});

        return res.end(JSON.stringify({message: 'Error: Role must be either "admin" or "user"'}));
    }

    User.findOne({
        where: {
            username: authIn.username
        }
    }).then(user => {

        if (!user) {
            res.writeHead(200, {"Content-Type": "application/json"});

            return res.end(JSON.stringify({message: "Error: User does not exist"}));
        }

        if (user.username === authIn.username && user.password === authIn.password && user.role === authIn.role) {
            const tokenKey = auth.issueToken(authIn.username, authIn.role);

            res.writeHead(200, {"Content-Type": "application/json"});

            return res.end(JSON.stringify({token: tokenKey}));
        } else {
            res.writeHead(403, {"Content-Type": "application/json"});

            return res.end(JSON.stringify({message: "Error: Credentials incorrect"}));
        }
    }).catch(error => res.status(403).send({message: "Error: " + error}));
};
