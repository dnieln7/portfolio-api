'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tb_projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            summary: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            finished: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            updates: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            executableUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            executableGit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            webUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            webGit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            androidUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            androidGit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            hostingDetails: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            languages: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            technologies: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            problem: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            difficulties: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            solution: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            comments: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            features: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tb_projects');
    }
};
