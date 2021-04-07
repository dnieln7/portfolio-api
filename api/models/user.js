module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('tb_users', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {});
    User.associate = function (models) {

    };
    return User;
};
