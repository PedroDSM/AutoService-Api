'use strict'

class storeVehiculo {
  get rules () {
    return {
        propietario_id: 'required',
        marca: 'required',
        modelo: 'required',
        anio: 'required',
        color: 'required',
        numero_placa: 'required',
        numero_serie: 'required',
        tipo_vehiculo: 'required',
        kilometraje: 'required',
        transmision: 'required',
    }
  }
  get messages () {
    return {
        'propietario_id.required': 'Asigna un Propietario al Vehículo',
        'marca.required': 'Asigna una Marca al Vehículo',
        'modelo.required': 'Asigna un Modelo al Vehículo',
        'anio.required': 'Asigna un Año de Fabricación al Vehículo',
        'color.required': 'Asigna un Color al Vehículo',
        'numero_placa.required': 'Asigna un Número de Placa al Vehículo',
        'numero_serie.required': 'Asigna un Número de Serie al Vehículo',
        'tipo_vehiculo.required': 'Asigna un Tipo de Vehículo al Vehículo',
        'kilometraje.required': 'Asigna un Kilometraje al Vehículo',
        'transmision.required': 'Asigna una Transmisión al Vehículo'
    }
  }
}

module.exports = storeVehiculo