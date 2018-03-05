'use strict';

const common = require('../common');
// The doctool currently uses js-yaml from the tool/eslint/ tree.
try {
  require('../../tools/eslint/node_modules/js-yaml');
} catch (e) {
  common.skip('missing js-yaml (eslint not present)');
}

const assert = require('assert');
const fs = require('fs');
const fixtures = require('../common/fixtures');
const json = require('../../tools/doc/json.js');

// Outputs valid json with the expected fields when given simple markdown
// Test data is a list of objects with two properties.
// The file property is the file path.
// The json property is some json which will be generated by the doctool.
const testData = [
  {
    file: fixtures.path('sample_document.md'),
    json: {
      source: 'foo',
      modules: [{
        textRaw: 'Sample Markdown',
        name: 'sample_markdown',
        modules: [{
          textRaw: 'Seussian Rhymes',
          name: 'seussian_rhymes',
          desc: '<ol>\n<li>fish</li>\n<li><p>fish</p>\n</li>\n<li>' +
                  '<p>Red fish</p>\n</li>\n<li>Blue fish</li>\n</ol>\n',
          type: 'module',
          displayName: 'Seussian Rhymes'
        }],
        type: 'module',
        displayName: 'Sample Markdown'
      }]
    }
  },
  {
    file: fixtures.path('order_of_end_tags_5873.md'),
    json: {
      source: 'foo',
      modules: [{
        textRaw: 'Title',
        name: 'title',
        modules: [{
          textRaw: 'Subsection',
          name: 'subsection',
          classMethods: [{
            textRaw: 'Class Method: Buffer.from(array)',
            type: 'classMethod',
            name: 'from',
            signatures: [
              {
                params: [{
                  textRaw: '`array` {Array} ',
                  name: 'array',
                  type: 'Array'
                }]
              },
              {
                params: [{
                  name: 'array'
                }]
              }
            ]
          }],
          type: 'module',
          displayName: 'Subsection'
        }],
        type: 'module',
        displayName: 'Title'
      }]
    }
  },
  {
    file: fixtures.path('doc_with_yaml.md'),
    json: {
      source: 'foo',
      modules: [
        {
          textRaw: 'Sample Markdown with YAML info',
          name: 'sample_markdown_with_yaml_info',
          modules: [
            {
              textRaw: 'Foobar',
              name: 'foobar',
              meta: {
                added: ['v1.0.0'],
                changes: []
              },
              desc: '<p>Describe <code>Foobar</code> in more detail ' +
                'here.</p>\n',
              type: 'module',
              displayName: 'Foobar'
            },
            {
              textRaw: 'Foobar II',
              name: 'foobar_ii',
              meta: {
                added: ['v5.3.0', 'v4.2.0'],
                changes: [
                  { 'version': 'v4.2.0',
                    'pr-url': 'https://github.com/nodejs/node/pull/3276',
                    'description': 'The `error` parameter can now be ' +
                      'an arrow function.'
                  }
                ]
              },
              desc: '<p>Describe <code>Foobar II</code> in more detail ' +
                'here. fg(1)</p>\n',
              type: 'module',
              displayName: 'Foobar II'
            },
            {
              textRaw: 'Deprecated thingy',
              name: 'deprecated_thingy',
              meta: {
                added: ['v1.0.0'],
                deprecated: ['v2.0.0'],
                changes: []
              },
              desc: '<p>Describe <code>Deprecated thingy</code> in more ' +
                'detail here. fg(1p)</p>\n',
              type: 'module',
              displayName: 'Deprecated thingy'
            },
            {
              textRaw: 'Something',
              name: 'something',
              desc: '<!-- This is not a metadata comment -->\n<p>' +
                'Describe <code>Something</code> in more detail here.</p>\n',
              type: 'module',
              displayName: 'Something'
            }
          ],
          type: 'module',
          displayName: 'Sample Markdown with YAML info'
        }
      ]
    }
  }
];

testData.forEach((item) => {
  fs.readFile(item.file, 'utf8', common.mustCall((err, input) => {
    assert.ifError(err);
    json(input, 'foo', common.mustCall((err, output) => {
      assert.ifError(err);
      assert.deepStrictEqual(output, item.json);
    }));
  }));
});
