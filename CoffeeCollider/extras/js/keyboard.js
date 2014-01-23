// Generated by CoffeeScript 1.6.3
(function() {
  var Keyboard;

  window.Keyboard = Keyboard = (function() {
    var build;

    function Keyboard(elem) {
      var currentKey, isMouseDown,
        _this = this;
      this.elem = elem;
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.canvas.width = this.width = 218;
      this.canvas.height = this.height = 79;
      this.keys = build(this.context, this.width, this.height);
      this._callback = {};
      isMouseDown = false;
      currentKey = null;
      $(this.canvas).css({
        width: this.width,
        height: this.height
      }).appendTo(this.elem);
      $(this.canvas).on('mousedown', function(e) {
        var key, _base;
        isMouseDown = true;
        key = _this._findKey(e);
        if (key) {
          if (typeof (_base = _this._callback)['key'] === "function") {
            _base['key']({
              midi: key.midi,
              gate: 1
            });
          }
          currentKey = key;
        }
        return false;
      });
      $(this.canvas).on('mousemove', function(e) {
        var key, _base, _base1;
        if (isMouseDown && currentKey) {
          key = _this._findKey(e);
          if (key && currentKey !== key) {
            if (typeof (_base = _this._callback)['key'] === "function") {
              _base['key']({
                midi: currentKey.midi,
                gate: 0
              });
            }
            if (typeof (_base1 = _this._callback)['key'] === "function") {
              _base1['key']({
                midi: key.midi,
                gate: 1
              });
            }
            currentKey = key;
          }
        }
        return false;
      });
      $(this.canvas).on('mouseup', function(e) {
        var _base;
        if (currentKey) {
          if (typeof (_base = _this._callback)['key'] === "function") {
            _base['key']({
              midi: currentKey.midi,
              gate: 0
            });
          }
        }
        isMouseDown = false;
        return false;
      });
      $(this.canvas).on('mouseout', function(e) {
        var _base;
        if (currentKey) {
          if (typeof (_base = _this._callback)['key'] === "function") {
            _base['key']({
              midi: currentKey.midi,
              gate: 0
            });
          }
        }
        isMouseDown = false;
        return false;
      });
    }

    Keyboard.prototype._findKey = function(e) {
      var i, offset, pos, _i, _ref, _ref1, _ref2;
      offset = $(this.canvas).offset();
      pos = {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
      };
      for (i = _i = 0, _ref = this.keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if ((this.keys[i].x1 <= (_ref1 = pos.x) && _ref1 < this.keys[i].x2) && (this.keys[i].y1 <= (_ref2 = pos.y) && _ref2 < this.keys[i].y2)) {
          return this.keys[i];
        }
      }
    };

    Keyboard.prototype.on = function(event, callback) {
      return this._callback[event] = callback;
    };

    Keyboard.prototype.show = function(time) {
      return this.elem.show(time);
    };

    Keyboard.prototype.hide = function(time) {
      return this.elem.hide(time);
    };

    build = function(context, width, height) {
      var b_keyWidth, b_keys, h, i, keys, midi, w, w_keyCount, w_keyWidth, w_keys, x, y, _i;
      w_keyCount = 14;
      w_keyWidth = width / 14;
      b_keyWidth = w_keyWidth * 0.75;
      w_keys = [];
      b_keys = [];
      midi = 60;
      for (i = _i = 0; 0 <= w_keyCount ? _i < w_keyCount : _i > w_keyCount; i = 0 <= w_keyCount ? ++_i : --_i) {
        w = w_keyWidth;
        h = height - 1;
        x = i * w;
        y = 0;
        w_keys.push({
          x1: x,
          x2: x + w,
          w: w,
          y1: 0,
          y2: y + h,
          h: h,
          midi: midi++
        });
        if ([0, 1, 3, 4, 5].indexOf(i % 7) !== -1) {
          w = b_keyWidth;
          h = height * 0.6;
          x = (x + w_keyWidth) - (w * 0.5);
          y = 0;
          b_keys.push({
            x1: x,
            x2: x + w,
            w: w,
            y1: 0,
            y2: y + h,
            h: h,
            midi: midi++
          });
        }
      }
      keys = b_keys.concat(w_keys);
      w_keys.forEach(function(key) {
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#95a5a6";
        context.fillRect(key.x1, key.y1, key.w, key.h);
        return context.strokeRect(key.x1, key.y1, key.w, key.h);
      });
      b_keys.forEach(function(key) {
        context.fillStyle = "#2c3e50";
        return context.fillRect(key.x1, key.y1, key.w, key.h);
      });
      return keys;
    };

    return Keyboard;

  })();

}).call(this);