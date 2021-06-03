import { responseBuilder } from '../helpers/index.js';
import { CollectionsModel } from '../models/collections.js';

class CollectionsControllerClass {
  async create(request, response) {
    try {
      const values = request.body;
      const data = await CollectionsModel.create(values);
      return responseBuilder(response, 200, data);  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
  async update(request, response) {
    try {
      const { id } = request.params;
      const { values } = request.body;
      const data = await CollectionsModel.update(values, { id });
      return responseBuilder(response, 200, data);  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
  async remove(request, response) {
    try {
      const { id } = request.params;
      await CollectionsModel.remove({ id });
      return responseBuilder(response, 200, 'Record removed');  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
  async list(request, response) {
    try {
      const data = await CollectionsModel.list();
      return responseBuilder(response, 200, data);  
    } catch (e) {
      return responseBuilder(response, 400, e);
    }
  }
}

export const CollectionsController = new CollectionsControllerClass();