'use strict';

var
  defaultConfirmation = {
    type: 'list',
    choices: [ {
      value: true,
      name: 'Yes'
    }, {
      value: false,
      name: 'No'
    } ]
  };

module.exports = {
  entry: 'responseClassRequest',
  responseClassRequest: {
    question: {
      message: 'Is there a problem with the request?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxUserThrottled'
      },
      false: {
        redirect: 'responseClassServerSide'
      }
    }
  },

  responseClassServerSide: {
    question: {
      message: 'Is there a problem server-side?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp5xxShouldRetry'
      },
      false: {
        redirect: 'resp2xx3xxRedirect'
      }
    }
  },

  // Status Code 2xx/3xx Responses
  resp2xx3xxRedirect: {
    question: {
      message: 'Do you want to redirect the user to a new Location?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp2xx3xxSameResourceNewLocation'
      },
      false: {
        redirect: 'resp2xx3xxRequestCompletesLater'
      }
    }
  },

  resp2xx3xxSameResourceNewLocation: {
    question: {
      message: 'Is it to the same resource at a new Location?',
      type: defaultConfirmation.type,
      choices: [ {
        value: true,
        name: 'Yes'
      }, {
        value: false,
        name: 'No, a different resource'
      } ]
    },
    resolve: {
      true: {
        redirect: 'resp2xx3xxCanMethodChangeToGet'
      },
      false: {
        redirect: 'resp2xx3xxLocationCreatedForRequest'
      }
    }
  },

  resp2xx3xxCanMethodChangeToGet: {
    question: {
      message: 'Can the method change to GET?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp2xx3xxNewLocationTemporary'
      },
      false: {
        redirect: 'resp2xx3xxNewLocationTemporaryRedirect'
      }
    }
  },

  resp2xx3xxNewLocationTemporary: {
    question: {
      message: 'Is the new Location temporary?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 302
      },
      false: {
        value: 301
      }
    }
  },

  resp2xx3xxNewLocationTemporaryRedirect: {
    question: {
      message: 'Is the new Location temporary?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 307
      },
      false: {
        value: 308
      }
    }
  },

  resp2xx3xxLocationCreatedForRequest: {
    question: {
      message: 'Was the Location created for the request?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 201
      },
      false: {
        value: 303
      }
    }
  },

  resp2xx3xxRequestCompletesLater: {
    question: {
      message: 'Will the request be completed later?',
      type: defaultConfirmation.type,
      choices: [ {
        value: true,
        name: 'Yes'
      }, {
        value: false,
        name: 'No, it\'s done'
      } ]
    },
    resolve: {
      true: {
        value: {
          code: 202,
          text: 'Accepted'
        }
      },
      false: {
        redirect: 'resp2xx3xxUsersViewUnchanged'
      }
    }
  },

  resp2xx3xxUsersViewUnchanged: {
    question: {
      message: 'Do you want the user\'s view to remain unchanged?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: {
          code: 204,
          text: 'No Content'
        }
      },
      false: {
        redirect: 'resp2xx3xxImplementingWebServer'
      }
    }
  },

  resp2xx3xxImplementingWebServer: {
    question: {
      message: 'Are you implementing a web server?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: [ 200, 206, 304 ]
      },
      false: {
        value: 200
      }
    }
  },

  // Status Code 4xx Responses
  resp4xxUserThrottled: {
    question: {
      message: 'Is the user being throttled?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxTwitter'
      },
      false: {
        redirect: 'resp4xxNeedToAuthenticate'
      }
    }
  },

  resp4xxTwitter: {
    question: {
      message: 'Are you Twitter?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 420
      },
      false: {
        value: 429
      }
    }
  },

  resp4xxNeedToAuthenticate: {
    question: {
      message: 'Does the user need to authenticate?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxUsingHttpAuth'
      },
      false: {
        redirect: 'resp4xxUserAccessToResource'
      }
    }
  },

  resp4xxUsingHttpAuth: {
    question: {
      message: 'Are you using HTTP auth?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 401
      },
      false: {
        redirect: 'resp4xxIsResourceSecret'
      }
    }
  },

  resp4xxUserAccessToResource: {
    question: {
      message: 'Does the user have access to the resource?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxDoesResourceExist'
      },
      false: {
        redirect: 'resp4xxIsResourceSecret'
      }
    }
  },

  resp4xxIsResourceSecret: {
    question: {
      message: 'Is the resource a secret?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      false: {
        value: 403
      },
      true: {
        value: 404
      }
    }
  },

  resp4xxDoesResourceExist: {
    question: {
      message: 'Does the resource even exist?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxHttpMethodHandledByResource'
      },
      false: {
        redirect: 'resp4xxRageQuittingInternet'
      }
    }
  },

  resp4xxRageQuittingInternet: {
    question: {
      message: 'Are you rage-quitting the internet?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 410
      },
      false: {
        value: 404
      }
    }
  },

  resp4xxHttpMethodHandledByResource: {
    question: {
      message: 'Is the HTTP method handled by the resource?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxHeaderProblems'
      },
      false: {
        value: 405
      }
    }
  },

  resp4xxHeaderProblems: {
    question: {
      message: 'Problem with the headers?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp4xxHeaderSwitch'
      },
      false: {
        redirect: 'resp4xxRequestIncompatibleWithPrevious'
      }
    }
  },

  resp4xxHeaderSwitch: {
    question: {
      message: 'Please select the header in question:',
      type: 'list',
      choices: [
        'Accept',
        'Content-Length',
        'Content-Type',
        'Expect',
        'If-*',
        'Other'
      ]
    },
    resolve: {
      'Accept': { // eslint-disable-line quote-props
        value: 406
      },
      'Content-Length': {
        value: 411
      },
      'Content-Type': {
        value: 415
      },
      'Expect': { // eslint-disable-line quote-props
        value: 417
      },
      'If-*': {
        value: 412
      },
      'Other': { // eslint-disable-line quote-props
        redirect: 'resp4xxRequestIncompatibleWithPrevious'
      }
    }
  },

  resp4xxRequestIncompatibleWithPrevious: {
    question: {
      message: 'Is the request incompatible with a previous request?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 409
      },
      false: {
        redirect: 'resp4xxBodyWellFormedButInvalid'
      }
    }
  },

  resp4xxBodyWellFormedButInvalid: {
    question: {
      message: 'Is the body well-formed and yet still invalid?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 422
      },
      false: {
        redirect: 'resp4xxApril1st'
      }
    }
  },

  resp4xxApril1st: {
    question: {
      message: 'Is it April 1st?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 418
      },
      false: {
        redirect: 'resp4xxImplementingWebServer'
      }
    }
  },

  resp4xxImplementingWebServer: {
    question: {
      message: 'Are you implementing a web server?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: [ 406, 413, 414, 416, 426 ]
      },
      false: {
        value: 400
      }
    }
  },

  // Status Code 5xx Responses
  resp5xxShouldRetry: {
    question: {
      message: 'Should the user Retry-After some time?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 503
      },
      false: {
        redirect: 'resp5xxProblemWithAnotherServer'
      }
    }
  },

  resp5xxProblemWithAnotherServer: {
    question: {
      message: 'Is it a problem with another server?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        redirect: 'resp5xxOtherServerResponding'
      },
      false: {
        redirect: 'resp5xxDoYouFeelBad'
      }
    }
  },

  resp5xxOtherServerResponding: {
    question: {
      message: 'Is the other server responding?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 502
      },
      false: {
        value: 504
      }
    }
  },

  resp5xxDoYouFeelBad: {
    question: {
      message: 'Do you feel bad your code can\'t handle the request?',
      type: defaultConfirmation.type,
      choices: defaultConfirmation.choices
    },
    resolve: {
      true: {
        value: 501
      },
      false: {
        value: 500
      }
    }
  }
};
