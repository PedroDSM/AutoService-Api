'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
Route.post('/login', 'Auth/UserController.login');
Route.post('/registro', 'Auth/UserController.store');
Route.post('/logout', 'Auth/UserController.logout').middleware(['checktoken']);
}).prefix('api/v1/Auth');

Route.group(() => {
    Route.get('/roles', 'Auth/RolController.index');
    Route.post('/rol', 'Auth/RolController.store');
    Route.put('/rol/:id', 'Auth/RolController.update');
    Route.delete('/rol/:id', 'Auth/RolController.destroy');
    Route.post('/vistarol', 'Auth/RolController.VistaRol');
    Route.put('/vistarol/:id', 'Auth/RolController.updateVistaRol');
}).prefix('api/v1/Roles');

Route.group(() => {
    Route.get('/users', 'Auth/UserController.index');
    Route.put('/user/:id', 'Auth/UserController.update');
    Route.delete('/user/:id', 'Auth/UserController.destroy');
}).prefix('api/v1/Usuarios');

Route.group(() => {
    Route.get('/vistas', 'Ctrls/VistaController.index');
    Route.post('/vista', 'Ctrls/VistaController.store');
    Route.put('/vista/:id', 'Ctrls/VistaController.update');
    Route.delete('/vista/:id', 'Ctrls/VistaController.destroy');
}).prefix('api/v1/Vistas');

Route.group(() => {
    Route.get('/vehiculos', 'Ctrls/VehiculoController.index');
    Route.post('/vehiculo', 'Ctrls/VehiculoController.store');
    Route.put('/vehiculo/:id', 'Ctrls/VehiculoController.update');
    Route.put('/vehiculo/status/:id', 'Ctrls/VehiculoController.ChangeStatus');
}).prefix('api/v1/Vehiculos');

Route.group(() => {
    Route.get('/talleres', 'Ctrls/TallerController.index');
    Route.post('/taller', 'Ctrls/TallerController.store');
    Route.put('/taller/:id', 'Ctrls/TallerController.update');
    Route.delete('/taller/:id', 'Ctrls/TallerController.destroy');
}).prefix('api/v1/Talleres');

Route.group(() => {
    Route.get('/servicios', 'Ctrls/ServicioController.index');
    Route.post('/servicio', 'Ctrls/ServicioController.store');
    Route.put('/servicio/:id', 'Ctrls/ServicioController.update');
    Route.delete('/servicio/:id', 'Ctrls/ServicioController.destroy');
}).prefix('api/v1/Servicios');

Route.group(() => {
    Route.get('/citas', 'Ctrls/CitaController.index');
    Route.post('/cita', 'Ctrls/CitaController.store');
    Route.put('/cita/:id', 'Ctrls/CitaController.update');
    Route.put('/cita/status/:id', 'Ctrls/CitaController.ChangeStatus');
}).prefix('api/v1/Citas');

Route.group(() => {
    Route.get('/kilometrajes', 'Ctrls/KilometrajeController.index');
    Route.post('/kilometraje', 'Ctrls/KilometrajeController.store');
    Route.put('/kilometraje/:id', 'Ctrls/KilometrajeController.update');
}).prefix('api/v1/Kilometrajes');

Route.group(() => {
    Route.get('/historiales', 'Ctrls/HistorialController.index');
}).prefix('api/v1/Historiales');