/*
 * teleprolly
 * https://github.com/marcoscaceres/teleprolly
 *
 * Copyright (c) 2013 Marcos Caceres
 * Licensed under the MIT license.
 */

require.config({
	paths: {
		"deps": "/deps",
		"DOM": "/deps/DOM",
		"WebIDL/types": "/webidl/lib/types",
		"WebIDL": "/webidl/lib/interfaces/WebIDL",
		"deps/webidlParser": "/webidl/deps/webidlParser",
		"WebIDL": "/webidl/lib/interfaces/WebIDL",

		//create alias to plugins (not needed if plugins are on the baseUrl)
        async: '/deps/require-plugins/async',
        goog: '/deps/require-plugins/goog',
        json: '/deps/require-plugins/json',
        noext: '/deps/require-plugins/noext',
        propertyParser : '/deps/sync/propertyParser'
	}
});

// convert Futures into an AMD module
define('Futures', ['DOM/Futures'],
function(){
    // return the gmaps namespace for brevity
    return window.Future;
});


// convert Google Maps into an AMD module
/*define('Geocoder', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
function(){
    // return the gmaps namespace for brevity
    return new window.google.maps.Geocoder();
});
*/

require(["interfaces/Navigator"]);