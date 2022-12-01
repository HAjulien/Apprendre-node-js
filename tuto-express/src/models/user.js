export const UserModel = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : {
                msg : "Le nom est déjà pris." 
            },
            validate: {
                notEmpty : {msg : 'nom ne doit pas être vide'},
                notNull : { msg : 'nom requis' },
                len:{
                    args:[4, 40],
                    msg:"Le nom doit avoir entre 4 et 40 caractères"
                },
            },
        },
        password: {
            type: DataTypes.STRING,
        },
    });
};
