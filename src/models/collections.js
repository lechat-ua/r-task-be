import { BaseModelClass } from "./base.js";

class CollectionsModelClass extends BaseModelClass {
  constructor() {
    super();
    this.table = 'collections';
    this.tableView = 'collectionsV';
  }

  async list() {
    return this.db.query(`select * from ${this.tableView}`);
  }

  async createExtraTables(item) {
    // create custom table
    const customTableName = `c_${item.ID}`;
    const fields = [];
    const fieldsKeys = [];
    const { structure } = item;
    if (structure) {
      const formattedFields = JSON.parse(structure);
      if (formattedFields.name) {
        fields.push(`name char(80)`);
        fieldsKeys.push(`unique key (name)`);
      }
      if (formattedFields.code) {
        fields.push(`code char(20)`);
        fieldsKeys.push(`unique key (code)`);
      }
      if (formattedFields.ord) {
        fields.push(`ord integer(20)`);
      }
      if (formattedFields.custom) {
        // it should be implemented like this?
        formattedFields.custom.forEach((customFields, idx) => {
          fields.push(`c_${idx} json`);
        });
      }
    }
    await this.db.query(`drop table if exists ${customTableName}`);
    const query = `create table ${customTableName} (
      id int(11) not null auto_increment,
      description varchar(400),
      ${fields.join(',')}${fields.length > 0 && ','}
      primary key (id),
      ${fieldsKeys.join(',')}
    )`;
    console.log('query', query);
    await this.db.query(query);
  }

  async create(values) {
    const item = await super.create(values);
    await this.createExtraTables(item);
    return item;
  }

  async update(values, params) {
    await super.update(values, params);
    const item = await this.findByParams(params);
    await this.createExtraTables(item);
    return item;
  }
}

export const CollectionsModel = new CollectionsModelClass();