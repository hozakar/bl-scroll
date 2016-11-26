var scroll = function (scrollTop, interval, fps) {
  var step = function(timestamp) {
    this.startTime = this.startTime || timestamp;
    this.startTop = this.startTop || this.el.scrollTop;
    this.range = this.range || this.scrollTop - this.startTop;

    var timeDiff = timestamp - this.startTime;

    if(timeDiff >= this.interval) {
      this.el.scrollTop = this.scrollTop;
      caf(this.rafHandler);
    } else {
      // Calculate new scrollTop value to apply
      var t = 2 * timeDiff / this.interval;
      var newTop = this.startTop + (this.range / 2) * Math.pow(t, 2);
      if(t > 1)
        newTop = this.scrollTop - (this.range / 2) * Math.pow(2 - t, 2);

      // Check if new scrollTop value has passed the expected final value
      var stCheck = this.range >= 0 ? Math.min : Math.max;
      this.el.scrollTop = stCheck(this.scrollTop, newTop);

      // Check how much we need to delay the next frame
      // in order to achieve the required fps
      var delay = Math.max(0, (1000 / this.fps) - (timestamp - this.lastTimestamp));
      this.lastTimestamp = timestamp;

      setTimeout(function() {
        this.rafHandler = raf(step.bind(this));
      }.bind(this), delay);
    }
  };

  var anim = {
    scrollTop: scrollTop || 0,
    interval: interval || 400,
    fps: fps || 40,
    el: this && this !== window ? this : document.body
  };

  var vnd = ["ms", "moz", "webkit", "o"];
  var raf = window.requestAnimationFrame;
  var caf = window.cancelAnimationFrame;

  for(var x = 0; x < vnd.length && !raf; x++) {
    raf = window[vnd[x] + 'RequestAnimationFrame'];
    caf = window[vnd[x] + 'CancelAnimationFrame'] || window[vnd[x] + 'CancelRequestAnimationFrame'];
  }

  anim.rafHandler = raf(step.bind(anim));
};

if(typeof module !== 'undefined' && module.exports)
  module.exports = scroll;
