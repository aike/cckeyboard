var Cckb = function() {
	this.cc = new CoffeeCollider();
	this.modified = true;
}

Cckb.prototype.eval = function(body) {
	body = body.replace(/^	/mg, "		");
	body = body.replace(/^ /mg, "  ");
	body = body.replace(/^#.*\n/mg, "");
	body = body.replace(/^\n/mg, "");
console.log('[' + body + ']');
	var code = "";
	code += "synth = new Array(8)\n";
	code += "for i in [0..7]\n";
	code += "	synth[i] = " + body;
	code += "	.play()\n";
	code += "	synth[i].set freq:440, gate:0\n";
	code += "\n";
	code += 'Message.on "cckb", ({osc, midi, gate})->\n';
	code += "	synth[osc].set freq:midi.midicps(), gate:gate\n";
	this.cc.execute(code).play();
}

Cckb.prototype.send = function(type, arg) {
	this.cc.send(type, arg);
}

var cckb = new Cckb();


