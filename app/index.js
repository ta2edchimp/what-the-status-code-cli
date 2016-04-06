#!/usr/bin/env node
'use strict';

var
  inquirer = require( 'inquirer' ),
  colors = require( 'colors' ),
  Table = require( 'cli-table2' ), // eslint-disable-line id-match

  statusCodes = require( './status-codes' ),
  questions = require( './questions' ),

  traverser = require( 'inquiry-traverser' ),
  traverse = traverser( inquirer );

colors.setTheme( {
  tableHead: 'yellow',
  emphasize: [ 'red', 'bold' ],
  link: [ 'cyan', 'bold', 'underline' ],
  error: [ 'red', 'bold' ]
} );


if ( process.argv.indexOf( '-v' ) > 0 || process.argv.indexOf( '--version' ) > 0 ) {
  console.info(
    getVersion()
  );
} else if ( process.argv.indexOf( '-h' ) > 0 || process.argv.indexOf( '--help' ) > 0 ) {
  console.info(
    getUsageInfo( process.argv )
  );
} else if ( process.argv.length > 2 ) {
  console.info(
    lookUpHttpStatusCode( process.argv.splice( 2 ) )
  );
} else {
  chooseHttpStatusCode();
}


/**
 * Returns the current version number.
 *
 * @return {string} version string from package.json
 */
function getVersion() {
  return require( '../package.json' ).version; // eslint-disable-line global-require
}


/**
 * Prints out "What The... Status Code" usage info.
 *
 * @param  {Array} args Arguments the Script has been called with
 * @return {string}     Usage information string
 */
function getUsageInfo( args ) {
  var
    fullPath = ( args[ 1 ] || 'what-the-status-code' ).split( '/' ),
    name = fullPath[ fullPath.length - 1 ],
    version = getVersion(),

    padLeft = '  ',

    usageInfo = [];

  usageInfo.push(
    name + ' v' + version + '\n' +

    'Without arguments:\n' +
    padLeft + 'Invoking ' + name + ' without any arguments will ask' +
    padLeft + 'a few questions prior to suggesting an HTTP Status Code' +
    padLeft + 'to meet your situation.\n\n' +

    'Looking up Status Codes:\n' +
    padLeft + 'Invoke ' + name + ' with any number of HTTP Status Codes' +
    padLeft + 'to look up their message and meaning.\n' +
    padLeft + 'Example:' +
    padLeft + name + ' 200 404 504\n\n' +

    'Miscellaneous:\n' +
    padLeft + '-h, --help     Show help' +
    padLeft + '-v, --version  Outputs the version number' +
    padLeft + '--no-color     Deactivates colorized output\n'
  );

  return usageInfo.join( '\n' );
}


/**
 * Receives a single numeric HTTP Status Code or an Array of those, determines
 * its/their message and meaning and transforms these results into a
 * `cli-table2` Table object.
 *
 * @example
 * var
 *   table = getStatusCodesTable( 404 );
 * console.log( table.toString() );
 *
 * @param  {number|Array} codes A single number or an Array of numbers
 * @return {Table}              HTTP Status Code(s) and their message and meaning
 */
function getStatusCodesTable( codes ) {
  var
    allCodes = [].concat( codes ),
    idx = 0,
    len = allCodes.length,
    code = 0,
    codeInfo = {},
    resultsTable = new Table( {
      head: [
        'Code'.tableHead,
        'Message'.tableHead,
        'Meaning'.tableHead
      ],
      colWidths: [ 6, 24, 50 ],
      wordWrap: true
    } );

  for ( ; idx < len; idx++ ) {
    if ( !( code = allCodes[ idx ] ) || isNaN( code ) ) {
      throw Error( 'HTTP Status Codes to lookup must be numbers! "' + code + '" is not a number.' );
    }

    codeInfo = obtainStatusCodeInfo( code );

    if ( !codeInfo ) {
      code = ( '' + code ).error;
      codeInfo = {
        message: '-'.error,
        meaning: 'This code is unknown or not an HTTP Status Code.'.error
      };
    }

    resultsTable.push( [
      code,
      codeInfo.message,
      codeInfo.meaning
    ] );
  }

  return resultsTable;
}


/**
 * Obtains the info object corresponding to the given HTTP Status Code.
 *
 * @param  {number} code The HTTP Status Code to lookup
 * @return {Object}      The Status Code's info object
 */
function obtainStatusCodeInfo( code ) {
  var
    codeInfo = statusCodes[ code ];

  if ( codeInfo ) {
    codeInfo = Object.assign( {}, codeInfo );

    if ( codeInfo.link === true ) {
      codeInfo.meaning += '\n' + ( 'https://httpstatuses.com/' + code ).link;
    }

    if ( typeof codeInfo.customLink === 'string' ) {
      codeInfo.meaning += '\n' + codeInfo.customLink.link;
    }

    if ( codeInfo.unofficial === true ) {
      codeInfo.meaning = 'Unofficial code'.emphasize + '\n' + codeInfo.meaning;
    }
  }

  return codeInfo;
}

/**
 * Looks up a given list of numeric values for their corresponding meaning as
 * HTTP Status Codes.
 *
 * @param  {Array} lookup Array of numbers to look up
 * @return {string}       HTTP Status Codes and their message and meaning as a string
 */
function lookUpHttpStatusCode( lookup ) {
  var
    codes = lookup.filter( function filterNaNs( code ) {
      return !isNaN( code );
    } );

  return getStatusCodesTable( codes ).toString();
}


/**
 * Handles the process of asking the defined questions to determine an adequate
 * HTTP Status Code.
 *
 * @return {void}
 */
function chooseHttpStatusCode() {
  traverse( questions )
    .then( function onResolved( value ) {
      var
        outputTable; // eslint-disable-line init-declarations

      if ( !value ) {
        throw Error( 'Could not resolve HTTP Status Code!' );
      }

      outputTable = getStatusCodesTable( value );

      if ( !( outputTable instanceof Table ) ) {
        throw Error( 'Could not transform HTTP Status Code(s) ' + value + ' into a table to output!' );
      }

      console.info( outputTable.toString() );
    } )
    .catch( function onRejected( reason ) {
      console.error(
        'What The...\n'.error,
        reason
      );
    } );
}
