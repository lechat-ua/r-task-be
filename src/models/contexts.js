import { BaseModelClass } from "./base.js";

class ContextsModelClass extends BaseModelClass {
  constructor() {
    super();
    this.table = 'contexts';
  }
}

export const ContextsModel = new ContextsModelClass();