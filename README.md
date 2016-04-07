# What The... Status Code

[![npm version](https://badge.fury.io/js/what-the-status-code-cli.svg)](https://badge.fury.io/js/what-the-status-code-cli) [![Build Status](https://img.shields.io/travis/ta2edchimp/what-the-status-code-cli/master.svg)](https://travis-ci.org/ta2edchimp/what-the-status-code-cli) [![Code Coverage](https://img.shields.io/codecov/c/github/ta2edchimp/what-the-status-code-cli.svg)](https://codecov.io/github/ta2edchimp/what-the-status-code-cli) [![dependencies](https://david-dm.org/ta2edchimp/what-the-status-code-cli.svg)](https://david-dm.org/ta2edchimp/what-the-status-code-cli)

[![MIT License](https://img.shields.io/npm/l/what-the-status-code-cli.svg)](http://opensource.org/licenses/MIT) [![downloads](https://img.shields.io/npm/dm/what-the-status-code-cli.svg)](http://npm-stat.com/charts.html?package=what-the-status-code-cli&from=2016-02-15) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)


A CLI Tool to help choosing the correct HTTP Status Code by answering some questions.

## Installation

```
$ npm install -g what-the-status-code-cli
```

installs »What The... Status Code« and makes it accessible globally via `wtsc`.

## Usage

### Choosing an HTTP Status Code

Invoked without any arguments, `wtsc` asks a few questions to help choosing an appropriate HTTP Status Code.

### Looking Up an HTTP Status Code

Simply append any number of Status Codes to look up their corresponding text message and their meaning.

```
$ wtsc 123 230 207 301 308 404 503
┌──────┬────────────────────────┬──────────────────────────────────────────────────┐
│ Code │ Message                │ Meaning                                          │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 123  │ -                      │ This code is unknown or not an HTTP Status Code. │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 230  │ -                      │ This code is unknown or not an HTTP Status Code. │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 207  │ Multi-Status           │ A Multi-Status response conveys information      │
│      │                        │ about multiple resources in situations where     │
│      │                        │ multiple status codes might be appropriate.      │
│      │                        │ https://httpstatuses.com/207                     │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 301  │ Moved Permanently      │ The target resource has been assigned a new      │
│      │                        │ permanent URI and any future references to this  │
│      │                        │ resource ought to use one of the enclosed URIs.  │
│      │                        │ https://httpstatuses.com/301                     │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 308  │ Permanent Redirect     │ The target resource has been assigned a new      │
│      │                        │ permanent URI and any future references to this  │
│      │                        │ resource ought to use one of the enclosed URIs.  │
│      │                        │ https://httpstatuses.com/308                     │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 404  │ Not Found              │ The origin server did not find a current         │
│      │                        │ representation for the target resource or is not │
│      │                        │ willing to disclose that one exists.             │
│      │                        │ https://httpstatuses.com/404                     │
├──────┼────────────────────────┼──────────────────────────────────────────────────┤
│ 503  │ Service Unavailable    │ The server is currently unable to handle the     │
│      │                        │ request due to a temporary overload or scheduled │
│      │                        │ maintenance, which will likely be alleviated     │
│      │                        │ after some delay.                                │
│      │                        │ https://httpstatuses.com/503                     │
└──────┴────────────────────────┴──────────────────────────────────────────────────┘
```

The link to [https://httpstatuses.com](https://httpstatuses.com/) are clickable on supporting terminals (e.g. `cmd + click` on OS X).

### More Options

Explore other options via

```
$ wtsc --help
```

## Acknowledgements

Inspired by [Choosing an HTTP Status Code — Stop Making It Hard](http://racksburg.com/choosing-an-http-status-code/) by Michael Kropat.  
Pretty similar web implementation: [What The Status Code](http://alexmeah.com/what-the-status-code/#/home) by [AlexMeah](https://github.com/AlexMeah/what-the-status-code).
