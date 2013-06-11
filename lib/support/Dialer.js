define(function() {
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

		oscillators.forEach(function(oscillator, i) {
			var tone = twoTone[i];
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(tone, time);
			oscillator.connect(out);
			oscillator.start(0);
		});
		setTimeout(stopTones, defaults.duration);
	}

	function stopTones() {
		oscillators.forEach(function(oscillator, i) {
			oscillator.disconnect();
		});
		if (queue.length) {
			setTimeout(startTones, defaults.pause);
		}
	}

	ToneDialer.prototype.dial = function(telNumber) {
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
