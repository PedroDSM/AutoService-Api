'use strict'

class storeTalleres {
  get rules () {
    return {
        nombre: 'required',
        direccion: 'required',
        telefono: 'required',
        horario_apertura: 'required',
        horario_cierre: 'required',
    }
  }
  get messages () {
    return {
        'nombre.required': 'Por favor, introduce un nombre de taller.',
        'direccion.required': 'Por favor, introduce una dirección de taller.',
        'telefono.required': 'Por favor, introduce un número de teléfono de taller.',
        'horario_apertura.required': 'Por favor, introduce un horario de apertura de taller.',
        'horario_cierre.required': 'Por favor, introduce un horario de cierre de taller.',
    }
  }
}

module.exports = storeTalleres