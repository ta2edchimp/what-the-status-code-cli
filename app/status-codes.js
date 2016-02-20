module.exports = {
  // 1xx Informational
  '100': {
    message: 'Continue',
    meaning: 'The initial part of a request has been received and has not yet been rejected by the server. The server intends to send a final response after the request has been fully received and acted upon.',
    link: true
  },
  '101': {
    message: 'Switching Protocols',
    meaning: 'The server understands and is willing to comply with the client\'s request, via the Upgrade header field, for a change in the application protocol being used on this connection.',
    link: true
  },
  '102': {
    message: 'Processing',
    meaning: 'An interim response used to inform the client that the server has accepted the complete request, but has not yet completed it.',
    link: true
  },
  // 2xx Success
  '200': {
    message: 'OK',
    meaning: 'The request has succeeded.',
    link: true
  },
  '201': {
    message: 'Created',
    meaning: 'The request has been fulfilled and has resulted in one or more new resources being created.',
    link: true
  },
  '202': {
    message: 'Accepted',
    meaning: 'The request has been accepted for processing, but the processing has not been completed. The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place.',
    link: true
  },
  '203': {
    message: 'Non-authoritative Information',
    meaning: 'The request was successful but the enclosed payload has been modified from that of the origin server\'s 200 OK response by a transforming proxy.',
    link: true
  },
  '204': {
    message: 'No Content',
    meaning: 'The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.',
    link: true
  },
  '205': {
    message: 'Reset Content',
    meaning: 'The server has fulfilled the request and desires that the user agent reset the "document view", which caused the request to be sent, to its original state as received from the origin server.',
    link: true
  },
  '206': {
    message: 'Partial Content',
    meaning: 'The server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the request\'s Range header field.',
    link: true
  },
  '207': {
    message: 'Multi-Status',
    meaning: 'A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.',
    link: true
  },
  '208': {
    message: 'Already Reported',
    meaning: 'Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.',
    link: true
  },
  '226': {
    message: 'IM Used',
    meaning: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    link: true
  },
  // 3xx Redirection
  '300': {
    message: 'Multiple Choices',
    meaning: 'The target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.',
    link: true
  },
  '301': {
    message: 'Moved Permanently',
    meaning: 'The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.',
    link: true
  },
  '302': {
    message: 'Found',
    meaning: 'The target resource resides temporarily under a different URI. Since the redirection might be altered on occasion, the client ought to continue to use the effective request URI for future requests.',
    link: true
  },
  '303': {
    message: 'See Other',
    meaning: 'The server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, which is intended to provide an indirect response to the original request.',
    link: true
  },
  '304': {
    message: 'Not Modified',
    meaning: 'A conditional GET or HEAD request has been received and would have resulted in a 200 OK response if it were not for the fact that the condition evaluated to false.',
    link: true
  },
  '305': {
    message: 'Use Proxy',
    meaning: 'Defined in a previous version of this specification and is now deprecated, due to security concerns regarding in-band configuration of a proxy.',
    link: true
  },
  '307': {
    message: 'Temporary Redirect',
    meaning: 'The target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.',
    link: true
  },
  '308': {
    message: 'Permanent Redirect',
    meaning: 'The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.',
    link: true
  },
  // 4xx Client Error
  '400': {
    message: 'Bad Request',
    meaning: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
    link: true
  },
  '401': {
    message: 'Unauthorized',
    meaning: 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
    link: true
  },
  '402': {
    message: 'Payment Required',
    meaning: 'Reserved for future use.',
    link: true
  },
  '403': {
    message: 'Forbidden',
    meaning: 'The server understood the request but refuses to authorize it.',
    link: true
  },
  '404': {
    message: 'Not Found',
    meaning: 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
    link: true
  },
  '405': {
    message: 'Method Not Allowed',
    meaning: 'The method received in the request-line is known by the origin server but not supported by the target resource.',
    link: true
  },
  '406': {
    message: 'Not Acceptable',
    meaning: 'The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.',
    link: true
  },
  '407': {
    message: 'Proxy Authentication Required',
    meaning: 'Similar to 401 Unauthorized, but it indicates that the client needs to authenticate itself in order to use a proxy.',
    link: true
  },
  '408': {
    message: 'Request Timeout',
    meaning: 'The server did not receive a complete request message within the time that it was prepared to wait.',
    link: true
  },
  '409': {
    message: 'Conflict',
    meaning: 'The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request.',
    link: true
  },
  '410': {
    message: 'Gone',
    meaning: 'The target resource is no longer available at the origin server and that this condition is likely to be permanent.',
    link: true
  },
  '411': {
    message: 'Length Required',
    meaning: 'The server refuses to accept the request without a defined Content-Length.',
    link: true
  },
  '412': {
    message: 'Precondition Failed',
    meaning: 'One or more conditions given in the request header fields evaluated to false when tested on the server.',
    link: true
  },
  '413': {
    message: 'Payload Too Large',
    meaning: 'The server is refusing to process a request because the request payload is larger than the server is willing or able to process.',
    link: true
  },
  '414': {
    message: 'Request-URI Too Long',
    meaning: 'The server is refusing to service the request because the request-target is longer than the server is willing to interpret.',
    link: true
  },
  '415': {
    message: 'Unsupported Media Type',
    meaning: 'The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource.',
    link: true
  },
  '416': {
    message: 'Requested Range Not Satisfiable',
    meaning: 'None of the ranges in the request\'s Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.',
    link: true
  },
  '417': {
    message: 'Expectation Failed',
    meaning: 'The expectation given in the request\'s Expect header field could not be met by at least one of the inbound servers.',
    link: true
  },
  '418': {
    message: 'I\'m a Teapot',
    meaning: 'Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout.',
    link: true
  },
  '420': {
    message: 'Enhance Your Calm',
    meaning: ''
  },
  '421': {
    message: 'Misdirected Request',
    meaning: 'The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.',
    link: true
  },
  '422': {
    message: 'Unprocessable Entity',
    meaning: 'The server understands the content type of the request entity (hence a 415 Unsupported Media Type status code is inappropriate), and the syntax of the request entity is correct (thus a 400 Bad Request status code is inappropriate) but was unable to process the contained instructions.',
    link: true
  },
  '423': {
    message: 'Locked',
    meaning: 'The source or destination resource of a method is locked.',
    link: true
  },
  '424': {
    message: 'Failed Dependency',
    meaning: 'The method could not be performed on the resource because the requested action depended on another action and that action failed.',
    link: true
  },
  '426': {
    message: 'Upgrade Required',
    meaning: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
    link: true
  },
  '428': {
    message: 'Precondition Required',
    meaning: 'The origin server requires the request to be conditional.',
    link: true
  },
  '429': {
    message: 'Too Many Requests',
    meaning: 'The user has sent too many requests in a given amount of time ("rate limiting").',
    link: true
  },
  '431': {
    message: 'Request Header Fields Too Large',
    meaning: 'The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.',
    link: true
  },
  '451': {
    message: 'Unavailable For Legal Reasons',
    meaning: 'The server is denying access to the resource as a consequence of a legal demand.',
    link: true
  },
  '499': {
    message: 'Client Closed Request',
    meaning: 'A non-standard status code introduced by nginx for the case when a client closes the connection while nginx is processing the request.',
    link: true
  },
  // 5xx Server Error
  '500': {
    message: 'Internal Server Error',
    meaning: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    link: true
  },
  '501': {
    message: 'Not Implemented',
    meaning: 'The server does not support the functionality required to fulfill the request.',
    link: true
  },
  '502': {
    message: 'Bad Gateway',
    meaning: 'The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.',
    link: true
  },
  '503': {
    message: 'Service Unavailable',
    meaning: 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.',
    link: true
  },
  '504': {
    message: 'Gateway Timeout',
    meaning: 'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.',
    link: true
  },
  '505': {
    message: 'HTTP Version Not Supported',
    meaning: 'The server does not support, or refuses to support, the major version of HTTP that was used in the request message.',
    link: true
  },
  '506': {
    message: 'Variant Also Negotiates',
    meaning: 'The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
    link: true
  },
  '507': {
    message: 'Insufficient Storage',
    meaning: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
    link: true
  },
  '508': {
    message: 'Loop Detected',
    meaning: 'The server terminated an operation because it encountered an infinite loop while processing a request with "Depth: infinity". This status indicates that the entire operation failed.',
    link: true
  },
  '510': {
    message: 'Not Extended',
    meaning: 'The policy for accessing the resource has not been met in the request. The server should send back all the information necessary for the client to issue an extended request.',
    link: true
  },
  '511': {
    message: 'Network Authentication Required',
    meaning: 'The client needs to authenticate to gain network access.',
    link: true
  },
  '599': {
    message: 'Network Connect Timeout Error',
    meaning: 'This status code is not specified in any RFCs, but is used by some HTTP proxies to signal a network connect timeout behind the proxy to a client in front of the proxy.',
    link: true
  }
};
