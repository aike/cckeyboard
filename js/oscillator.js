var code;
var Oscillator = function(ctx, id) {
	this.id = id;
	this.ctx = ctx;
	this.next_node = null;
	this.noteNoToFrequency = function(noteno) {
		return 440.0 * Math.pow(2.0, (noteno - 69.0) / 12.0); 
	}
	this.note = null;
}

Oscillator.prototype.connect = function(node) {
	this.next_node = node;
}

Oscillator.prototype.noteOn = function(note, velocity) {
	if (cckb.modified) {
		cckb.eval($("#source").val());
		cckb.modified = false;
	}
	cckb.send("cckb", {osc:this.id, midi:note, gate:1});
	this.note = note;
}

Oscillator.prototype.changeNote = function(note) {
	cckb.send("cckb", {osc:this.id, midi:note, gate:1});
}

Oscillator.prototype.noteOff = function() {
	cckb.send("cckb", {osc:this.id, midi:this.note, gate:0});
}

Oscillator.prototype.setParam = function(param_id, val) {
}
