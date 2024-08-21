'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VistaRol extends Model {
    static get table () {
        return 'vistas_roles'
    }

    static get vista_rol(){
        return [
            'rol_id',
            'vista_id'
        ]
    }
}

module.exports = VistaRol
