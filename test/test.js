'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var lpad = require( 'utils-left-pad-string' );
var pow = require( 'math-power' );
var bits = require( 'math-float64-bits' );
var round = require( 'math-round' );
var setHighWord = require( './../lib' );


// VARIABLES //

// Max unsigned 32-bit integer:
var MAX_UINT = pow( 2, 32 ) - 1;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof setHighWord === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a number', function test( t ) {
	var y = setHighWord( pow( 2, 53 ), 5 );
	t.equal( typeof y, 'number', 'returns a number' );
	t.end();
});

tape( 'the function sets the higher order word of a double-precision floating-point number', function test( t ) {
	var actual;
	var values;
	var high;
	var low;
	var x;
	var v;
	var y;
	var i;
	var j;

	values = [
		5,
		pow( 2, 53 ),
		1e308,
		-1e308,
		-3.14,
		1e-324,
		4.94e-324,
		1.234567890123456789,
		-4.94e-324,
		6.333333333333333333e-310,
		-0,
		0,
		100,
		1/10,
		0.625,
		1/3,
		5e-240,
		-5e-240,
		10,
		15,
		-10,
		-15,
		pow( 2, -42 ),
		-pow( 2, 100 ),
		1,
		-1,
		1.5,
		1111111111111.111111111,
		-1111111111111.111111111,
		pow( 2, 54 ),
		pow( 2, 53 ) + 1,
		pow( 2, 53 ) + 2,
		pow( 2, 55 ),
		pow( 2, 56 ) - 1,
		-pow( 2, 57 ) + 5,
		3*pow( 2, 53 ),
		8*pow( 2, 54 ),
		pinf,
		ninf,
		NaN
	];

	// For each value, replace the higher order bits with random integers and test that the returned values match expectations...
	for ( i = 0; i < values.length; i++ ) {
		v = values[ i ];
		x = bits( v );
		low = x.substring( 32 );
		for ( j = 0; j < 10; j++ ) {
			// Generate a random higher order word:
			high = round( Math.random()*MAX_UINT );

			// Generate a new double:
			y = setHighWord( v, high );

			// Convert to a binary string:
			high = high.toString( 2 );
			high = lpad( high, 32, '0' );

			// Higher order bits:
			actual = bits( y ).substring( 0, 32 );
			t.equal( actual, high, 'returned double contains expected higher order word' );

			// Lower order bits:
			actual = bits( y ).substring( 32 );
			t.equal( actual, low, 'returned double contains expected lower order word' );
		}
	}
	t.end();
});
