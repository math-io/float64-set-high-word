'use strict';

// MODULES //

var isLittleEndian = require( 'utils-is-little-endian' );


// INDEX //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;
