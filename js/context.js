var gContext;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
try {
	gContext = new AudioContext() ;
} catch(e) {
	alert('Web Audio API is not supported in this browser');
	gContext = null;
}
