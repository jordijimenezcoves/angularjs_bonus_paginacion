var app = angular.module('paginacionApp.servicios',[]);

app.factory('Paises', ['$http', function($http){
		
	var self = {
		cargando: false,
		pagina: 1,
		total: 0,
		totalpaginas: 0,
		data: [],
		irA: function( pag ){
			self.cargarData({
				pagina: pag
			});
		},
		cargarUltima: function(){
			self.cargarData({
				pagina: self.totalpaginas
			});
		},
		cargarPrimera: function(){
			self.cargarData({
				pagina: 1
			});
		},
		cargarData: function( opciones ){
			self.cargando = true;
			self.pagina = opciones.pagina;

			$http.post('php/servicios/paises.getPaises.php', opciones)
				.success(
					function( respuesta ){
						console.log(respuesta);
						self.cargando = false;
						self.totalpaginas = respuesta.totalpaginas;
						self.total = respuesta.total;
						self.data = respuesta.data;
					}
				)
				.error(
					function( respuesta){
						console.error( respuesta );
					}
				);
		}
	};
	
	var defecto = {
		pagina: 1
	};

	self.cargarData( defecto );

	return self;

}])