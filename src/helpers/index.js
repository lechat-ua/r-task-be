import express from 'express';
import mariadb, { SqlError } from 'mariadb';

export const responseBuilder = (response, code, data) => {
  const body = data.error || data.errno ? { message: formatError(data) } : data;
  response.status(code).json(body);
};

const prepareDBParamsPairs = (params, escapeFn = value => value) => {
  const combined = [];
  Object.keys(params).forEach(key => {
    combined.push(`${key}=${escapeFn(params[key])}`);
  });
  return combined;
}

export const prepareDBWhereParams = (params, escapeFn = value => value) => {
  return prepareDBParamsPairs(params, escapeFn).join(' and ');
}

export const prepareDBUpdateParams = (params, escapeFn = value => value) => {
  return prepareDBParamsPairs(params, escapeFn).join(', ');
}

const sqlErrorsMap = {
  ER_DUP_ENTRY: 'Duplicate entry'
}

export const formatError = error => {
  if (error instanceof SqlError) {
    return sqlErrorsMap[error.code] || error.code;
  }
  return error;
}