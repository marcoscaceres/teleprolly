/**
interface TelephonyManager : EventTarget {
    readonly    attribute CallHandler?  activeCall;
    readonly    attribute CallHandler[] calls;
    readonly    attribute DOMString[]   serviceIds;
                attribute DOMString     defaultServiceId;
    readonly    attribute DOMString[]   emergencyNumbers;

    TelephonyCall dial (DOMString remoteParty, optional DialParams params);

  
    void          sendTones (DOMString tones, optional ToneParams params);
    void          startTone (byte tone, optional ToneParams params);
    void          stopTone (optional DOMString serviceId);

                attribute EventHandler  onincoming;
                attribute EventHandler  oncallschanged;
                attribute EventHandler  onserviceadded;
                attribute EventHandler  onserviceremoved;
};
**/
define(["Futures","support/EmergencyNumbers", "support/Dialer", "DOM/EventTarget","DOM/EventHandler","WebIDL/types/Byte", "WebIDL/types/DOMString", "WebIDL/types/Boolean"],
    function(Future, emergencyNumbers, Dialer) {
    'use strict';
    var EventTarget = require("DOM/EventTarget"),
        EventHandler = require("DOM/EventHandler"),
        IDLDate = require("WebIDL/types/DOMString"),
        IDLByte = require("WebIDL/types/Byte"),
        IDLBoolean = require("WebIDL/types/Boolean"),
        WebIDL = require("WebIDL"),
        knownEmergencyNumbers = emergencyNumbers.UNIVERSAL_NUMBERS,
        goecoder,
        telManager,
        watchId = 0;

    //monitor location, update emergency number if needed
    navigator.geolocation.getCurrentPosition(getPosition);
    
    //remove me
    window.Dialer = Dialer;

    function getPosition(data){
        watchId = navigator.geolocation.watchPosition(positionChange);
        positionChange(data);
    }

    function positionChange(data){
        var latlng = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        reverseGeocode(latlng);
    }

    function findCountry(results){
        var countries = []; 
        for (var result, i = results.length - 1; i >= 0; i--) {
            result = results[i]; 
            for (var addressComp, j = result.address_components.length - 1; j >= 0; j--) {
                addressComp = result.address_components[j];
                for (var type, h = addressComp.types.length - 1; h >= 0; h--) {
                    type = addressComp.types[h]
                    if(type  === "country"){
                        return result.address_components[0].short_name;
                    }
                }
            }
        }
    }

    function reverseGeocode(latlng){
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          var country,
              emergencyNumber; 
          if (status == google.maps.GeocoderStatus.OK) {
            country = findCountry(results);
            if(country){
                emergencyNumber = emergencyNumbers.findByCountry(country);
                for (var i = knownEmergencyNumbers.length - 1; i >= 0; i--) {
                    if(knownEmergencyNumbers[i] === emergencyNumber){
                        return;
                    }
                }
                knownEmergencyNumbers.splice(0,0,emergencyNumber);
            }
          } else {
            alert("Geocoder failed due to: " + status);
          }
        });
    }

    function TelephonyManager() {
        EventTarget.call(this);
    }
    TelephonyManager.prototype = new EventTarget();

    function getEmergencyNumbers(){
        return knownEmergencyNumbers; 
    }

    WebIDL.implementAttr(TelephonyManager.prototype, "emergencyNumbers", true, false, getEmergencyNumbers, undefined, {});

    function dial(digits){
        Dialer.dial(digits);
    }

    WebIDL.implementOperation(TelephonyManager.prototype, "dial", dial);


    function sendTones(){}

    function startTone(){}

    function stopTone(){}

    WebIDL.exportInterface(TelephonyManager, "TelephonyManager");

    telManager = new TelephonyManager();

    EventHandler.implement(telManager, "onincoming");
    EventHandler.implement(telManager, "oncallschanged");
    EventHandler.implement(telManager, "onserviceadded");
    EventHandler.implement(telManager, "onserviceremoved");


    return telManager; 

});