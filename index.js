#!/usr/bin/env node

// TODO: Upon completion, allow to open https://httpstatuses.com/${status code}

var
  inquirer = require( 'inquirer' ),

  questions = require( './wtsc-questions' ),

  traverser = require( 'inquiry-traverser' ),
  traverse = traverser( inquirer );

traverse( questions )
  .then( function onResolve( value ) {
    console.log( 'Promise resolved:', value );
  } )
  .catch( function onRejected( reason ) {
    console.log( 'Promise rejected:', reason );
  } );
