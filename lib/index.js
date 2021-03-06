'use strict';

var hrTime = process.hrtime;

/**
 * Returns a Timer Object
 *
 * @constructor
 */
function Timer() {
  this._marks = [];
}

/**
 * Starts a timer
 */
Timer.prototype.start = function start() {
  this.mark('start');
};

/**
 * Stops a timer
 */
Timer.prototype.stop = function stop() {
  this.mark('stop');
};

/**
 * Sets a markpoint on a timer
 *
 * @param {String} name - The name of the markpoint to set
 */
Timer.prototype.mark = function mark(name) {
  var marker = {};
  marker.name = name;
  marker.time = hrTime();
  this._marks.push(marker);
};

/**
 * Converts a time to nanoseconds
 *
 * @param {Array} time - an array from process.hrtime()
 * @returns {Float} time - The time converted to nanoseconds
 */
Timer.prototype.toNano = function toNano(time) {
  return (time[0] * 1e9) + time[1];
};

/**
 * Runs a yieldable with automated start and stop timers
 *
 * @param {Function} fn - The generator or other yieldable to time
 */
Timer.prototype.run = function * run(fn) {
  this.start();
  yield fn;
  this.stop();
};

/**
 * Outputs the result in array format
 *
 * @param {String} fmt - The unit of time to return the results in
 * @returns {Array} results - The results of the timer
 */
Timer.prototype.result = function result(fmt) {
  var marks = this._marks;

  var results = [];

  var i = 0;
  while (i < (marks.length - 1)) {
    var start = this.toNano(marks[i].time);
    var stop = this.toNano(marks[i + 1].time);
    var diff = stop - start;
    var formatted = this.formatResult(fmt, diff);
    results.push(formatted);
    i++;
  }

  return results;
};

/**
 * Returns a formatted result set
 *
 * @param {String} fmt - The unit to convert the time to
 * @param {Float} ns - The time to convert
 * @returns {{time: *, unit: string}} - An object holding the unit and the formatted time result
 */
Timer.prototype.formatResult = function formatResult(fmt, ns) {
  var unit = 'ms';
  var time = ns;

  if (fmt === 's') {
    time /= 1e9;
    unit = fmt;
  }

  if (fmt === 'ns') {
    unit = fmt;
  }

  if (unit === 'ms') {
    time /= 1e6;
  }

  if (unit !== 'ns') {
    time = time.toFixed(4);
  }

  return {time: time, unit: unit};
};

module.exports = Timer;
