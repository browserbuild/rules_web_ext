const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const crx3_proto =
    require('build_bazel_rules_browserbuild_web_ext_deps/internal/crx3.pb');
const runfiles = require(process.env['BAZEL_NODE_RUNFILES_HELPER']);

const args = process.argv.slice(2);

const testWebExtArtifactPath = runfiles.resolveWorkspaceRelative(
    args[0].replace('build_bazel_rules_web_ext', ''));

function createPrivateKey(filepath) {
  return crypto.createPrivateKey(fs.readFileSync(filepath, 'utf8'));
}

describe('web_ext', () => {
  it('creates an artifact directory after the rule name', () => {
    expect(args[0]).toEqual(
        'build_bazel_rules_web_ext/internal/web_ext/test/test_rsa_web_ext.artifact');
  });

  describe('crx', () => {
    const rsa_filepath = runfiles.resolveWorkspaceRelative(
        args[1].replace('build_bazel_rules_web_ext', ''));
    const ecdsa_filepath = runfiles.resolveWorkspaceRelative(
      args[4].replace('build_bazel_rules_web_ext', ''));

    it('creates a CRX package after the rule name', () => {
      expect(fs.existsSync(rsa_filepath)).toBe(true);
      expect(fs.existsSync(ecdsa_filepath)).toBe(true);
    });

    it('validates the CRX package signature', () => {
      function validateCrx(data, privateKeyObject) {
        // Validate the CRX magic number
        expect(data.slice(0, 4).toString()).toEqual('Cr24');

        // Validate the CRX version
        expect(data.slice(4, 8).readUInt32LE(0)).toEqual(3);

        let headerSize = data.slice(8, 12).readUInt32LE(0);
        let header = data.slice(12, headerSize + 12);

        const fileHeader = crx3_proto.crx_file.CrxFileHeader.decode(header);

        let sizeOctets = Buffer.alloc(4);
        sizeOctets.writeUInt32LE(fileHeader.signedHeaderData.length, 0);

        const publicKeyObject = crypto.createPublicKey({key : privateKeyObject});

        const publicKey = publicKeyObject.export({type : 'spki', format : 'der'});

        const keyPairType = privateKeyObject.asymmetricKeyType === 'rsa'
          ? 'sha256WithRsa'
          : 'sha256WithEcdsa';

        expect(fileHeader[keyPairType].length).toBeGreaterThan(0);

        fileHeader[keyPairType].forEach((keyProof) => {
          expect(publicKey.equals(keyProof.publicKey)).toBe(true);

          // Verify the CRX signature
          const verify = crypto.createVerify('sha256')
            .update(Buffer.from('CRX3 SignedData\x00', 'utf8'))
            .update(sizeOctets)
            .update(fileHeader.signedHeaderData)
            .update(data.slice(header.length + 12))
            .verify(privateKeyObject, keyProof.signature)

          expect(verify).toBe(true);
        });
      }

      const rsa_data = fs.readFileSync(rsa_filepath);
      const rsa_privateKeyObject = createPrivateKey(runfiles.resolveWorkspaceRelative(
        args[6].replace('build_bazel_rules_web_ext', '')));

      expect(rsa_privateKeyObject.asymmetricKeyType).toEqual('rsa');

      validateCrx(rsa_data, rsa_privateKeyObject);

      const ecdsa_data = fs.readFileSync(ecdsa_filepath);
      const ecdsa_privateKeyObject = createPrivateKey(runfiles.resolveWorkspaceRelative(
        args[7].replace('build_bazel_rules_web_ext', '')));

      expect(ecdsa_privateKeyObject.asymmetricKeyType).toEqual('ec');

      validateCrx(ecdsa_data, ecdsa_privateKeyObject);
    });
  });

  it('creates a zip package after the rule name', () => {
    const filepath = runfiles.resolveWorkspaceRelative(
        args[3].replace('build_bazel_rules_web_ext', ''));
    expect(fs.existsSync(filepath)).toBe(true);
  });

  it('copies files', () => {
    const filepath = path.join(testWebExtArtifactPath, 'static_file');
    const data = fs.readFileSync(filepath, 'utf-8').trim();
    expect(data).toEqual('content');
  });

  it('copies files', () => {
    const filepath = path.join(testWebExtArtifactPath, 'foo.js');
    const data = fs.readFileSync(filepath, 'utf-8').trim();
    expect(data).toEqual('console.log("hello world");');
  });

  it('copies files from subdirectories', () => {
    const filepath =
        path.join(testWebExtArtifactPath, 'subdirectory', 'data.json');
    const data = fs.readFileSync(filepath, 'utf-8').trim();
    expect(data).toEqual('[]');
  });

  it('copies and renames the manifest.json file to the root directory', () => {
    const filepath = path.join(testWebExtArtifactPath, 'manifest.json');
    expect(fs.existsSync(filepath)).toBe(true);
  });
});
