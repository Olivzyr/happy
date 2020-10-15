import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// Rota para buscar todos os orfanatos salvos em nossa base de dados
routes.get('/orphanages', OrphanagesController.index);

// Rota para saber os detalhes de um único orfanato
routes.get('/orphanages/:id', OrphanagesController.show);

// Rota para criar um orfanato em nossa base de dados
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;