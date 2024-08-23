'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cita extends Model {

    static get table () {
        return 'citas'
    }

    static get store(){
        return [
            'vehiculo_id',
            'servicio_id',
            'taller_id',
            'fecha_cita',
            'hora_cita',
            'notas_adicionales',
            'costo_cita'
        ]
    }

    // Enum para estados
    static get estados() {
        return {
            PENDIENTE: 1,
            ENTRO_TALLER: 2,
            SALIO_TALLER: 3,
            FINALIZADA: 4,
            CANCELADA: 5
        }
    }

    vehiculos() {
        return this.belongsTo('App/Models/Vehiculo')
    }
    talleres() {
        return this.belongsTo('App/Models/Taller')
    }
    servicios() {
        return this.belongsTo('App/Models/Servicio')
    }
}

module.exports = Cita
