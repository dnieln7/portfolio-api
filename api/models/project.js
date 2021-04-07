module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('tb_projects', {
        name: DataTypes.STRING,
        summary: DataTypes.TEXT,
        image: DataTypes.TEXT,
        type: DataTypes.STRING,
        year: DataTypes.INTEGER,
        finished: DataTypes.BOOLEAN,
        updates: DataTypes.BOOLEAN,
        executableUrl: DataTypes.STRING,
        executableGit: DataTypes.STRING,
        webUrl: DataTypes.STRING,
        webGit: DataTypes.STRING,
        androidUrl: DataTypes.STRING,
        androidGit: DataTypes.STRING,
        hostingDetails: DataTypes.TEXT,
        languages: DataTypes.ARRAY(DataTypes.STRING),
        technologies: DataTypes.ARRAY(DataTypes.STRING),
        problem: DataTypes.TEXT,
        difficulties: DataTypes.TEXT,
        solution: DataTypes.TEXT,
        comments: DataTypes.TEXT,
        features: DataTypes.ARRAY(DataTypes.STRING),
    }, {});
    User.associate = function (models) {

    };
    return User;
};
