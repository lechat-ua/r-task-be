import { db } from '../services/db.js';
import { prepareDBWhereParams, prepareDBUpdateParams } from '../helpers/index.js'

export class BaseModelClass {
  table;
  db;
  constructor() {
    this.db = db.getPool();
  }
  async list() {
    return this.db.query(`select * from ${this.table}`);
  }
  async findByParams(params) {
    const preparedParams = prepareDBWhereParams(params, this.db.escape);
    const data = await this.db.query(`select * from ${this.table} where ${preparedParams} limit 1`);
    if (data) {
      return data[0];
    } else {
      return undefined;
    }
  }
  async create(values) {
    const preparedValues = prepareDBUpdateParams(values, this.db.escape);
    const { insertId } = await this.db.query(`insert into ${this.table} set ${preparedValues}`);
    return { ...values, ID: insertId, id: insertId };
  }
  async update(values, params) {
    const preparedValues = prepareDBUpdateParams(values, this.db.escape);
    const preparedParams = prepareDBWhereParams(params, this.db.escape);
    return this.db.query(`update ${this.table} set ${preparedValues} where ${preparedParams}`);
  }
  async remove(params) {
    const preparedParams = prepareDBWhereParams(params, this.db.escape)
    return this.db.query(`delete from ${this.table} where ${preparedParams}`);
  }
}