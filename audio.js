
// Audio buffer

// // Create Annonomuos Self Executing Function
// (function(){
// 	var context = new AudioContext() // Create and Initialize the Audio Context
// 	var electro; // Create the Sound
// 	var getSound = new XMLHttpRequest() // Load the Sound with XMLHttpRequest
// 	getSound.open("GET", "/swarmandal.wav", true); // Path to Audio File
// 	getSound.responseType = "arraybuffer" // Read as Binary Data
// 	getSound.onload = function() {
// 		context.decodeAudioData(getSound.response, function(buffer){
// 			electro = buffer; // Decode the Audio Data and Store it in a Variable
// 		})
// 	}
// 	getSound.send(); // Send the Request and Load the File
//
// 	window.addEventListener("keydown",onKeyDown) // Create Event Listener for KeyDown
//
// 	function onKeyDown(e){
// 		switch (e.keyCode) {
// 			// X
// 			case 88:
// 				var playSound = context.createBufferSource() // Declare a New Sound
// 				playSound.buffer = electro // Attatch our Audio Data as it's Buffer
// 				playSound.connect(context.destination)  // Link the Sound to the Output
// 				playSound.start(0) // Play the Sound Immediately
// 			break;
// 		}
//  	}
// }())


   var ctx = new (window.AudioContext || window.webkitAudioContext)()
   var audioElement = document.getElementById("audio")
   var audioSource = ctx.createMediaElementSource(audioElement)
   var filter = ctx.createBiquadFilter()
   filter.type = "lowpass"
   filter.frequency.value = 100

   var slider = document.getElementById("slider")
   var freqDisplay = document.getElementById("freq-display")

   var analyser = ctx.createAnalyser()
    var processor = ctx.createScriptProcessor(1024, 1, 1)

   if (slider.addEventListener) {
     slider.addEventListener("change", onChange)
   } else {
     slider.attachEvent("onchange", onChange);
   }

   function onChange () {
 // Update the filter node's frequency value with the slider value
      filter.frequency.value = slider.value
     freqDisplay.innerHTML = slider.value
   }

   // Make the Uint8Array have the same size as the analyser's bin count 
    var data = new Uint8Array(analyser.frequencyBinCount)
    processor.onaudioprocess = onProcess

    var canvas = document.getElementById('canvas')
    var canvasCtx = canvas.getContext('2d')

    function onProcess () {
      analyser.getByteFrequencyData(data)
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      for (var i = 0, l = data.length; i < l; i++) {
         canvasCtx.fillRect(i, 0 * data[i], 1, data[i])
      }
    }

   audioSource.connect(filter)
   filter.connect(analyser)
   analyser.connect(processor)
   filter.connect(ctx.destination)
   processor.connect(ctx.destination)

















// Creating sine wave
//
// creates audio sandbox
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//
// // create Oscillator node
// var oscillator = audioCtx.createOscillator();
// oscillator.type = 'sine';
// oscillator.frequency.value = 400; // value in hertz
// var initialVol = 0.1;
//
// var gainNode = audioCtx.createGain();
//
// var modulator = audioCtx.createOscillator()
// modulator.frequency.value = 100;
//
//
// gainNode.gain.value = initialVol;
// oscillator.connect(gainNode);
//
// gainNode.connect(audioCtx.destination);
//
// oscillator.start(0);
//
// modulator.connect(gainNode.gain)
// modulator.start(0)
//
//
// modulator.connect(oscillator.frequency)
// modulator.start(0)
