import { responseBuilder } from '../helpers/index.js';
import { ContextsModel } from '../models/contexts.js';

class ContextsControllerClass {
  async list(request, response) {
    try {
      const data = (await ContextsModel.list()).map(item => ({ ...item, id: item.ID }));
      return responseBuilder(response, 200, data);  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
}

export const ContextsController = new ContextsControllerClass();