$(function() {
	$("#key")
	.change(function(e) {
		if (e.originalEvent.note[0] === 1)
			synth.noteOn(e.originalEvent.note[1], 100);
		else
			synth.noteOff(e.originalEvent.note[1]);
	});

	////////////////////////

	var code = "";

	code += "SynthDef (freq, gate)->\n";
	code += "	vco = Saw.ar(freq)\n";
	code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
	code += "	Out.ar(0, [vco,vco] * vca)\n";
	$("#source")
	.keyup(function() {
		cckb.modified = true;
	})
	.val(code);

	$("#source")[0].addEventListener("keydown", function(e) {
		if (e.keyCode === 9) {
			e.preventDefault();
			var elem = e.target;
			var val = elem.value;
			var pos = elem.selectionStart;
			elem.value = val.substr(0, pos) + '\t' + val.substr(pos, val.length);
			elem.setSelectionRange(pos + 1, pos + 1);
		}
	});

	setTimeout(function() {
		cckb.eval(code);
	}, 3000);

	////////////////////////
	var elem_id;

	elem_id = "#mvol";
	synth.controls.push(elem_id);
	$(elem_id)
	.attr({
		value: 50,
		defvalue: 50
	})
	.change(function(e) {
		synth.setParam(synth.param.MasterVolume, e.target.value);
	});


	////////////////////////

	var code = "";
	code += "SynthDef (freq, gate)->\n";
	code += "	vco = Saw.ar(freq)\n";
	code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
	code += "	Out.ar(0, vco.dup() * vca)\n";
	$("#source")
	.keyup(function() {
		cckb.modified = true;
	})
	.val(code);

	$("#ex1").click(function() {
		var code = "";
		code += "SynthDef (freq, gate)->\n";
		code += "	vco = SinOsc.ar(freq)\n";
		code += "	vca = gate * 0.5\n";
		code += "	Out.ar(0, vco.dup() * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex2").click(function() {
		var code = "";
		code += "SynthDef (freq, gate)->\n";
		code += "	vco = Pulse.ar(freq / 2) + Pulse.ar(freq * 2.03)\n";
		code += "	vca = gate * 0.4\n";
		code += "	Out.ar(0, vco.dup() * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex3").click(function() {
		var code = "";
		code += "SynthDef (freq, gate)->\n";
		code += "	vco = Saw.ar(freq) + Saw.ar(freq * 0.99) + Saw.ar(freq * 1.01)\n";
		code += "	vca = EnvGen.kr(Env.adsr(), gate) * 0.5\n";
		code += "	Out.ar(0, vco.dup() * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex4").click(function() {
		var code = "";
		code += "SynthDef (freq=440, gate=0)->\n";
		code += "	sa= (freq * 77.7) % 1.0\n";
		code += "	ri= (freq * 171.1) % 1.0\n";
		code += "	ga= (freq * 33.3) % 1.0\n";
		code += "	ma= (freq * 321.2) % 1.0\n";
		code += "	pa= (freq * 893.9) % 1.0\n";
		code += "	da= (freq * 551.7) % 1.0\n";
		code += "	ni= (freq * 272.9) % 1.0\n";
		code += "	nz = PinkNoise.ar(0.2)\n";
		code += "	nzl = Mix Array.fill 10, (i)->\n";
		code += "		Resonz.ar(nz, i * (freq + da * 777) + 321, 0.05)\n";
		code += "	nzr = Mix Array.fill 10, (i)->\n";
		code += "		Resonz.ar(nz, i * (freq + ni * 777) + 321, 0.05)\n";
		code += "	chl = (SinOsc.ar(freq) + SinOsc.ar(LFNoise0.kr(1, freq * ri, freq * ma)) + nzl) * 0.3\n";
		code += "	chr = (SinOsc.ar(freq) + SinOsc.ar(LFNoise0.kr(1, freq * ga, freq * pa)) + nzr) * 0.3\n";
		code += "	vcfl = RLPF.ar(chl, freq * 8, EnvGen.kr(Env([1, 1, 0.1], [0, 0.5], -2), gate))\n";
		code += "	vcfr = RLPF.ar(chr, freq * 8, EnvGen.kr(Env([1, 1, 0.1], [0, 0.5], -2), gate))\n";
		code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
		code += "	Out.ar(0, [vcfl, vcfr] * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex5").click(function() {
		var code = "";
		code += "SynthDef (freq=440, gate=0)->\n";
		code += "	sa= (freq * 77.7) % 1.0\n";
		code += "	ri= (freq * 171.1) % 1.0\n";
		code += "	ga= (freq * 33.3) % 1.0\n";
		code += "	ma= (freq * 321.2) % 1.0\n";
		code += "	pa= (freq * 893.9) % 1.0\n";
		code += "	da= (freq * 551.7) % 1.0\n";
		code += "	ni= (freq * 272.9) % 1.0\n";
		code += "	nz = PinkNoise.ar(0.2)\n";
		code += "	nzl = Mix Array.fill 10, (i)->\n";
		code += "		Resonz.ar(nz, i * (freq + da * 777) + 321, 0.05)\n";
		code += "	nzr = Mix Array.fill 10, (i)->\n";
		code += "		Resonz.ar(nz, i * (freq + ni * 777) + 321, 0.05)\n";
		code += "	chl = (SinOsc.ar(freq) + SinOsc.ar(LFNoise0.kr(1, freq * ri, freq * ma)) + nzl) * 0.3\n";
		code += "	chr = (SinOsc.ar(freq) + SinOsc.ar(LFNoise0.kr(1, freq * ga, freq * pa)) + nzr) * 0.3\n";
		code += "	vcfl = RLPF.ar(chl, freq * 8, Linen.kr(gate:1, attackTime:sa, susLevel:ri, releaseTime:ga, doneAction:2), gate)\n";
		code += "	vcfr = RLPF.ar(chr, freq * 8, Linen.kr(gate:1, attackTime:sa, susLevel:ma, releaseTime:pa, doneAction:2), gate)\n";
		code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
		code += "	Out.ar(0, [vcfl, vcfr] * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex6").click(function() {
		var code = "";
		code += "SynthDef (freq=440, gate=0)->\n";
		code += "	sa= (freq * 77.7) % 1.0\n";
		code += "	ri= (freq * 171.1) % 1.0\n";
		code += "	ga= (freq * 33.3) % 1.0\n";
		code += "	ma= (freq * 321.2) % 1.0\n";
		code += "	pa= (freq * 893.9) % 1.0\n";
		code += "	da= (freq * 551.7) % 1.0\n";
		code += "	ni= (freq * 272.9) % 1.0\n";
		code += "	freq2 = MouseY.kr(100, 1000, 'exponential')\n";
		code += "	freql = freq2 * MouseX.kr(2, 0.5, lag:2.5)\n";
		code += "	freqr = freq2 * MouseX.kr(0.5, 2, lag:2.5)\n";
		code += "	feedback = MouseButton.kr(0, 1.pi(), lag:5)\n";
		code += "	chl = (SinOsc.ar(freq) + SinOscFB.ar(freql, feedback, mul:0.25)) * 0.3\n";
		code += "	chr = (SinOsc.ar(freq) + SinOscFB.ar(freqr, feedback, mul:0.25)) * 0.3\n";
		code += "	vcfl = RLPF.ar(chl, freq2 * 8, Linen.kr(gate:1, attackTime:sa, susLevel:ri, releaseTime:ga, doneAction:2), gate)\n";
		code += "	vcfr = RLPF.ar(chr, freq2 * 8, Linen.kr(gate:1, attackTime:sa, susLevel:ma, releaseTime:pa, doneAction:2), gate)\n";
		code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
		code += "	Out.ar(0, [vcfl, vcfr] * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

	$("#ex7").click(function() {
		var code = "";
		code += "SynthDef (freq=440, gate=0)->\n";
		code += "	chords  =   [\n";
		code += "		[1.0, 1.2599210498948732, 1.3830875542684884, 1.4422495703074083],\n";
		code += "		[1.0, 1.2009369551760027, 1.3480061545972777, 1.4422495703074083],\n";
		code += "		[1.0, 1.122462048309373, 1.3830875542684884, 1.4913014754131089]\n";
		code += "	]\n";
		code += "	sa= (freq * 77.7) % 1.0\n";
		code += "	if ( sa < 0.33)\n";
		code += "		wch = 0\n";
		code += "	else if ( sa < 0.66)\n";
		code += "		wch = 1\n";
		code += "	else\n";
		code += "		wch = 2\n";
		code += "	chl = (SinOsc.ar(freq * chords[wch][0]) + SinOsc.ar(freq * chords[wch][2])) * 0.3\n";
		code += "	chr = (SinOsc.ar(freq * chords[wch][1]) + SinOsc.ar(freq * chords[wch][3])) * 0.3\n";
		code += "	vcfl = RLPF.ar(chl, freq * 8, EnvGen.kr(Env([1, 1, 0.1], [0, 0.5], -2), gate))\n";
		code += "	vcfr = RLPF.ar(chr, freq * 8, EnvGen.kr(Env([1, 1, 0.1], [0, 0.5], -2), gate))\n";
		code += "	vca = EnvGen.kr(Env.adsr(), gate)\n";
		code += "	Out.ar(0, [vcfl, vcfr] * vca)\n";
		$("#source").val(code);
		cckb.eval(code);
	});

});
