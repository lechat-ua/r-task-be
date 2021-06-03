import { responseBuilder } from '../helpers/index.js';
import { EntitiesModel } from '../models/entities.js';

class EntitiesControllerClass {
  async list(request, response) {
    try {
      const data = (await EntitiesModel.list()).map(item => ({ ...item, id: item.ID }));
      return responseBuilder(response, 200, data);  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
}

export const EntitiesController = new EntitiesControllerClass();