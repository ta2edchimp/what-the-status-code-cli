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

    if ( !codeInfo ) {
      throw Error( 'HTTP Status Code "' + code + '" could not be resolved!' );
    }

    meaning = codeInfo.meaning;
    if ( codeInfo.link === true ) {
      meaning += '\n' + ( 'https://httpstatuses.com/' + code ).link;
    }

    resultsTable.push( [
      code,
      codeInfo.message,
      meaning
    ] );
  }

  return resultsTable;
}

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

    console.log( getStatusCodesTable( value ).toString() );
  } )
  .catch( function onRejected( reason ) {
    console.error(
      'What The...\n'.error,
      reason
    );
  } );
