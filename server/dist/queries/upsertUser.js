"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUserQuery = void 0;
exports.upsertUserQuery = {
    query: `
  mutation upsertUser($id:String, $name:String) {
  insert_users_one(object: {id: $id, name: $name}, on_conflict: {constraint: users_pkey, update_columns: updatedAt}) {
    id
  }
}

`,
    operationName: 'upsertUser'
};
