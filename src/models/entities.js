import { BaseModelClass } from "./base.js";

class EntitiesModelClass extends BaseModelClass {
  constructor() {
    super();
    this.table = 'entities';
    this.tableView = 'entitiesV';
  }

  // async list() {
  //   return this.db.query(`select * from ${this.tableView}`);
  // }
}

export const EntitiesModel = new EntitiesModelClass();