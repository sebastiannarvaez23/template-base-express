module.exports.createTableOAuthClients = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('oauth_clients', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        secret: {
            type: Sequelize.STRING(255),
            allowNull: false,
        }
    });
}