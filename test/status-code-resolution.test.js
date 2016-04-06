/* eslint max-statements: 0 */
import test from 'ava';


test( `all question's status codes responses get resolved.`, ( t ) => {
  const
    questions = require( `../app/questions` ), // eslint-disable-line global-require
    statusCodes = require( `../app/status-codes` ); // eslint-disable-line global-require

  for ( const questionName in questions ) {
    if ( !questions.hasOwnProperty( questionName ) || questionName === `entry` ) {
      continue;
    }

    const question = questions[ questionName ];

    t.is( typeof question, `object`, `question object for "${questionName}" is existing` );
    t.is( typeof question.resolve, `object`, `question "${questionName}" is resolvable` );

    for ( const resolutionName in question.resolve ) {
      if ( !question.resolve.hasOwnProperty( resolutionName ) ) {
        continue;
      }

      const resolution = question.resolve[ resolutionName ];

      if ( typeof resolution.value !== `number` ) {
        continue;
      }

      t.true( resolution.value in statusCodes, `status code ${resolution.value} not found!` );
    }
  }

  t.pass( `all questions resolved to a status code` );
} );


test( `all status code details seem plausible`, ( t ) => {
  const
    statusCodes = require( `../app/status-codes` ); // eslint-disable-line global-require

  for ( const code in statusCodes ) {
    if ( !statusCodes.hasOwnProperty( code ) || isNaN( code ) ) {
      continue;
    }

    const
      codeInfo = statusCodes[ code ];

    t.is( typeof codeInfo.message, `string`, `info object for code ${code} contains a message string` );
    t.is( typeof codeInfo.meaning, `string`, `info object for code ${code} contains a meaning string` );
    t.true( typeof codeInfo.link === `boolean` || typeof codeInfo.link === `undefined`, `info object for code ${code} contains a valid link flag or none` );
    t.true( typeof codeInfo.unofficial === `boolean` || typeof codeInfo.unofficial === `undefined`, `info object for code ${code} contains valid unofficial flag or none` );
    t.true( typeof codeInfo.customLink === `string` || typeof codeInfo.customLink === `undefined`, `info object for code ${code} contains valid customLink string or none` );
  }

  t.pass( `all status code details seem plausible` );
} );
