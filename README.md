# Timer #
---

High Resolution Timer for PropelJS

### Installation ###
---

``` bash
npm i --save PropelJS/timer
```

### Usage ###
---

var Timer = require('timer');
var timer = new timer();

timer.start();
timer.mark('mark');
timer.stop();

var time = timer.result('s'); // defaults to ms but can be any of:

  + s - seconds
  + ms - milliseconds
  + ns - nanoseconds

### PropelJS Functionality ###
---

The timer is built for PropelJS and has a convenience method for its use case

If you pass in a generator function or other yieldable into the timer.run method
the timer will automatically call start and stop around the item passed in

This is built to be used with PropelJS.gen so that almost anything can be yielded but
it should also work with libraries like co or suspend
