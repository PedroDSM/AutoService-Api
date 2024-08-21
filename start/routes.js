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
}).prefix('api/v1/auth');

Route.group(() => {
    Route.get('/roles', 'Auth/RolController.index');
    Route.post('/rol', 'Auth/RolController.store');
    Route.post('/vistarol', 'Auth/RolController.VistaRol');
}).prefix('api/v1/Roles');

Route.group(() => {
    Route.get('/users', 'Auth/UserController.index');
}).prefix('api/v1/Usuarios');

Route.group(() => {
    Route.get('/vistas', 'Ctrls/VistaController.index');
    Route.post('/vista', 'Ctrls/VistaController.store');
}).prefix('api/v1/Vistas');