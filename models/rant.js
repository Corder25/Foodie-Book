// create our Rant model
module.exports = function(sequelize, DataTypes) {
    const Rant = sequelize.define("Rant", {
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 10
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Rant.associate = function(models) {
        // a Rant belongs to a User
        // a Rant can't be created without a User due to the foreign key constraint
        Rant.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Rant;
};