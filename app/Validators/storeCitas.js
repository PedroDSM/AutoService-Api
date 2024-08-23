'use strict'

class storeCitas {
  get rules () {
    return {
        vehiculo_id: 'required',
        servicio_id: 'required',
        taller_id: 'required',
        fecha_cita: 'required',
        hora_cita: 'required',
        notas_adicionales: 'required',
        costo_cita: 'required'
    }
  }
  get messages () {
    return {
        'vehiculo_id.required': 'Por favor, introduce un vehículo.',
        'servicio_id.required': 'Por favor, introduce un servicio.',
        'taller_id.required': 'Por favor, introduce un taller.',
        'fecha_cita.required': 'Por favor, introduce una fecha de cita.',
        'hora_cita.required': 'Por favor, introduce una hora de cita.',
        'notas_adicionales.required': 'Por favor, introduce notas adicionales.',
        'costo_cita.required': 'Por favor, introduce un costo de cita.'
    }
  }
}

module.exports = storeCitas