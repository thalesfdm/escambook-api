import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

    class Copy extends Model { }

    Copies.init({

        copyId: {
            field: 'copyid',
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },

        userId: {
            field: 'ownerid',
            type: DataType.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        bookId: {
            field: 'bookid',
            type: DataType.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        condition: {
            field: 'condition',
            type: DataTypes.STRING,
            validate: { len: [1, 40] }
        },

        createdAt: {
            field: 'createdat',
            type: DataTypes.DATE, allowNull: false
        },

        updatedAt: {
            field: 'updatedat',
            type: DataTypes.DATE, allowNull: false
        }

    }, { sequelize, modelName: 'copies', freezeTableName: true });

    return  Copy;
}
