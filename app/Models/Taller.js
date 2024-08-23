'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Taller extends Model {

    static get table () {
        return 'talleres'
    }

    static get store(){
        return[
            'nombre', 
            'direccion', 
            'telefono', 
            'horario_apertura',
            'horario_cierre'
        ]
    }
    
    citasTaller() {
        return this.hasMany('App/Models/Cita')
    }
}

module.exports = Taller
