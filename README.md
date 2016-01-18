Set High Word
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Sets the more significant 32 bits of a [double-precision floating-point number][ieee754].


## Installation

``` bash
$ npm install math-float64-set-high-word
```


## Usage

``` javascript
var setHighWord = require( 'math-float64-set-high-word' );
```

#### setHighWord( x, high )

Sets the more significant 32 bits (higher order word) of a [double-precision floating-point number][ieee754] `x` to a bit sequence represented by an unsigned 32-bit integer `high`. The returned `double` will have the same less significant 32 bits (lower order word) as `x`.

``` javascript
var high = 5 >>> 0;
// => 0 00000000000 00000000000000000101

var y = setHighWord( 3.14e201, high );
// returns 1.18350528745e-313 => 0 00000000000 0000000000000000010110010011110010110101100010000010

var pinf = require( 'const-pinf-float64' );
// returns +infinity => 0 11111111111 00000000000000000000 00000000000000000000000000000000

high = 1072693248 >>> 0;
// => 0 01111111111 00000000000000000000

// Set the higher order bits of `+infinity` to return `1`:
y = setHighWord( pinf, high );
// returns 1 => 0 01111111111 0000000000000000000000000000000000000000000000000000
```


## Examples

``` javascript
var pow = require( 'math-power' );
var round = require( 'math-round' );
var setHighWord = require( 'math-float64-set-high-word' );

var MAX_UINT;
var high;
var frac;
var exp;
var x;
var y;
var i;

// Max unsigned 32-bit integer:
MAX_UINT = pow( 2, 32 ) - 1;

// Generate a random double-precision floating-point number:
frac = Math.random() * 10;
exp = -round( Math.random() * 323 );
x = frac * pow( 10, exp );

// Replace the higher order word of `x` to generate new random numbers having the same lower order word...
for ( i = 0; i < 100; i++ ) {
	high = round( Math.random()*MAX_UINT );
	y = setHighWord( x, high );
	console.log( 'x: %d. new high word: %d. y: %d.', x, high, y );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-set-high-word.svg
[npm-url]: https://npmjs.org/package/math-float64-set-high-word

[build-image]: http://img.shields.io/travis/math-io/float64-set-high-word/master.svg
[build-url]: https://travis-ci.org/math-io/float64-set-high-word

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-set-high-word/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-set-high-word?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-set-high-word.svg
[dependencies-url]: https://david-dm.org/math-io/float64-set-high-word

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-set-high-word.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-set-high-word

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-set-high-word.svg
[github-issues-url]: https://github.com/math-io/float64-set-high-word/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985
