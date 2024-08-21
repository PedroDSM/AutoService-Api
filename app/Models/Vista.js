'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vista extends Model {
    static get table () {
        return 'vistas'
    }

    static get store(){
        return [
            'nombre',
            'icono',
            'ruta'
        ]
    }

    roles() {
        return this.belongsToMany('App/Models/Rol')
        .pivotTable('vistas_roles')
    }
}

module.exports = Vista
