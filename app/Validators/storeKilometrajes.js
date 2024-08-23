'use strict'

class storeKilometrajes {

  get rules () {
    return {
        vehiculo_id: 'required',
        kilometraje: 'required',
        km_recorridos: 'required',
    }
  }
  get messages () {
    return {
        'vehiculo_id.required': 'Por favor, introduce un vehículo.',
        'kilometraje.required': 'Por favor, introduce un kilometraje.',
        'km_recorridos.required': 'Por favor, introduce el kilometraje recorrido.',
    }
  }

}

module.exports = storeKilometrajes