/*
 * Test, whether each HTTP Status Code within the branched Questions object
 * has a representation within the available Status Codes object.
 */

var
  colors = require( 'colors' ),
  questions = require( '../wtsc-questions' ),
  availableStatusCodes = require( '../status-codes' );

colors.setTheme( {
  success: 'green',
  error: [ 'red', 'bold' ]
} );

function testObjectAvailability( name, object ) {

  console.log( '\tTesting object "' + name + '" for availability ...' );

  if ( typeof object !== 'object' ) {
    throw Error( 'No "' + name + '" object available!' );
  }

  console.log( '\t' + 'done'.success );

  return true;
}

function testStatusCodePresence( allQuestions, statusCodes ) {
  var
    questionName,
    question,
    resolutionName,
    resolution,
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

try {
  testObjectAvailability( 'Questions', questions );
  testObjectAvailability( 'available Status Codes', availableStatusCodes );
  testStatusCodePresence( questions, availableStatusCodes );
} catch ( e ) {
  console.log( '\nERROR:'.error, e );
  process.exit( 1 );
}
