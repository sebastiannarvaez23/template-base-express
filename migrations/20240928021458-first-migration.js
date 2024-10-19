const { EncryptionUtil } = require('../dist/src/lib-core/utils/encryption.util');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const encryptionService = new EncryptionUtil();

    // Create tables

    await queryInterface.createTable('oauth_clients', {
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

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_auth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    await queryInterface.createTable('persons', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        unique: true,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(4),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    await queryInterface.createTable('roles_services', {
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

    // Data initial migration

    const encryptedPassword = encryptionService.encrypt('admin');
    const encryptedSecretAuth = encryptionService.encrypt('secret_auth');
    const encryptedSecretSecurity = encryptionService.encrypt('secret_security');
    const encryptedSecretUsers = encryptionService.encrypt('secret_users');

    await queryInterface.bulkInsert('oauth_clients', [
      {
        id: '73ec884e-b96f-4181-8b90-8510dae8db44',
        name: 'auth',
        secret: encryptedSecretAuth,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '929b2f4a-f065-4431-b5a2-a36f3148b57e',
        name: 'security',
        secret: encryptedSecretSecurity,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '69eb5fc0-6bf1-446d-9dc2-ddd7ed2d2026',
        name: 'users',
        secret: encryptedSecretUsers,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        id: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        nickname: 'admin',
        password: encryptedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('roles', [
      {
        id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
        name: 'root',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('services', [
      {
        id: '4f851d66-0d95-4de9-b1f7-ec6fdfa2fdf6',
        code: '0201',
        name: 'Listar personas',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '0f0edb81-1855-4f49-845c-a35ddaf4204f',
        code: '0202',
        name: 'Obtener persona',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'f06220a3-f854-4762-add8-ab4927919f82',
        code: '0203',
        name: 'Creación de persona',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '62832b04-98bd-4b73-94e9-3008caaa2e3a',
        code: '0204',
        name: 'Edición de persona',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '992920ac-fcbd-47ea-8a49-60dffc655a3c',
        code: '0205',
        name: 'Eliminación de persona',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'a5fd20f3-bcee-4f0e-91d6-7b11cbb8c249',
        code: '0206',
        name: 'Obtener persona por nickname',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'e4031627-c90d-4ca0-9ec9-dacd5037fab0',
        code: '0207',
        name: 'Obtener persona por email',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'e529088b-c564-4c2c-86b1-f10c827d60c6',
        code: '0301',
        name: 'Listar roles',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '5d6719dc-e1f8-47ab-89c5-8e85df90fff9',
        code: '0302',
        name: 'Obtener rol',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '19c363ce-2e6c-46f1-ba2f-a60d3b88cd35',
        code: '0303',
        name: 'Creación de rol',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '7d8366d5-ade4-4bfe-8fd3-e14068710ab4',
        code: '0304',
        name: 'Edición de rol',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4c48b143-e3e0-4352-b359-199f90f89baf',
        code: '0305',
        name: 'Eliminación de rol',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '0a212b8f-bd48-4395-b671-fe9012f0932f',
        code: '0401',
        name: 'Listar servicios',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '7d9afd08-1648-4f4b-a52a-c18d8d0b81ae',
        code: '0402',
        name: 'Obtener servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'f8424ed4-dbc3-4165-8ba2-4bfdbd074c71',
        code: '0403',
        name: 'Creación de servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'c8726e82-306b-4893-a8b7-a35278dc7be9',
        code: '0404',
        name: 'Edición de servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'd66f0a1d-dbd7-4cbf-85ec-52239a2c77d0',
        code: '0405',
        name: 'Eliminación de servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '000cb939-cfef-4d95-a557-1574e7701da6',
        code: '0306',
        name: 'Crear asignación de servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '14b98ca6-9326-43b1-bf3d-c9995d64fa54',
        code: '0307',
        name: 'Eliminar asignación de servicio',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('roles_services', [
      {
        service_id: '4f851d66-0d95-4de9-b1f7-ec6fdfa2fdf6',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '0f0edb81-1855-4f49-845c-a35ddaf4204f',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'f06220a3-f854-4762-add8-ab4927919f82',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '62832b04-98bd-4b73-94e9-3008caaa2e3a',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '992920ac-fcbd-47ea-8a49-60dffc655a3c',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'e529088b-c564-4c2c-86b1-f10c827d60c6',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '5d6719dc-e1f8-47ab-89c5-8e85df90fff9',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '19c363ce-2e6c-46f1-ba2f-a60d3b88cd35',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '7d8366d5-ade4-4bfe-8fd3-e14068710ab4',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '4c48b143-e3e0-4352-b359-199f90f89baf',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '0a212b8f-bd48-4395-b671-fe9012f0932f',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '7d9afd08-1648-4f4b-a52a-c18d8d0b81ae',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'f8424ed4-dbc3-4165-8ba2-4bfdbd074c71',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'c8726e82-306b-4893-a8b7-a35278dc7be9',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'd66f0a1d-dbd7-4cbf-85ec-52239a2c77d0',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '000cb939-cfef-4d95-a557-1574e7701da6',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: '14b98ca6-9326-43b1-bf3d-c9995d64fa54',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'a5fd20f3-bcee-4f0e-91d6-7b11cbb8c249',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
      {
        service_id: 'e4031627-c90d-4ca0-9ec9-dacd5037fab0',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
      },
    ]);

    await queryInterface.bulkInsert('persons', [
      {
        id: '8899d542-3a35-4494-b6de-d2421d5ca5da',
        first_name: 'administrador',
        last_name: 'administrador',
        email: 'admin@email.com',
        phone: '1111111111',
        birth_date: new Date(),
        user_id: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
        created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
        updated_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('persons', null, {});
    await queryInterface.bulkDelete('roles_services', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('oauth_clients', null, {});

    await queryInterface.dropTable('roles_services');
    await queryInterface.dropTable('persons');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('oauth_clients');
  }
};
