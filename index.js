/**
 * Nanobar
 *
 * A progress bar for Yuehu.
 */

function Nanobar(options) {
  var el = document.getElementById('nanobar');
  if (!el) {
    el = document.createElement('div');
    el.id = 'nanobar';
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role
    el.setAttribute('role', 'progressbar');
    el.setAttribute('aria-valuemin', 0);
    el.setAttribute('aria-valuemax', 100);
  }
  var bar = document.createElement('div');
  bar.className = 'nanobar-progress';
  el.appendChild(bar);
  this.el = el;
  this.bar = bar;
}

Nanobar.prototype.go = function(percent) {
  if (!this._inbody) {
    this._inbody = true;
    document.body.appendChild(this.el);
  }
  var bar = this.bar;

  bar.className = 'nanobar-progress';
  bar.style.width = percent + '%';

  // Aria supports
  this.el.setAttribute('aria-valuenow', percent);

  if (percent >= 100) {
    bar.style.height = '0';
  } else {
    bar.style.height = '100%';
  }
};

Nanobar.prototype.dismiss = function() {
  var me = this;
  me.go(100);
  setTimeout(function() {
    if (me._inbody) {
      document.body.removeChild(me.el);
      me._inbody = false;
    }
  }, 300);
};

Nanobar.prototype.infinite = function() {
  this.go(0);
  var bar = this.bar;
  bar.style.width = '0';
  bar.style.height = '100%';
  bar.className = 'nanobar-progress nanobar-progress-infinite';
};

module.exports = Nanobar;
