import express from 'express';
import { CollectionsController } from './controllers/collections.js';
import { ContextsController } from './controllers/contexts.js';
import { EntitiesController } from './controllers/entities.js';

const router = express.Router();

router
  .get('/collections', CollectionsController.list)
  .post('/collections', CollectionsController.create)
  .put('/collections/:id', CollectionsController.update)
  .delete('/collections/:id', CollectionsController.remove)

  .get('/contexts', ContextsController.list)

  .get('/entities', EntitiesController.list);

export default router;