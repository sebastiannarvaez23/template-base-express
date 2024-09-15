import express from 'express';

import usersRoutes from './users.routes';

const apiGatewayRoutes = express.Router();

// Rutas
apiGatewayRoutes.use(usersRoutes);

export default apiGatewayRoutes;