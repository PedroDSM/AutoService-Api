'use strict'

class storeVistaRol {
  get rules () {
    return {
      rol_id: 'required',
      vista_id: 'required'
    }
  }
  get messages () {
    return {
        'rol_id.required': 'Asigna un Rol',
        'vista_id.required': 'Agrega una Vista',
    }
  }
}

module.exports = storeVistaRol