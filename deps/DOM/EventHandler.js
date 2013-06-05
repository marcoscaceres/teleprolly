/*
[TreatNonCallableAsNull]
callback EventHandlerNonNull = any (Event event);
typedef EventHandlerNonNull? EventHandler;
*/

define(["WebIDL"], function(){
	var WebIDL = require("WebIDL"); 

	function EventHandler(){}

	EventHandler.prototype.implement = function (object,attr,eventType) {
		var isReadonly = false,
			isStatic = false,
			eventHandler = null,
			//removed "on" from attribute
			eventType = eventType || attr.substr(2,attr.length),
			setter = function (aFunction) {
	            //clear prevously set event handler
	            if (eventHandler !== null) {
	                object.removeEventListener(eventType, eventHandler, false);
	                eventHandler = null;
	            }

	            //check if callable
	            if (aFunction.call && typeof aFunction.call === 'function') {
	                object.addEventListener(eventType, aFunction, false);
	                eventHandler = aFunction;
	            }  
	            return eventHandler;
	        },
	        getter = function () {
            	return eventHandler;
        	};
		WebIDL.implementAttr(object, attr, isReadonly, isStatic, getter, setter, {});
		return object;
	}
	return new EventHandler();
}); 