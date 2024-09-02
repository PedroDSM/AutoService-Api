'use strict'

class storeHistorial {
  get rules () {
    return {
        user_id: 'required',
        descripcion: 'required'
    }
  }
  get messages () {
    return {
      'user_id.required': 'El campo usuario es requerido',
      'descripcion.required': 'El campo descripción es requerido'
    }
  }
}

module.exports = storeHistorial