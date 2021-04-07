require('dotenv').config({
    path: '../.env'
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {tb_users} = require("../models");
const {getResponse} = require("../helpers/utils");
const {applyHeaders} = require("../helpers/utils");

function login(req, res) {
    const authentication = req.body

    tb_users.findOne({where: {email: authentication.email}})
        .then(user => {
            if (!user) {
                return res.status(404).send(getResponse(false, "User not found", {}));
            }

            bcrypt.compare(authentication.password, user.password, (error, matches) => {
                if (!matches) {
                    return res.status(401).send(getResponse(false, "Invalid Password", error.toString()));
                }

                const token = jwt.sign(
                    {
                        sub: user.id,
                        email: user.email,
                        role: user.role,
                        issuer: process.env.ISSUER
                    },
                    process.env.TOKEN_SECRET,
                    {
                        /*expiresIn: "1hr"*/
                    },
                );

                return res.status(200).send(
                    getResponse(true, "You are a valid user ;)", token)
                );
            });
        }).catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())))
}

function register(req, res) {
    applyHeaders(res);

    const user = req.body
    let password = user.password;

    bcrypt.genSalt(10, (error, salt) => {
        if(error) {
            return res.status(500).send(getResponse(false, "There was an error", error.toString()));
        }

        return bcrypt.hash(password, salt, (error, hash) => {
            user.password = hash;

            tb_users.create(user)
                .then(result => res.status(201).send(getResponse(true, "User created", result)))
                .catch(reason => res.status(500).send(getResponse(false, "There was an error", reason)));
        })
    })
}

function verifyToken(req, authOrSecDef, header, callback) {
    let currentScopes = req.swagger.operation["x-security-scopes"];

    if (header && header.indexOf("Bearer ") === 0) {
        const token = header.split(" ")[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (error, tokenInfo) => {
            if (error == null && Array.isArray(currentScopes) && tokenInfo && tokenInfo.role) {

                const containsRole = currentScopes.indexOf(tokenInfo.role) !== -1;
                const correctIssuer = tokenInfo.iss === process.env.ISSUER;

                if (containsRole && correctIssuer) {
                    req.auth = tokenInfo;

                    return callback(null);
                } else {
                    return callback(sendAuthError(req));
                }
            } else {
                return callback(sendAuthError(req));
            }
        });
    } else {
        return callback(sendAuthError());
    }
}

function sendAuthError(req) {
    return req.res.status(403).send(getResponse(false, "Access Denied", {}));
}

module.exports = {
    login,
    register,
    verifyToken
};
