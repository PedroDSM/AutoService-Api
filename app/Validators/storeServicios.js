'use strict'

class storeServicios {
  get rules () {
    return {
        nombre: 'required',
        descripcion: 'required',
        categoria: 'required',
        precio: 'required',
        duracion: 'required'
    }
  }
  get messages () {
    return {
        'nombre.required': 'Por favor, introduce un nombre de servicio.',
        'descripcion.required': 'Por favor, introduce una descripción del servicio.',
        'categoria.required': 'Por favor, introduce una categoría del servicio.',
        'precio.required': 'Por favor, introduce un precio estimado.',
        'duracion.required': 'Por favor, introduce una duración estimada en minutos.',
    }
  }
}

module.exports = storeServicios