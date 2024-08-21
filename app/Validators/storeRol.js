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
        'rol_name.required': 'Asigna un Nombre al Rol',
        'description.required': 'Agrega una Descripción al Rol',
    }
  }
}

module.exports = storeRol