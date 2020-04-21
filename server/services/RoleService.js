import models from '../models';

const { Role } = models;

export default class RoleService {
  static createRole(model) {
    return Role.create(model);
  }

  static getRoles() {
    return Role.findAll();
  }

  static updateRole(newValues, whereProp) {
    return Role.update(newValues, {
      where: whereProp,
    });
  }

  static deleteRole(whereProp) {
    return Role.destroy({
      where: whereProp,
    });
  }

  static findById(modelId) {
    return Role.findOne({
      where: { id: modelId },
    });
  }

  static findByName(modelName) {
    return Role.findOne({
      where: { name: modelName },
    });
  }
}
