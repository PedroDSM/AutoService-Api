'use strict'

class storeRol {
  get rules () {
    return {
      rol_name: 'required',
      description: 'required'
    }
  }
  get messages () {
    return {
      'rol_name.required': 'PorFavor Agregue un Nombre al Rol.',
      'description.required': 'PorFavor Agregue una Descripcion al Rol'
    }
  }
}

module.exports = storeRol