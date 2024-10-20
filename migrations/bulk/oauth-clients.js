module.exports.bulkInsertOAuthClients = async (queryInterface, encryptionService) => {

    const encryptedSecretAuth = encryptionService.encrypt('secret_auth');
    const encryptedSecretSecurity = encryptionService.encrypt('secret_security');
    const encryptedSecretUsers = encryptionService.encrypt('secret_users');

    return await queryInterface.bulkInsert('oauth_clients', [
        {
            id: '73ec884e-b96f-4181-8b90-8510dae8db44',
            name: 'auth',
            secret: encryptedSecretAuth,
        },
        {
            id: '929b2f4a-f065-4431-b5a2-a36f3148b57e',
            name: 'security',
            secret: encryptedSecretSecurity,
        },
        {
            id: '69eb5fc0-6bf1-446d-9dc2-ddd7ed2d2026',
            name: 'users',
            secret: encryptedSecretUsers,
        },
    ]);
}