#!/usr/bin/env node

var
  inquirer = require( 'inquirer' ),
  colors = require( 'colors' ),
  Table = require( 'cli-table2' ),

  statusCodes = require( './status-codes' ),
  questions = require( './questions' ),

  traverser = require( 'inquiry-traverser' ),
  traverse = traverser( inquirer );

colors.setTheme( {
  tableHead: 'yellow',
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
 * @return {string}
 */
function getVersion() {
  return require( '../package.json' ).version;
}


/**
 * Prints out "What The... Status Code" usage info.
 *
 * @param  {Array} args Arguments the Script has been called with
 * @return {string}
 */
function getUsageInfo( args ) {
  var
    fullPath = ( args[ 1 ] || 'what-the-status-code' ).split( '/' ),
    name = fullPath[ fullPath.length - 1 ],
    version = getVersion(),

    padLeft = '  ',

    usageInfo = [];

  usageInfo.push( name + ' v' + version + '\n' );

  usageInfo.push( 'Without arguments:\n' );
  usageInfo.push( padLeft + 'Invoking ' + name + ' without any arguments will ask' );
  usageInfo.push( padLeft + 'a few questions prior to suggesting an HTTP Status Code' );
  usageInfo.push( padLeft + 'to meet your situation.\n\n' );

  usageInfo.push( 'Looking up Status Codes:\n' );
  usageInfo.push( padLeft + 'Invoke ' + name + ' with any number of HTTP Status Codes' );
  usageInfo.push( padLeft + 'to look up their message and meaning.\n' );
  usageInfo.push( padLeft + 'Example:' );
  usageInfo.push( padLeft + name + ' 200 404 504\n\n' );

  usageInfo.push( 'Miscellaneous:\n' )
  usageInfo.push( padLeft + '-h, --help     Show help' );
  usageInfo.push( padLeft + '-v, --version  Outputs the version number' );
  usageInfo.push( padLeft + '--no-color     Deactivates colorized output\n' );

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
 * @return {Table}
 */
function getStatusCodesTable( codes ) {
  var
    _codes = [].concat( codes ),
    idx = 0,
    len = _codes.length,
    code = 0,
    codeInfo = {},
    message = '',
    meaning = '',
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
    code = _codes[ idx ];

    if ( isNaN( code ) ) {
      throw Error( 'HTTP Status Codes to lookup must be numbers! "' + code + '" is not a number.' );
    }

    codeInfo = statusCodes[ code ];

    if ( codeInfo ) {

      message = codeInfo.message;
      meaning = codeInfo.meaning;

      if ( codeInfo.link === true ) {
        meaning += '\n' + ( 'https://httpstatuses.com/' + code ).link;
      }

    } else {

      code = ( '' + code ).error;
      message = '-'.error;
      meaning = 'This code is unknown or not an HTTP Status Code.'.error;

    }

    resultsTable.push( [
      code,
      message,
      meaning
    ] );
  }

  return resultsTable;
}


/**
 * Looks up a given list of numeric values for their corresponding meaning as
 * HTTP Status Codes.
 *
 * @param  {Array} lookup Array of numbers to look up
 * @return {string}
 */
function lookUpHttpStatusCode( lookup ) {
  var
    codes = lookup.filter( function filterNaNs( n ) {
      return !isNaN( n );
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
        outputTable;

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
