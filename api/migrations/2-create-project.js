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
            year: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            importance: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            thumbnail: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            images: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                allowNull: false
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            duration: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            features: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            technologies: {
                type: Sequelize.ARRAY(Sequelize.STRING),
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
            webUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            webGit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            programUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            programGit: {
                type: Sequelize.STRING,
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
