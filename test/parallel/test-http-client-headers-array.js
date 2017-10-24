'use strict';

require('../common');

const assert = require('assert');
const http = require('http');

function execute(options) {
  http.createServer(function(req, res) {
    const expectHeaders = {
      'x-foo': 'boom',
      cookie: 'a=1; b=2; c=3',
      connection: 'close'
    };

    // no Host header when you set headers an array
    if (!Array.isArray(options.headers)) {
      expectHeaders.host = `localhost:${this.address().port}`;
    }

    // no Authorization header when you set headers an array
    if (options.auth && !Array.isArray(options.headers)) {
      expectHeaders.authorization =
          `Basic ${Buffer.from(options.auth).toString('base64')}`;
    }

    this.close();

    assert.deepStrictEqual(req.headers, expectHeaders);

    res.end();
  }).listen(0, function() {
    options = Object.assign(options, {
      port: this.address().port,
      path: '/'
    });
    const req = http.request(options);
    req.end();
  });
}

// should be the same except for implicit Host header on the first two
execute({ headers: { 'x-foo': 'boom', 'cookie': 'a=1; b=2; c=3' } });
execute({ headers: { 'x-foo': 'boom', 'cookie': [ 'a=1', 'b=2', 'c=3' ] } });
execute({ headers: [[ 'x-foo', 'boom' ], [ 'cookie', 'a=1; b=2; c=3' ]] });
execute({ headers: [
  [ 'x-foo', 'boom' ], [ 'cookie', [ 'a=1', 'b=2', 'c=3' ]]
] });
execute({ headers: [
  [ 'x-foo', 'boom' ], [ 'cookie', 'a=1' ],
  [ 'cookie', 'b=2' ], [ 'cookie', 'c=3']
] });

// Authorization and Host header both missing from the second
execute({ auth: 'foo:bar', headers:
  { 'x-foo': 'boom', 'cookie': 'a=1; b=2; c=3' } });
execute({ auth: 'foo:bar', headers: [
  [ 'x-foo', 'boom' ], [ 'cookie', 'a=1' ],
  [ 'cookie', 'b=2' ], [ 'cookie', 'c=3']
] });
