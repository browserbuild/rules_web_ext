/**
 * @license
 * Copyright 2020 github.com/browserbuild. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const minimist = require('minimist');
const path = require('path');

// Parsed array arguments from argv.
const args = minimist(process.argv.slice(2));

if (typeof args.o === 'undefined') {
  console.error('-o is undefined');
  process.exit(1);
} else if (args.o === '') {
  console.error('-o is empty');
  process.exit(1);
} else if (!fs.existsSync(args.o)) {
  fs.mkdirSync(args.o);
}

const flags = JSON.parse(fs.readFileSync(args._[0], 'utf8'));

flags.files.forEach((file) => {
  let dest = path.join(args.o, path.dirname(file.output));

  if (!fs.existsSync(dest)) {
    dest.split(path.sep).reduce((current, dir) => {
      current += path.join(dir, path.sep);

      if (!fs.existsSync(current)) {
        fs.mkdirSync(current);
      }

      return current;
    }, '');
  }

  fs.copyFileSync(file.input, path.join(args.o, file.output));
});
