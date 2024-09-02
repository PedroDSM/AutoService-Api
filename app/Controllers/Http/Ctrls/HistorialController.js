'use strict'

const Historial = use('App/Models/Historial');

class HistorialController {

    async index ({ auth, response }){
        //const user = await auth.getUser();
        const history = await Historial.query()
        .with('users')
        .fetch()
        return response.status(200).send({
            historial: history,
        })
         
    }

}

module.exports = HistorialController
