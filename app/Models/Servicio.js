'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servicio extends Model {

    static get table () {
        return 'servicios'
    }

    static get store(){
        return [
            'nombre',
            'descripcion',
            'categoria',
            'precio',
            'duracion'
        ]
    }
    
    citasServicios() {
        return this.hasMany('App/Models/Cita')
    }
}

module.exports = Servicio
