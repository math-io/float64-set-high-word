'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var HIGH = require( './../lib/high.js' );


// TESTS //

tape( 'main export is a number', function test( t ) {
	t.ok( typeof HIGH === 'number', 'main export is a number' );
	t.end();
});

tape( 'if little endian, the export equals 1', function test( t ) {
	var HIGH = proxyquire( './../lib/high.js', {
		'utils-is-little-endian': true
	});

	t.equal( HIGH, 1, 'HIGH equals 1' );
	t.end();
});

tape( 'if big endian, the export equals 0', function test( t ) {
	var HIGH = proxyquire( './../lib/high.js', {
		'utils-is-little-endian': false
	});

	t.equal( HIGH, 0, 'HIGH equals 0' );
	t.end();
});

