'use strict';

/* globals describe:false, it:false */

require('should');
require('co-mocha');

var gen = require('gen');

var Timer = require('../../lib/index');
var timer = new Timer();
var timer2 = new Timer();
var timer3 = new Timer();

describe('Timer', function() {
  it('Should be a constructor', function * () {
    Timer.should.be.type('function');
  });

  it('Should create a proper object', function * () {
    timer.should.be.type('object');
  });

  it('Should have a method start', function * () {
    timer.start.should.be.type('function');
  });

  it('Should have a method stop', function * () {
    timer.stop.should.be.type('function');
  });

  it('Should have a method mark', function * () {
    timer.mark.should.be.type('function');
  });

  it('Should have a method run', function * () {
    timer.run.should.be.type('function');
  });

  it('Should have a method result', function * () {
    timer.result.should.be.type('function');
  });

  it('Should add a mark', function * () {
    timer.start();
    timer.mark('test');
    timer._marks.length.should.be.equal(2);
  });

  it('Should keep each timer separate', function * () {
    timer2._marks.length.should.be.equal(0);
  });

  it('Should run a generator', function * () {
    yield * timer2.run(function * () {
      return true;
    });
    timer2._marks.length.should.be.equal(2);
  });

  it('Should output the results in ms', function * () {
    var results = timer2.result('ms');
    results[0].unit.should.be.equal('ms');
  });

  it('Should output the result in seconds', function * () {
    var results = timer2.result('s');
    results[0].unit.should.be.equal('s');
  });

  it('Should output the result in ns', function * () {
    var results = timer2.result('ns');
    results[0].unit.should.be.equal('ns');
  });

  it('Should be accurate', function * () {
    timer3.start();
    yield gen.delay(1000);
    timer3.stop();

    var results = timer3.result('s');
    console.log();
    results[0].time.should.be.approximately(1, 0.01);
  });
});
