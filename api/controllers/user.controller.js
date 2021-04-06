const {User} = require("../models");
const headers = require("../helpers/headers");

const MODULE_NAME = '[User Controller]';

function getUsers(req, res) {
    const roleIn = req.swagger.params.role.value;
    let options;

    if (roleIn && roleIn === 'admin') {
        options = {
            attributes: {
                exclude: ['password']
            }
        }
    } else {
        options = {
            where: {
                role: 'user'
            },
            attributes: {
                exclude: ['password']
            }
        }
    }

    User.findAll(options)
        .then(users => res.status(200).send(users))
        .catch(error => res.status(500).send(error));
}

function postUser(req, res) {
    headers.setHeaders(res);

    const userIn = req.body;

    if(userIn.role !== 'admin' && userIn.role !== 'user') {
        return res.status(422).send({message: 'The role must be admin or user'})
    }

    return User.create(userIn)
        .then(user => res.status(201).send({
            id: user.id,
            username: user.username,
            password: '',
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
        }))
        .catch(error => res.status(400).send(error));
}

function getUserById(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;
    const options = {
        attributes: {
            exclude: ['password']
        }
    };

    User.findByPk(idIn, options)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(403).send(error));
}

function putUser(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;
    const userIn = req.body;

    User.findByPk(idIn).then(user => {
        if (!user) {
            res.status(401).send({});
        }

        if (userIn.password === "") {
            userIn.password = user.password;
        }

        return user.update(userIn)
            .then(newUser => res.status(200).send(newUser))
            .catch(error => res.status(403).send(error));
    }).catch(error => console.log(error));
}

function delUser(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    User.findByPk(idIn).then(user => {
        if (!user) {
            res.status(200).send({success: 0, description: "not found !"});
        } else {
            return user.destroy()
                .then(() => res.status(200).send({success: 1, description: "deleted!"}))
                .catch(() => res.status(403).send({success: 0, description: "error !"}))
        }
    }).catch(error => console.log(error));
}


module.exports = {
    getUsers,
    postUser,
    getUserById,
    putUser,
    delUser,
    MODULE_NAME
};
