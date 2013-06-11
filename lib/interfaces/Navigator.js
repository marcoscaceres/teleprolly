/**
partial interface Navigator {
    readonly    attribute TelephonyManager telephony;
};
*/

define(['WebIDL', 'interfaces/TelephonyManager'], function() {
	'use strict';
	var	WebIDL = require('WebIDL'),
		telManager = require('interfaces/TelephonyManager'),
		attGetter = function() {
			return telManager;
		},
		isReadonly = true,
		isStatic = false,
		extendedAttrs = {};
	//prollyfilla!
	if ('navigator' in window && !('telephony' in navigator)) {
		WebIDL.implementAttr(window.navigator, 'telephony', isReadonly, isStatic, attGetter, undefined, extendedAttrs);
	}
});
