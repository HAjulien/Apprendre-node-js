const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

export const PokemonModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "Pokemon",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique : {
                    msg : "Le nom est déjà pris." 
                },
                validate: {
                    notEmpty : {msg : 'nom ne doit pas être vide'},
                    notNull : { msg : 'nom requis' }
                }
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt : {msg : 'Utiliser uniquement des nombres entiers pour les pv'},
                    notNull : { msg : 'Points de Vie requis' },
                    min : {
                        args : [0],
                        msg : "Les points de vie doivent être supérieur ou égal à 0"
                    },
                    max : {
                        args : [999],
                        msg : "Les points de vie doivent être inférieur ou égale à 999"
                    }
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt : {msg : 'Utiliser uniquement des nombres entiers pour les cp'},
                    notNull : { msg : 'CP requis' },
                    min : {
                        args : [0],
                        msg : "Les CP doivent être supérieur ou égal à 0"
                    },
                    max : {
                        args : [99],
                        msg : "Les CP doivent être inférieur ou égale à 99"
                    }
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl : {msg : 'Utiliser uniquement un lien valide'},
                    notNull : { msg : 'image obligatoire' }
                }
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    this.setDataValue('types', types.join())
                },
                validate: {
                    isTypeValid(value){
                        if(!value){
                            throw new Error('Un pokemon doit avoir au moins un type.')
                        }
                        if(value.split(',').length > 3){
                            throw new Error('Un pokemon ne doit pas avoir plus de trois types.')
                        }
                        value.split(',').forEach(type => {
                            if(!validTypes.includes(type)){
                                throw new Error(`Le type de pokemon doit appartenir à la liste suivante : ${validTypes}`)
                            }
                        })
                    }
                }
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
