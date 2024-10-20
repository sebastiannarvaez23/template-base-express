module.exports.createTableRolesServices = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('roles_services', {
        role_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id',
            },
        },
        service_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
        }
    });
}