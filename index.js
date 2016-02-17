#!/usr/bin/env node

// TODO: Upon completion, allow to open https://httpstatuses.com/${status code}

var inquirer = require('inquirer');

var questions = require('./wtsc-questions');

function retrieveQuestion (options) {
  options = options || {};

  var questions = options.questions || {};
  var id = options.id || '';
  var resolutionCb = options.onResolve || function () {};
  var errorCb = options.onError || function () {};

  if (!id && questions.entry) {
    id = questions.entry;
  }

  if (!(id in questions)) {
    throw new Error('Question id "' + id + '" not found!');
  }

  var step = questions[id];
  var question = Object.assign({}, step.question, { name: id });

  inquirer.prompt(question, function (answer) {
    if (!(id in answer)) {
      return errorCb.call(null, step, answer);
    }

    var resolve = step.resolve;
    var value = '' + answer[id];

    if (!(value in resolve)) {
      return errorCb.call(null, step, answer);
    }

    var resolution = resolve[value];

    if ('redirect' in resolution) {
      setTimeout(retrieveQuestion, 0, {
        questions: questions,
        id: resolution.redirect,
        onResolve: resolutionCb,
        onError: errorCb
      });
      return;
    }

    if ('value' in resolution) {
      resolutionCb.call(null, resolution.value);
      return;
    }

    throw new Error('Step is lacking a resolution (either redirect or value)!');
  });
}

retrieveQuestion ({
  questions: questions,
  onResolve: function (value) {
    console.log('Resolved:', value);
  },
  onError: function (step, answer) {
    console.log('Error:', step, answer);
  }
});
