import test from 'ava';
import clone from 'lodash.clone';
import proxyquire from 'proxyquire';

const
  processArgv = clone( process.argv ),
  consoleInfo = console.info,
  consoleError = console.error;

test.beforeEach( () => {
  process.argv = processArgv.slice( 0, 2 );
} );

test.afterEach( () => {
  process.argv = processArgv;
  console.info = consoleInfo;
  console.error = consoleError;
} );

test( `print version info`, ( t ) => {
  t.plan( 1 );

  process.argv.push( `-v` );
  console.info = ( arg ) => {
    t.is( arg, `test-this-string`, `expect version string printed` );
  };

  proxyquire( `../app/index.js`, {
    '../package.json': {
      version: `test-this-string`
    }
  } );
} );

test( `print usage info`, ( t ) => {
  t.plan( 1 );

  process.argv = process.argv.slice( 0, 1 );
  process.argv.push( ``, `-h` );
  console.info = ( arg ) => {
    t.regex( arg, /Looking up Status Codes/, `expect version string printed` );
  };

  proxyquire( `../app/index.js`, {
    '../package.json': {
      version: `test-this-string`
    }
  } );
} );

test( `look up specified http status codes`, ( t ) => {
  t.plan( 2 );

  process.argv.push( 100 );
  console.info = ( arg ) => {
    t.regex( arg, /100.*?Continue.*?The initial part of a request/, `expect http status code details` );
    t.regex( arg, /https:\/\/httpstatuses\.com\/100/, `expect default link in details` );
  };

  proxyquire( `../app/index.js`, {} );
} );

test( `look up non-standard http status codes`, ( t ) => {
  t.plan( 2 );

  process.argv.push( 420 );
  console.info = ( arg ) => {
    t.regex( arg, /420.*?Enhance Your Calm.*?Unofficial code/, `expect custom status code details` );
    t.regex( arg, /https:\/\/dev.twitter.com\/overview\/api/, `expect custom link in details` );
  };

  proxyquire( `../app/index.js`, {} );
} );

test( `look up non-existent http status codes`, ( t ) => {
  t.plan( 1 );

  process.argv.push( 123 );
  console.info = ( arg ) => {
    t.regex( arg, /123.*?-.*?This code is unknown or not an HTTP Status Code./, `expect no status code info` );
  };

  proxyquire( `../app/index.js`, {} );
} );

test( `ask questions to determine status code`, ( t ) => {
  t.plan( 1 );

  const
    value = 100,
    promise = new Promise( ( resolve ) => {
      resolve( value );
    } );

  console.info = ( arg ) => {
    t.regex( arg, new RegExp( `100` ), `expect resolved status code lookup` );
  };

  proxyquire( `../app/index.js`, { 'inquiry-traverser': () => ( () => promise ) } );

  return promise;
} );

// The following tests have to run serially

test.serial.cb( `ask questions without resolution of status code`, ( t ) => {
  t.plan( 1 );

  const
    promise = new Promise( ( resolve ) => {
      resolve();
    } );

  console.error = ( arg ) => {
    if ( !/What The\.\.\./.test( arg ) ) {
      t.fail( `expected error not received` );
      t.end( `expected error not received` );

      return;
    }

    t.pass( `expected error received` );
    t.end();
  };

  proxyquire( `../app/index.js`, { 'inquiry-traverser': () => ( () => promise ) } );
} );

test.serial.cb( `ask questions with an invalid resolution of status code`, ( t ) => {
  t.plan( 1 );

  const
    promise = new Promise( ( resolve ) => {
      resolve( `not-a-number` );
    } );

  console.error = ( arg ) => {
    if ( !/What The\.\.\./.test( arg ) ) {
      t.fail( `expected error not received` );
      t.end( `expected error not received` );

      return;
    }

    t.pass( `expected error received` );
    t.end();
  };

  proxyquire( `../app/index.js`, { 'inquiry-traverser': () => ( () => promise ) } );
} );
