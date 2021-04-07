const {tb_projects} = require("../models");
const {getResponse} = require("../helpers/utils");
const {applyHeaders} = require("../helpers/utils");

function getProjects(req, res) {
    applyHeaders(res);

    tb_projects.findAll()
        .then(projects => res.status(200).send(projects))
        .catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
}

function postProject(req, res) {
    applyHeaders(res);

    const project = req.body;

    tb_projects.create(project)
        .then(result => res.status(201).send(getResponse(true, "Project created", result)))
        .catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
}

function putProject(req, res) {
    applyHeaders(res);

    const id = req.swagger.params.id.value;
    const project = req.body;

    tb_projects.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).send(getResponse(false, "Project not found", id));
        }

        return result.update(project)
            .then(updated => res.status(200).send(getResponse(true, "Project updated", updated)))
            .catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
    }).catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
}

function deleteProject(req, res) {
    applyHeaders(res);

    const id = req.swagger.params.id.value;

    tb_projects.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).send(getResponse(false, "Project not found", id));
        }

        return result.destroy()
            .then(_ => res.status(200).send(getResponse(true, id)))
            .catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
    }).catch(reason => res.status(500).send(getResponse(false, "There was an error", reason.toString())));
}

module.exports = {
    getProjects,
    postProject,
    putProject,
    deleteProject
}
