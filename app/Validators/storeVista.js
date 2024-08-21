'use strict'

class storeVista {
  get rules () {
    return {
        nombre: 'required',
        icono: 'required',
        ruta: 'required'
    }
  }
  get messages () {
    return {
      'nombre.required': 'PorFavor Agregue un Nombre a la Vista.',
      'icono.required': 'PorFavor Agregue un Icono a la Vista',
      'ruta.required': 'PorFavor Agregue una Ruta a la Vista',
    }
  }
}

module.exports = storeVista