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

const child_process = require('child_process');
const fs = require('fs');
const minimist = require('minimist');

// Parsed array arguments from argv
const args = minimist(process.argv.slice(2));

if (typeof args.o === 'undefined') {
  console.error('-o is undefined');
  process.exit(1);
} else if (args.o === '') {
  console.error('-o is empty');
  process.exit(1);
}

const artifactPath = args._;

const zipProcess = child_process.spawnSync(
    'zip', [ '-' + args.c, '-q', '-r', '-', '.' ],
    Object.assign(
        {cwd : artifactPath[0], stdio : [ 'inherit', 'pipe', 'inherit' ], maxBuffer : process.env.WEB_EXT_MAX_BUFFER
              ? Number(process.env.WEB_EXT_MAX_BUFFER) : 4e+6}));

fs.writeFileSync(args.o, zipProcess.stdout);
