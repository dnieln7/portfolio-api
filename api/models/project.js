module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('tb_projects', {
        name: DataTypes.STRING,
        summary: DataTypes.TEXT,
        year: DataTypes.INTEGER,
        importance: DataTypes.FLOAT,
        thumbnail: DataTypes.TEXT,
        images: DataTypes.ARRAY(DataTypes.TEXT),
        tags: DataTypes.ARRAY(DataTypes.STRING),
        duration: DataTypes.STRING,
        description: DataTypes.TEXT,
        features: DataTypes.ARRAY(DataTypes.STRING),
        technologies: DataTypes.ARRAY(DataTypes.STRING),
        androidUrl: DataTypes.STRING,
        androidGit: DataTypes.STRING,
        webUrl: DataTypes.STRING,
        webGit: DataTypes.STRING,
        programUrl: DataTypes.STRING,
        programGit: DataTypes.STRING,
    }, {});
    User.associate = function (models) {

    };
    return User;
};
