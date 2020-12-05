/**
 * @license
 * Copyright 2020 github.com/browserbuild. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const child_process = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const minimist = require('minimist');
const crx3_proto = require('./crx3.pb');

// CRX ID (16 bytes)
const CRX_ID_SIZE = 16;

// Parsed array arguments from argv
const args = minimist(process.argv.slice(2));

if (typeof args.o === 'undefined') {
  console.error('-o is undefined');
  process.exit(1);
} else if (args.o === '') {
  console.error('-o is empty');
  process.exit(1);
} else if (typeof args.key === 'undefined') {
  console.error('--key is undefined');
  process.exit(1);
} else if (args.key === '') {
  console.error('--key is empty');
  process.exit(1);
}

const artifactPath = args._;

const zipProcess = child_process.spawnSync(
    'zip', [ '-' + args.c, '-q', '-r', '-', '.' ],
    Object.assign(
        {cwd : artifactPath[0], stdio : [ 'inherit', 'pipe', 'inherit' ], maxBuffer : process.env.WEB_EXT_MAX_BUFFER
                ? Number(process.env.WEB_EXT_MAX_BUFFER) : 4e+6}));

const privateKeyObject =
    crypto.createPrivateKey(fs.readFileSync(args.key, 'utf8'));

if (privateKeyObject.type !== 'private') {
  console.error("Error: Not a valid key type (expected key type \"private\")");
  process.exit(1);
} else if (privateKeyObject.asymmetricKeyType !== 'rsa' &&
           privateKeyObject.asymmetricKeyType !== 'ec') {
  console.error(
      "Error: Not a valid private key type. Allowed private key types are \"rsa\" (RSA) or \"ec\" (ECDSA). Found \"" +
      privateKeyObject.asymmetricKeyType + "\"");
  process.exit(1);
}

const privateKey = privateKeyObject.export({type : 'pkcs8', format : 'pem'});

const publicKeyObject = crypto.createPublicKey({key : privateKeyObject});

const publicKey = publicKeyObject.export({type : 'spki', format : 'der'});

const crxSignedData =
    crx3_proto.crx_file.SignedData
        .encode(new crx3_proto.crx_file.SignedData({
          crxId : crypto.createHash('sha256').update(publicKey).digest().slice(
              0, CRX_ID_SIZE)
        }))
        .finish();

let sizeOctets = Buffer.allocUnsafe(4);
sizeOctets.writeUInt32LE(crxSignedData.length, 0);

let signature = crypto.createSign('sha256')
                    .update(Buffer.from('CRX3 SignedData\x00', 'utf8'))
                    .update(sizeOctets)
                    .update(crxSignedData)
                    .update(zipProcess.stdout)
                    .sign(privateKey);

const keyPairType = privateKeyObject.asymmetricKeyType === 'rsa'
                        ? 'sha256WithRsa'
                        : 'sha256WithEcdsa';

// CRX Header containing the asymmetric key proof
const crxFileHeader = crx3_proto.crx_file.CrxFileHeader
                          .encode(new crx3_proto.crx_file.CrxFileHeader({
                            [keyPairType] : [ {signature, publicKey} ],
                            signedHeaderData : crxSignedData
                          }))
                          .finish();

// CRX magic number ("Cr24")
const crxMagic = Buffer.from('Cr24', 'utf8');

// CRX version (3)
const crxVersion = Buffer.from([ 3, 0, 0, 0 ]);

let data = Buffer.allocUnsafe(crxMagic.length + crxVersion.length + 4 +
                              crxFileHeader.length +
                              zipProcess.stdout.length);

let offset = 0;

crxMagic.copy(data, 0);
crxVersion.copy(data, offset += crxMagic.length);

// The length of the header section
data.writeUInt32LE(crxFileHeader.length, offset += crxVersion.length);

crxFileHeader.copy(data, offset += 4);
zipProcess.stdout.copy(data, offset + crxFileHeader.length);

fs.writeFileSync(args.o, data);
