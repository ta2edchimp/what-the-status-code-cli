module.exports = {
  entry: 'responseClassRequest',
  responseClassRequest: {
    question: {
      message: 'Is there a problem with the request?',
      type: 'confirm'
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
      type: 'confirm'
    },
    resolve: {
      true: {
        redirect: 'resp5xx'
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
      type: 'confirm'
    },
    resolve: {
      true: {
        redirect: 'resp2xx3xxSameResourceNewLocation'
      },
      false: {
        redirect: 'resp2xx3xxRequestCompletedLater'
      }
    }
  },

  resp2xx3xxSameResourceNewLocation: {
    question: {
      message: 'Is it to the same resource at a new Location?',
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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

  resp2xx3xxRequestCompletedLater: {
    question: {
      message: 'Will the request be completed later?',
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
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
      type: 'confirm'
    },
    resolve: {
      true: {
        value: 666
      },
      false: {
        value: 667
      }
    }
  },

  // Status Code 5xx Responses
  resp5xxShouldRetry: {
    question: {
      message: 'Should the user Retry-After some time?',
      type: 'confirm'
    },
    resolve: {
      true: {
        value: 503
      },
      false: {
        value: 668
      }
    }
  }
};
