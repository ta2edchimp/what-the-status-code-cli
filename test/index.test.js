import test from 'ava';
import clone from 'lodash.clone';
import proxyquire from 'proxyquire';

const
  processArgv = clone( process.argv ),
  consoleInfo = console.info;

test.beforeEach( () => {
  process.argv = processArgv.slice( 0, 2 );
} );

test.afterEach( () => {
  process.argv = processArgv;
  console.info = consoleInfo;
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

  process.argv.push( `-h` );
  console.info = ( arg ) => {
    t.regex( arg, /Looking up Status Codes/, `expect version string printed` );
  };

  proxyquire( `../app/index.js`, {
    '../package.json': {
      version: `test-this-string`
    }
  } );
} );

test.todo( `look up specified http status codes` );

test.todo( `ask questions to determine status code` );
