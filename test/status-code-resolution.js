/*
 * Test, whether each HTTP Status Code within the branched Questions object
 * has a representation within the available Status Codes object.
 */
'use strict';

var
  colors = require( 'colors' ),
  questions = require( '../app/questions' ),
  availableStatusCodes = require( '../app/status-codes' );

colors.setTheme( {
  success: 'green',
  error: [ 'red', 'bold' ]
} );


/**
 * Returns whether a cetain object exists.
 *
 * @param  {string} name   The object's name (for output)
 * @param  {Object} object The objects
 * @return {boolean}       Whether the given object exists
 */
function testObjectAvailability( name, object ) {
  console.log( '\tTesting object "' + name + '" for availability ...' );

  if ( typeof object !== 'object' ) {
    throw Error( 'No "' + name + '" object available!' );
  }

  console.log( '\t' + 'done'.success );

  return true;
}


/**
 * Tests whether the specified questions successfully resolve to an HTTP Status
 * Code explanation.
 *
 * @param  {Object} allQuestions An object containing all questions
 * @param  {Object} statusCodes  An object with available Status Code explanations
 * @return {void}
 */
function testStatusCodePresence( allQuestions, statusCodes ) {
  var
    questionName = '',
    question = null,
    resolutionName = '',
    resolution = null,
    allPresent = true;

  for ( questionName in allQuestions ) {
    if ( !allQuestions.hasOwnProperty( questionName ) ) {
      continue;
    }

    question = allQuestions[ questionName ];

    if ( typeof question === 'object' && typeof question.resolve === 'object' ) {
      for ( resolutionName in question.resolve ) {
        if ( !question.resolve.hasOwnProperty( resolutionName ) ) {
          continue;
        }

        resolution = question.resolve[ resolutionName ];

        if ( typeof resolution.value !== 'number' ) {
          continue;
        }

        if ( resolution.value in statusCodes ) {
          console.log( '\t' + '✔︎'.success + ' Status Code ' + resolution.value + ' found.' );
        } else {
          console.log( '\t' + '✘'.error + ' Status Code ' + resolution.value + ' not found!' );
          allPresent = false;
        }
      }
    }
  }

  if ( !allPresent ) {
    throw Error( 'Not all Status Codes have been found!' );
  }
}


/**
 * Tests an object's property for existence and its type.
 *
 * @param  {string}  code               Status Code (for output)
 * @param  {Object}  object             The object whose property to test
 * @param  {string}  propName           The name of the property to test
 * @param  {string}  propType           The desired type
 * @param  {boolean} existenceMandatory Whether to insist on the property's existence
 * @return {boolean}                    Whether the given property exists and matches type
 */
function testProperty( code, object, propName, propType, existenceMandatory ) { // eslint-disable-line max-params
  if ( !object[ propName ] ) {
    if ( existenceMandatory !== false ) {
      console.log( '\t' + '✘'.error + ' Status Code ' + code + ' lacks a "' + propName + '" ' + propType + ' property!' );

      return false;
    }

    return true;
  }

  if ( typeof object[ propName ] !== propType ) {
    console.log( '\t' + '✘'.error + ' Status Code ' + code + ' has property "' + propName + '" of wrong type! Must be of type ' + propType + '!' );

    return false;
  }

  return true;
}


/**
 * Tests the plausibility of all available HTTP Status Code explanations.
 *
 * @param  {Object} statusCodes Object containing the explanations to test
 * @return {void}
 */
function testStatusCodeDetails( statusCodes ) {
  var
    code = '',
    codeInfo = null,
    plausibilityTests = null,
    plausible = true;

  for ( code in statusCodes ) {
    if ( !statusCodes.hasOwnProperty( code ) || isNaN( code ) ) {
      continue;
    }

    codeInfo = statusCodes[ code ];

    plausibilityTests = [
      testProperty( code, codeInfo, 'message', 'string' ),
      testProperty( code, codeInfo, 'meaning', 'string' ),
      testProperty( code, codeInfo, 'link', 'boolean', false ),
      testProperty( code, codeInfo, 'unofficial', 'boolean', false ),
      testProperty( code, codeInfo, 'customLink', 'string', false )
    ];

    if ( plausibilityTests.indexOf( false ) > -1 ) {
      plausible = false;
    } else {
      console.log( '\t' + '✔︎'.success + ' Status Code ' + code + ' looks ok.' );
    }
  }

  if ( !plausible ) {
    throw Error( 'Not all Status Codes have plausible details!' );
  }
}


try {
  testObjectAvailability( 'Questions', questions );
  testObjectAvailability( 'available Status Codes', availableStatusCodes );
  console.log( '\n' + 'All required objects are available.'.green + '\n' );

  testStatusCodePresence( questions, availableStatusCodes );
  console.log( '\n' + 'All questions\' status codes responses get resolved.'.green + '\n' );

  testStatusCodeDetails( availableStatusCodes );
  console.log( '\n' + 'All status codes details seem plausible.'.green + '\n' );
} catch ( e ) { // eslint-disable-line id-length, id-blacklist
  console.log( '\nERROR:'.error, e );
  process.exit( 1 ); // eslint-disable-line no-process-exit
}
