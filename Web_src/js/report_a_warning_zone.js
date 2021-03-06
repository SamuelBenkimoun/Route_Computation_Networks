var drawControl=null;
var editableLayers=null;


$(".radio_button").change(function (){ // choix de dessin

	//console.log("kqsdqsdqs");
	
	if ($("#Navigate").is(":checked") ){
		$("#dep").prop('disabled', false);	
		$("#dest").prop('disabled', false);	
		if( markeraDestination != null && markeraDestination != null ){
		markerDeparture.dragging.enable();
		markeraDestination.dragging.enable();	
		}
		map.removeControl(drawControl);
	}
	
	
	
	else if ($("#Circle1").is(":checked")==true ){
	
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}	
	
		
	if( drawControl != null ) {
		
		map.removeControl(drawControl);
	}	
	// Initialise the FeatureGroup to store editable layers
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	circle: {
     	 shapeOptions: {
     	   color: '#e10000'
     	 },
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	polygon: false, // Turns off this drawing tool
    	rectangle: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers,
   	 edit: true,
   	 remove: true
  	}
	};
	
	drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
	
	}
	
	
	
	else if ($("#Box1").is(":checked")==true ){
	
		
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}	
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	rectangle: {
     	 shapeOptions: {
     	   color: '#e10000'
     	 }
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	circle: false, // Turns off this drawing tool
    	polygon: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers, //REQUIRED!!
   	 edit: true,
   	 remove: true
  	}
	};
drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
	}
	
	
	
	else if ($("#Polygon1").is(":checked")==true ){
	
	
	if( drawControl != null ) {
		map.removeControl(drawControl);
	}	
	$("#dep").prop('disabled', true);
	$("#dest").prop('disabled', true);
	if( markerDeparture != null ) {	
	markerDeparture.dragging.disable();	
	}
	if( markeraDestination != null ) {
	markeraDestination.dragging.disable();
	}
	// Initialise the FeatureGroup to store editable layers
	
	editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	var drawPluginOptions = {
  	position: 'topright',
  		draw: {
    	polygon: {
     	 allowIntersection: false, // Restricts shapes to simple polygons
      	drawError: {
       		 color: '#e1e100', // Color the shape will turn when intersects
     		   message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    	  },
     	 shapeOptions: {
     	   color: '#e10000'
     	 }
  	  },
    // disable toolbar item by setting it to false
    	polyline: false,
    	circle: false, // Turns off this drawing tool
    	rectangle: false,
    	marker: false,
    	},
  	edit: {
   	 featureGroup: editableLayers, //REQUIRED!!
   	 edit: true,
   	 remove: true
  	}
	};
	drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);
}

	// Initialise the draw control and pass it the FeatureGroup of editable layers

	//editableLayers = new L.FeatureGroup();
	//map.addLayer(editableLayers);



	
	

});


map.on('draw:created', function(e) {
  		var type = e.layerType;
  		////console.log(type);
  		
  		var layer = e.layer;
  		//console.log(layer);
  		
  		var content =null;
  		
  		
  		if( type=="circle" && $("#Circle1").is(":checked")==true) {
    		
			//var description = prompt("Please enter the description of the danger", "Description");
  		
  		
  			var des=null;
			var lev=null;
  			
  			bootbox.confirm(
  			"<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='level'>\
   				<option value=1 selected >Road accident </option>\
   				<option value=2 >Road degradation</option>\
    			<option value=3  >Criminal insecurity</option>\
    			<option value=4 >Massive gathering</option>\
    			<option value=5 >Natural hazard</option>\
    			<option value=6 >Traffic jam</option>\
    			<option value=7 >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>	"
    		, function(result) {
    		
        		//console.log("inside");
    			des= $('#description').val();
    			lev= $('#level').val();
  				
    			var layergeo=layer.toGeoJSON();
  			
  				layergeo.properties= {
       			 "type": "warningType",
       			 "typeGeometry" : "circle",
       			 "radius" : layer._mRadius ,
       			 "id" : layer._leaflet_id ,	
        		 "description": des,
     		     "level": lev,
     		     "date": Date.now()
   			 };
   			 	
   			 	content = getPopupContent(layer,layergeo);
   			 	//console.log(content);
   			 	if (content !== null) {
                	layer.bindPopup(content);
                	//layer.setPopupContent(content);
       			 }
				
    			circle.push(layergeo);

				//console.log(circle);
				
			}
			);
  			

  			editableLayers.addLayer(layer);
			
			

		}
		
		else if( type=="rectangle" && $("#Box1").is(":checked")==true ) {
		
		var des=null;
		var lev=null;
  			
		
		bootbox.confirm(
  			"<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='level'>\
   				<option value=1 selected >Road accident </option>\
   				<option value=2 >Road degradation</option>\
    			<option value=3  >Criminal insecurity</option>\
    			<option value=4 >Massive gathering</option>\
    			<option value=5 >Natural hazard</option>\
    			<option value=6 >Traffic jam</option>\
    			<option value=7 >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>	"
    		, function(result) {
    		
			//console.log("inside");
    			des= $('#description').val();
    			lev= $('#level').find(":selected").val();
  				
  				////console.log("rectange");
    			layerjson=layer.toGeoJSON();
    			layerjson.properties={
       					 "type": "warningType",
       					 "description": des,
       					 "id" : layer._leaflet_id ,	
       					 "level": lev,
        				"date": Date.now()
    			}
    			content = getPopupContent(layer,layerjson)
    			if (content !== null) {
                layer.bindPopup(content);
       			 }

				box.push(layerjson);
				//console.log(box);
			}
			);

  			editableLayers.addLayer(layer);
		
		}
		
		else if( type=="polygon" && $("#Polygon1").is(":checked")==true) {



		var des=null;
		var lev=null;
  			
		
		bootbox.confirm(
  			"<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='level'>\
   				<option value=1 selected >Road accident </option>\
   				<option value=2 >Road degradation</option>\
    			<option value=3  >Criminal insecurity</option>\
    			<option value=4 >Massive gathering</option>\
    			<option value=5 >Natural hazard</option>\
    			<option value=6 >Traffic jam</option>\
    			<option value=7 >Road closure</option>\
			</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description'>\
				</div>	"
    		, function(result) {
    		
        		//console.log("inside");
    			des= $('#description').val();
    			lev= $('#level').find(":selected").val();
  				
  				//console.log(" polygon");
    			layerjson=layer.toGeoJSON();
    			layerjson.properties= {
        			"type": "warningType",
       				 "description": des,
       				 "id" : layer._leaflet_id ,	
       				 "level" : lev ,
       				 "date": Date.now()
   			 }
    			
    			content = getPopupContent(layer,layerjson)
    			if (content !== null) {
                layer.bindPopup(content);
       			 }
				polygon.push(layerjson);
				//console.log(polygon);
		
			}
			);
		
		
		editableLayers.addLayer(layer);
		
		
		}
		
		//layer.bindPopup('A popup!');
		//var popup = L.popup().setContent("I am a standalone popup.");
		//layer.bindPopup(popup).openPopup();
    	//console.log(layer);
		//editableLayers.addLayer(layer);
		//console.log(editableLayers);

	});


 var getPopupContent = function(layer,geo) {

			if (layer instanceof L.Circle) {
                
            var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> ' +geo.properties.typeGeometry+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
                
            }
            
             else if (layer instanceof L.Polygon) {
            
            	var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> '+geo.geometry.type+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
            } 

			 else if (layer instanceof L.Rectangle) {
            
            	var html= '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> '+geo.geometry.type+'</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>'+geo.properties.level+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>'+geo.properties.description+'</td>\
  						</tr>\
  						<tr>\
   							 <td>Date : </td>\
    						 <td>'+geo.properties.date+'</td>\
  						</tr>\
						</table>'
				return html;
            
            }
            
            return null
        };
        

map.on('draw:edited', function (e) {
		var type = e.layerType;
         var layers = e.layers;
         
         var nc=circle.length;
         var np=polygon.length;
         var nb=box.length;
         
         
         
         
         layers.eachLayer(function (layer) {
         	var ic=0;
         	var ip=0;
         	var ib=0;
         	
          	while ( ic<nc ) {
          		if( layer._leaflet_id == circle[ic].properties.id ) {
       
          				circle[ic].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				circle[ic].geometry=tempjson.geometry;

          		}
          		ic++;
          	} 
          	
          	while ( ib<nb ) {
          		if( layer._leaflet_id == box[ib].properties.id ) {

          				box[ib].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				box[ib].geometry=tempjson.geometry;

          		}
          		ib++;
          	} 
          	
          	while ( ip<np ) {
          		if( layer._leaflet_id == polygon[ip].properties.id ) {

          				polygon[ip].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				polygon[ip].geometry=tempjson.geometry;

          		}
          		ip++;
          	} 
          	
          	

         });
     });
     
     

map.on('draw:deleted', function(e) {

		var type = e.layerType;
         var layers = e.layers;

         var nc=circle.length;
         var np=polygon.length;
         var nb=box.length;

		layers.eachLayer(function (layer) {
			var ic=0;
         	var ip=0;
         	var ib=0;
         	

			while(ic<nc) {	

				if( layer._leaflet_id == circle[ic].properties.id ) {

				circle.splice(ic,1);
				nc=circle.length;
				}
				else { ic++; }
			}
			
			while(ib<nb) {	

				if( layer._leaflet_id == box[ib].properties.id ) {

				box.splice(ib,1);
				nb=box.length;
				}
				else { ib++; }
			}
			
			while(ip<np) {	

				if( layer._leaflet_id == polygon[ip].properties.id ) {

				polygon.splice(ip,1);
				np=polygon.length;
				}
				else { ip++; }
			}
			
		
		});

});