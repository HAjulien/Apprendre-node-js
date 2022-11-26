export const badgeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Badge", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                unique : {
                    msg : "Le nom est déjà pris." 
                }
            }
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
