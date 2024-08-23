'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kilometraje extends Model {

    static get table () {
        return 'kilometrajes'
    }

    static get store(){
        return [
            'vehiculo_id',
            'kilometraje',
            'km_recorridos'
        ]
    }

    vehiculos() {
        return this.belongsTo('App/Models/Vehiculo')
    }
}

module.exports = Kilometraje
