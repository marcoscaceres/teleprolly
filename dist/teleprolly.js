/*! teleprolly - v0.1.0 - 2013-06-11
* https://github.com/marcoscaceres/teleprolly
* Copyright (c) 2013 Marcos Caceres; Licensed MIT */
(function(){
    "use strict";
    require.config({
        paths: {
            'deps': '../deps',
            'DOM': '../deps/DOM',
            'WebIDL': '../webidl/lib/WebIDL',
            'deps/webidlParser': '../webidl/deps/webidlParser',
            'DOM/Futures' : '../deps/DOM/Futures',
            'DOM/EventHandler': '../deps/DOM/EventHandler',
            'DOM/EventTarget' : '../deps/DOM/EventTarget',

            //create alias to plugins (not needed if plugins are on the baseUrl)
            async: '../deps/require-plugins/async',
            goog: '../deps/require-plugins/goog',
            json: '../deps/require-plugins/json',
            noext: '../deps/require-plugins/noext',
            propertyParser: '../deps/sync/propertyParser'
        }
    });

    // convert Futures into an AMD module
    define('Futures', ['DOM/Futures'],
    function() {
        // return the gmaps namespace for brevity
        return window.Future;
    });


    // convert Google Maps into an AMD module
    define('Geocoder', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
    function() {
        // return the gmaps namespace for brevity
        return new window.google.maps.Geocoder();
    });

    require(['interfaces/Navigator']);
}());

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

define(['Futures', 'support/EmergencyNumbers', 'support/Dialer', 'DOM/EventTarget', 'DOM/EventHandler', 'WebIDL/types/Byte', 'WebIDL/types/DOMString', 'WebIDL/types/Boolean', 'Geocoder'],
function(Future, emergencyNumbers, Dialer) {
    'use strict';
    var EventTarget = require('DOM/EventTarget'),
        EventHandler = require('DOM/EventHandler'),
        //IDLDate = require('WebIDL/types/DOMString'),
        //IDLByte = require('WebIDL/types/Byte'),
        //IDLBoolean = require('WebIDL/types/Boolean'),
        WebIDL = require('WebIDL'),
        geocoder = require('Geocoder'),
        knownEmergencyNumbers = emergencyNumbers.UNIVERSAL_NUMBERS,
        telManager,
        watchId = 0;

    function getPosition(data) {
        watchId = navigator.geolocation.watchPosition(positionChange);
        positionChange(data);
    }

    function positionChange(data) {
        var latlng = new window.google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        reverseGeocode(latlng);
    }

    function findCountry(results) {
        for (var result, i = results.length - 1; i >= 0; i--) {
            result = results[i];
            for (var addressComp, j = result.address_components.length - 1; j >= 0; j--) {
                addressComp = result.address_components[j];
                for (var type, h = addressComp.types.length - 1; h >= 0; h--) {
                    type = addressComp.types[h];
                    if (type === 'country') {
                        return result.address_components[0].short_name;
                    }
                }
            }
        }
    }

    function reverseGeocode(latlng) {
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          var country,
              emergencyNumber;
          if (status === window.google.maps.GeocoderStatus.OK) {
            country = findCountry(results);
            if (country) {
                emergencyNumber = emergencyNumbers.findByCountry(country);
                for (var i = knownEmergencyNumbers.length - 1; i >= 0; i--) {
                    if (knownEmergencyNumbers[i] === emergencyNumber) {
                        return;
                    }
                }
                knownEmergencyNumbers.splice(0, 0, emergencyNumber);
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
    }

    function TelephonyManager() {
        EventTarget.call(this);
    }
    TelephonyManager.prototype = new EventTarget();

    function getEmergencyNumbers() {
        return knownEmergencyNumbers;
    }

    WebIDL.implementAttr(TelephonyManager.prototype, 'emergencyNumbers', true, false, getEmergencyNumbers, undefined, {});

    function dial(digits) {
        Dialer.dial(digits);
    }

    WebIDL.implementOperation(TelephonyManager.prototype, 'dial', dial);


    //function sendTones() {}

    //function startTone() {}

    //function stopTone() {}

    WebIDL.exportInterface(TelephonyManager, 'TelephonyManager');

    telManager = new TelephonyManager();

    EventHandler.implement(telManager, 'onincoming');
    EventHandler.implement(telManager, 'oncallschanged');
    EventHandler.implement(telManager, 'onserviceadded');
    EventHandler.implement(telManager, 'onserviceremoved');

    //monitor location, update emergency number if needed
    navigator.geolocation.getCurrentPosition(getPosition);

    //remove me
    window.Dialer = Dialer;

    return telManager;

});

define(function () {
	'use strict';
    var context = ('webkitAudioContext' in window) ? new webkitAudioContext() : null,
        oscillators = (context) ? [context.createOscillator(), context.createOscillator()] : [],
        out = (context) ? context.destination : null,
        queue = [],
        phoneTones = {
            '1': [1209, 697],
            '2': [1336, 697],
            '3': [1477, 697],
            'A': [1633, 697],
            '4': [1209, 770],
            '5': [1336, 770],
            '6': [1477, 770],
            'B': [1633, 770],
            '7': [1209, 852],
            '8': [1336, 852],
            '9': [1477, 852],
            'C': [1633, 852],
            '*': [1209, 941],
            '0': [1336, 941],
            '#': [1477, 941],
            'D': [1633, 941],
            'T': [350, 440]
        },
        defaults = {
            pause: '120',
            duration: '500'
        };


    function ToneDialer() {}

    function startTones() {
        var twoTone = phoneTones[queue.shift()],
            time = context.currentTime;

        if (!twoTone) {
            return;
        }

        oscillators.forEach(function (oscillator, i) {
            var tone = twoTone[i];
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(tone, time);
            oscillator.connect(out);
            oscillator.start(0);
        });
        setTimeout(stopTones, defaults.duration);
    }

    function stopTones() {
        oscillators.forEach(function (oscillator) {
            oscillator.disconnect();
        });
        if (queue.length) {
            setTimeout(startTones, defaults.pause);
        }
    }

    ToneDialer.prototype.dial = function (telNumber) {
        if (typeof telNumber === 'string') {
            telNumber = telNumber.split('');
        }
        if (Array.isArray(telNumber)) {
            for (var i = 0, l = telNumber.length, tones; i < l; i++) {
                tones = telNumber[i];
                if (!tones) {
                    throw new TypeError('invalid number');
                }
                queue.push(tones);
            }
            if (queue.length) {
                startTones();
            }
            return;
        }
        throw new TypeError();
    };
    return new ToneDialer();
});
define(function() {
	'use strict';
	var UniversalNumbers = ['112', '911', '118', '119', '000', '110', '08', '999'],
		countries = {
			'AF': '???',
			'AL': '???',
			'DZ': '???',
			'AS': '???',
			'AD': '???',
			'AO': '???',
			'AI': '???',
			'AQ': '???',
			'AG': '???',
			'AR': '???',
			'AM': '???',
			'AW': '???',
			'AU': '???',
			'AT': '???',
			'AZ': '???',
			'BS': '???',
			'BH': '???',
			'BD': '???',
			'BB': '???',
			'BY': '???',
			'BE': '???',
			'BZ': '???',
			'BJ': '???',
			'BM': '???',
			'BT': '???',
			'BO': '???',
			'BA': '???',
			'BW': '???',
			'BV': '???',
			'BR': '???',
			'IO': '???',
			'VG': '???',
			'BN': '???',
			'BG': '???',
			'BF': '???',
			'BI': '???',
			'KH': '???',
			'CM': '???',
			'CA': '???',
			'CV': '???',
			'KY': '???',
			'CF': '???',
			'TD': '???',
			'CL': '???',
			'CN': '???',
			'CX': '???',
			'CC': '???',
			'CO': '???',
			'KM': '???',
			'CD': '???',
			'CG': '???',
			'CK': '???',
			'CR': '???',
			'CI': '???',
			'CU': '???',
			'CY': '???',
			'CZ': '???',
			'DK': '???',
			'DJ': '???',
			'DM': '???',
			'DO': '???',
			'EC': '???',
			'EG': '???',
			'SV': '???',
			'GQ': '???',
			'ER': '???',
			'EE': '???',
			'ET': '???',
			'FO': '???',
			'FK': '???',
			'FJ': '???',
			'FI': '???',
			'FR': '???',
			'GF': '???',
			'PF': '???',
			'TF': '???',
			'GA': '???',
			'GM': '???',
			'GE': '???',
			'DE': '???',
			'GH': '???',
			'GI': '???',
			'GR': '???',
			'GL': '???',
			'GD': '???',
			'GP': '???',
			'GU': '???',
			'GT': '???',
			'GN': '???',
			'GW': '???',
			'GY': '???',
			'HT': '???',
			'HM': '???',
			'VA': '???',
			'HN': '???',
			'HK': '???',
			'HR': '???',
			'HU': '???',
			'IS': '???',
			'IN': '???',
			'ID': '???',
			'IR': '???',
			'IQ': '???',
			'IE': '???',
			'IL': '???',
			'IT': '???',
			'JM': '???',
			'JP': '???',
			'JO': '???',
			'KZ': '???',
			'KE': '???',
			'KI': '???',
			'KP': '???',
			'KR': '???',
			'KW': '???',
			'KG': '???',
			'LA': '???',
			'LV': '???',
			'LB': '???',
			'LS': '???',
			'LR': '???',
			'LY': '???',
			'LI': '???',
			'LT': '???',
			'LU': '???',
			'MO': '???',
			'MK': '???',
			'MG': '???',
			'MW': '???',
			'MY': '???',
			'MV': '???',
			'ML': '???',
			'MT': '???',
			'MH': '???',
			'MQ': '???',
			'MR': '???',
			'MU': '???',
			'YT': '???',
			'MX': '???',
			'FM': '???',
			'MD': '???',
			'MC': '???',
			'MN': '???',
			'MS': '???',
			'MA': '???',
			'MZ': '???',
			'MM': '???',
			'NA': '???',
			'NR': '???',
			'NP': '???',
			'AN': '???',
			'NL': '???',
			'NC': '???',
			'NZ': '???',
			'NI': '???',
			'NE': '???',
			'NG': '???',
			'NU': '???',
			'NF': '???',
			'MP': '???',
			'NO': '???',
			'OM': '???',
			'PK': '???',
			'PW': '???',
			'PS': '???',
			'PA': '???',
			'PG': '???',
			'PY': '???',
			'PE': '???',
			'PH': '???',
			'PN': '???',
			'PL': '???',
			'PT': '112',
			'PR': '???',
			'QA': '???',
			'RE': '???',
			'RO': '???',
			'RU': '???',
			'RW': '???',
			'SH': '???',
			'KN': '???',
			'LC': '???',
			'PM': '???',
			'VC': '???',
			'WS': '???',
			'SM': '???',
			'ST': '???',
			'SA': '???',
			'SN': '???',
			'CS': '???',
			'SC': '???',
			'SL': '???',
			'SG': '???',
			'SK': '???',
			'SI': '???',
			'SB': '???',
			'SO': '???',
			'ZA': '???',
			'GS': '???',
			'ES': '???',
			'LK': '???',
			'SD': '???',
			'SR': '???',
			'SJ': '???',
			'SZ': '???',
			'SE': '???',
			'CH': '???',
			'SY': '???',
			'TW': '???',
			'TJ': '???',
			'TZ': '???',
			'TH': '???',
			'TL': '???',
			'TG': '???',
			'TK': '???',
			'TO': '???',
			'TT': '???',
			'TN': '???',
			'TR': '???',
			'TM': '???',
			'TC': '???',
			'TV': '???',
			'VI': '???',
			'UG': '???',
			'UA': '???',
			'AE': '???',
			'GB': '???',
			'UM': '???',
			'US': '???',
			'UY': '???',
			'UZ': '???',
			'VU': '???',
			'VE': '???',
			'VN': '???',
			'WF': '???',
			'EH': '???',
			'YE': '???',
			'ZM': '???',
			'ZW': '???'
		};

	function EmergencyNumbers() {

	}

	function findByCountryCode(code) {
		return countries[code] || null;
	}

	EmergencyNumbers.prototype.findByCountry = findByCountryCode;

	Object.defineProperty(EmergencyNumbers.prototype, 'UNIVERSAL_NUMBERS', {
		get: function() {
			return UniversalNumbers;
		}
	});

	return new EmergencyNumbers();
});
