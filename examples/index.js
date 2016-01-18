'use strict';

var pow = require( 'math-power' );
var round = require( 'math-round' );
var setHighWord = require( './../lib' );

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
