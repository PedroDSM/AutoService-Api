'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vehiculo extends Model {
    static get table () {
        return 'vehiculos'
    }

    user () {
        return this.belongsTo('App/Models/User', 'propietario_id', 'id')
    }
      
    static get store(){

        return[
            'marca',
            'modelo', 
            'anio', 
            'color', 
            'numero_placa', 
            'numero_serie',
            'tipo_vehiculo', 
            'kilometraje', 
            'transmision',
            'propietario_id'
        ]
        
    }

    static get km(){
        return[
            'kilometraje', 
        ]
    }

    // Enum para estados
    static get estados() {
        return {
            ACTIVO: 1,
            INACTIVO: 2,
            EN_TALLER: 3,
            ACCIDENTADO: 4,
            PERDIDA_TOTAL: 5,
            ROBADO: 6,
        }
    }

    citas() {
        return this.hasMany('App/Models/Cita')
    }

    km() {
        return this.hasMany('App/Models/Kilometraje')
    }
}

module.exports = Vehiculo
