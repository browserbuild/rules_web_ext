/*eslint-disable block-scoped-var, id-length, no-control-regex,
 * no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var,
 * sort-vars*/
(function(global, factory) { /* global define, require, module */
module.exports = factory(require("protobufjs/minimal"));
})(this, function($protobuf) {
"use strict";

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer,
    $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.crx_file = (function() {
  /**
   * Namespace crx_file.
   * @exports crx_file
   * @namespace
   */
  var crx_file = {};

  crx_file.CrxFileHeader = (function() {
    /**
     * Properties of a CrxFileHeader.
     * @memberof crx_file
     * @interface ICrxFileHeader
     * @property {Array.<crx_file.IAsymmetricKeyProof>|null} [sha256WithRsa]
     * CrxFileHeader sha256WithRsa
     * @property {Array.<crx_file.IAsymmetricKeyProof>|null} [sha256WithEcdsa]
     * CrxFileHeader sha256WithEcdsa
     * @property {Uint8Array|null} [signedHeaderData] CrxFileHeader
     * signedHeaderData
     */

    /**
     * Constructs a new CrxFileHeader.
     * @memberof crx_file
     * @classdesc Represents a CrxFileHeader.
     * @implements ICrxFileHeader
     * @constructor
     * @param {crx_file.ICrxFileHeader=} [properties] Properties to set
     */
    function CrxFileHeader(properties) {
      this.sha256WithRsa = [];
      this.sha256WithEcdsa = [];
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrxFileHeader sha256WithRsa.
     * @member {Array.<crx_file.IAsymmetricKeyProof>} sha256WithRsa
     * @memberof crx_file.CrxFileHeader
     * @instance
     */
    CrxFileHeader.prototype.sha256WithRsa = $util.emptyArray;

    /**
     * CrxFileHeader sha256WithEcdsa.
     * @member {Array.<crx_file.IAsymmetricKeyProof>} sha256WithEcdsa
     * @memberof crx_file.CrxFileHeader
     * @instance
     */
    CrxFileHeader.prototype.sha256WithEcdsa = $util.emptyArray;

    /**
     * CrxFileHeader signedHeaderData.
     * @member {Uint8Array} signedHeaderData
     * @memberof crx_file.CrxFileHeader
     * @instance
     */
    CrxFileHeader.prototype.signedHeaderData = $util.newBuffer([]);

    /**
     * Creates a new CrxFileHeader instance using the specified properties.
     * @function create
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {crx_file.ICrxFileHeader=} [properties] Properties to set
     * @returns {crx_file.CrxFileHeader} CrxFileHeader instance
     */
    CrxFileHeader.create = function create(
        properties) { return new CrxFileHeader(properties); };

    /**
     * Encodes the specified CrxFileHeader message. Does not implicitly {@link
     * crx_file.CrxFileHeader.verify|verify} messages.
     * @function encode
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {crx_file.ICrxFileHeader} message CrxFileHeader message or plain
     *     object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrxFileHeader.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.sha256WithRsa != null && message.sha256WithRsa.length)
        for (var i = 0; i < message.sha256WithRsa.length; ++i)
          $root.crx_file.AsymmetricKeyProof
              .encode(message.sha256WithRsa[i],
                      writer.uint32(/* id 2, wireType 2 =*/18).fork())
              .ldelim();
      if (message.sha256WithEcdsa != null && message.sha256WithEcdsa.length)
        for (var i = 0; i < message.sha256WithEcdsa.length; ++i)
          $root.crx_file.AsymmetricKeyProof
              .encode(message.sha256WithEcdsa[i],
                      writer.uint32(/* id 3, wireType 2 =*/26).fork())
              .ldelim();
      if (message.signedHeaderData != null &&
          message.hasOwnProperty("signedHeaderData"))
        writer.uint32(/* id 10000, wireType 2 =*/80002)
            .bytes(message.signedHeaderData);
      return writer;
    };

    /**
     * Encodes the specified CrxFileHeader message, length delimited. Does not
     * implicitly {@link crx_file.CrxFileHeader.verify|verify} messages.
     * @function encodeDelimited
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {crx_file.ICrxFileHeader} message CrxFileHeader message or plain
     *     object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrxFileHeader.encodeDelimited = function encodeDelimited(
        message, writer) { return this.encode(message, writer).ldelim(); };

    /**
     * Decodes a CrxFileHeader message from the specified reader or buffer.
     * @function decode
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @param {number} [length] Message length if known beforehand
     * @returns {crx_file.CrxFileHeader} CrxFileHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrxFileHeader.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.crx_file.CrxFileHeader();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
        case 2:
          if (!(message.sha256WithRsa && message.sha256WithRsa.length))
            message.sha256WithRsa = [];
          message.sha256WithRsa.push($root.crx_file.AsymmetricKeyProof.decode(
              reader, reader.uint32()));
          break;
        case 3:
          if (!(message.sha256WithEcdsa && message.sha256WithEcdsa.length))
            message.sha256WithEcdsa = [];
          message.sha256WithEcdsa.push($root.crx_file.AsymmetricKeyProof.decode(
              reader, reader.uint32()));
          break;
        case 10000:
          message.signedHeaderData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
        }
      }
      return message;
    };

    /**
     * Decodes a CrxFileHeader message from the specified reader or buffer,
     * length delimited.
     * @function decodeDelimited
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @returns {crx_file.CrxFileHeader} CrxFileHeader
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrxFileHeader.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CrxFileHeader message.
     * @function verify
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is
     *     not
     */
    CrxFileHeader.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.sha256WithRsa != null &&
          message.hasOwnProperty("sha256WithRsa")) {
        if (!Array.isArray(message.sha256WithRsa))
          return "sha256WithRsa: array expected";
        for (var i = 0; i < message.sha256WithRsa.length; ++i) {
          var error = $root.crx_file.AsymmetricKeyProof.verify(
              message.sha256WithRsa[i]);
          if (error)
            return "sha256WithRsa." + error;
        }
      }
      if (message.sha256WithEcdsa != null &&
          message.hasOwnProperty("sha256WithEcdsa")) {
        if (!Array.isArray(message.sha256WithEcdsa))
          return "sha256WithEcdsa: array expected";
        for (var i = 0; i < message.sha256WithEcdsa.length; ++i) {
          var error = $root.crx_file.AsymmetricKeyProof.verify(
              message.sha256WithEcdsa[i]);
          if (error)
            return "sha256WithEcdsa." + error;
        }
      }
      if (message.signedHeaderData != null &&
          message.hasOwnProperty("signedHeaderData"))
        if (!(message.signedHeaderData &&
                  typeof message.signedHeaderData.length === "number" ||
              $util.isString(message.signedHeaderData)))
          return "signedHeaderData: buffer expected";
      return null;
    };

    /**
     * Creates a CrxFileHeader message from a plain object. Also converts values
     * to their respective internal types.
     * @function fromObject
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {crx_file.CrxFileHeader} CrxFileHeader
     */
    CrxFileHeader.fromObject = function fromObject(object) {
      if (object instanceof $root.crx_file.CrxFileHeader)
        return object;
      var message = new $root.crx_file.CrxFileHeader();
      if (object.sha256WithRsa) {
        if (!Array.isArray(object.sha256WithRsa))
          throw TypeError(
              ".crx_file.CrxFileHeader.sha256WithRsa: array expected");
        message.sha256WithRsa = [];
        for (var i = 0; i < object.sha256WithRsa.length; ++i) {
          if (typeof object.sha256WithRsa[i] !== "object")
            throw TypeError(
                ".crx_file.CrxFileHeader.sha256WithRsa: object expected");
          message.sha256WithRsa[i] =
              $root.crx_file.AsymmetricKeyProof.fromObject(
                  object.sha256WithRsa[i]);
        }
      }
      if (object.sha256WithEcdsa) {
        if (!Array.isArray(object.sha256WithEcdsa))
          throw TypeError(
              ".crx_file.CrxFileHeader.sha256WithEcdsa: array expected");
        message.sha256WithEcdsa = [];
        for (var i = 0; i < object.sha256WithEcdsa.length; ++i) {
          if (typeof object.sha256WithEcdsa[i] !== "object")
            throw TypeError(
                ".crx_file.CrxFileHeader.sha256WithEcdsa: object expected");
          message.sha256WithEcdsa[i] =
              $root.crx_file.AsymmetricKeyProof.fromObject(
                  object.sha256WithEcdsa[i]);
        }
      }
      if (object.signedHeaderData != null)
        if (typeof object.signedHeaderData === "string")
          $util.base64.decode(object.signedHeaderData,
                              message.signedHeaderData = $util.newBuffer(
                                  $util.base64.length(object.signedHeaderData)),
                              0);
        else if (object.signedHeaderData.length)
          message.signedHeaderData = object.signedHeaderData;
      return message;
    };

    /**
     * Creates a plain object from a CrxFileHeader message. Also converts values
     * to other types if specified.
     * @function toObject
     * @memberof crx_file.CrxFileHeader
     * @static
     * @param {crx_file.CrxFileHeader} message CrxFileHeader
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CrxFileHeader.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      var object = {};
      if (options.arrays || options.defaults) {
        object.sha256WithRsa = [];
        object.sha256WithEcdsa = [];
      }
      if (options.defaults)
        if (options.bytes === String)
          object.signedHeaderData = "";
        else {
          object.signedHeaderData = [];
          if (options.bytes !== Array)
            object.signedHeaderData = $util.newBuffer(object.signedHeaderData);
        }
      if (message.sha256WithRsa && message.sha256WithRsa.length) {
        object.sha256WithRsa = [];
        for (var j = 0; j < message.sha256WithRsa.length; ++j)
          object.sha256WithRsa[j] = $root.crx_file.AsymmetricKeyProof.toObject(
              message.sha256WithRsa[j], options);
      }
      if (message.sha256WithEcdsa && message.sha256WithEcdsa.length) {
        object.sha256WithEcdsa = [];
        for (var j = 0; j < message.sha256WithEcdsa.length; ++j)
          object.sha256WithEcdsa[j] =
              $root.crx_file.AsymmetricKeyProof.toObject(
                  message.sha256WithEcdsa[j], options);
      }
      if (message.signedHeaderData != null &&
          message.hasOwnProperty("signedHeaderData"))
        object.signedHeaderData =
            options.bytes === String
                ? $util.base64.encode(message.signedHeaderData, 0,
                                      message.signedHeaderData.length)
                : options.bytes === Array
                      ? Array.prototype.slice.call(message.signedHeaderData)
                      : message.signedHeaderData;
      return object;
    };

    /**
     * Converts this CrxFileHeader to JSON.
     * @function toJSON
     * @memberof crx_file.CrxFileHeader
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CrxFileHeader.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CrxFileHeader;
  })();

  crx_file.AsymmetricKeyProof = (function() {
    /**
     * Properties of an AsymmetricKeyProof.
     * @memberof crx_file
     * @interface IAsymmetricKeyProof
     * @property {Uint8Array|null} [publicKey] AsymmetricKeyProof publicKey
     * @property {Uint8Array|null} [signature] AsymmetricKeyProof signature
     */

    /**
     * Constructs a new AsymmetricKeyProof.
     * @memberof crx_file
     * @classdesc Represents an AsymmetricKeyProof.
     * @implements IAsymmetricKeyProof
     * @constructor
     * @param {crx_file.IAsymmetricKeyProof=} [properties] Properties to set
     */
    function AsymmetricKeyProof(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
    }

    /**
     * AsymmetricKeyProof publicKey.
     * @member {Uint8Array} publicKey
     * @memberof crx_file.AsymmetricKeyProof
     * @instance
     */
    AsymmetricKeyProof.prototype.publicKey = $util.newBuffer([]);

    /**
     * AsymmetricKeyProof signature.
     * @member {Uint8Array} signature
     * @memberof crx_file.AsymmetricKeyProof
     * @instance
     */
    AsymmetricKeyProof.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new AsymmetricKeyProof instance using the specified properties.
     * @function create
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {crx_file.IAsymmetricKeyProof=} [properties] Properties to set
     * @returns {crx_file.AsymmetricKeyProof} AsymmetricKeyProof instance
     */
    AsymmetricKeyProof.create = function create(
        properties) { return new AsymmetricKeyProof(properties); };

    /**
     * Encodes the specified AsymmetricKeyProof message. Does not
     * implicitly {@link crx_file.AsymmetricKeyProof.verify|verify} messages.
     * @function encode
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {crx_file.IAsymmetricKeyProof} message AsymmetricKeyProof message
     *     or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AsymmetricKeyProof.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.publicKey != null && message.hasOwnProperty("publicKey"))
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
      if (message.signature != null && message.hasOwnProperty("signature"))
        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
      return writer;
    };

    /**
     * Encodes the specified AsymmetricKeyProof message, length delimited. Does
     * not implicitly {@link crx_file.AsymmetricKeyProof.verify|verify}
     * messages.
     * @function encodeDelimited
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {crx_file.IAsymmetricKeyProof} message AsymmetricKeyProof message
     *     or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AsymmetricKeyProof.encodeDelimited = function encodeDelimited(
        message, writer) { return this.encode(message, writer).ldelim(); };

    /**
     * Decodes an AsymmetricKeyProof message from the specified reader or
     * buffer.
     * @function decode
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @param {number} [length] Message length if known beforehand
     * @returns {crx_file.AsymmetricKeyProof} AsymmetricKeyProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AsymmetricKeyProof.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.crx_file.AsymmetricKeyProof();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
        case 1:
          message.publicKey = reader.bytes();
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
        }
      }
      return message;
    };

    /**
     * Decodes an AsymmetricKeyProof message from the specified reader or
     * buffer, length delimited.
     * @function decodeDelimited
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @returns {crx_file.AsymmetricKeyProof} AsymmetricKeyProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AsymmetricKeyProof.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AsymmetricKeyProof message.
     * @function verify
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is
     *     not
     */
    AsymmetricKeyProof.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.publicKey != null && message.hasOwnProperty("publicKey"))
        if (!(message.publicKey &&
                  typeof message.publicKey.length === "number" ||
              $util.isString(message.publicKey)))
          return "publicKey: buffer expected";
      if (message.signature != null && message.hasOwnProperty("signature"))
        if (!(message.signature &&
                  typeof message.signature.length === "number" ||
              $util.isString(message.signature)))
          return "signature: buffer expected";
      return null;
    };

    /**
     * Creates an AsymmetricKeyProof message from a plain object. Also converts
     * values to their respective internal types.
     * @function fromObject
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {crx_file.AsymmetricKeyProof} AsymmetricKeyProof
     */
    AsymmetricKeyProof.fromObject = function fromObject(object) {
      if (object instanceof $root.crx_file.AsymmetricKeyProof)
        return object;
      var message = new $root.crx_file.AsymmetricKeyProof();
      if (object.publicKey != null)
        if (typeof object.publicKey === "string")
          $util.base64.decode(object.publicKey,
                              message.publicKey = $util.newBuffer(
                                  $util.base64.length(object.publicKey)),
                              0);
        else if (object.publicKey.length)
          message.publicKey = object.publicKey;
      if (object.signature != null)
        if (typeof object.signature === "string")
          $util.base64.decode(object.signature,
                              message.signature = $util.newBuffer(
                                  $util.base64.length(object.signature)),
                              0);
        else if (object.signature.length)
          message.signature = object.signature;
      return message;
    };

    /**
     * Creates a plain object from an AsymmetricKeyProof message. Also converts
     * values to other types if specified.
     * @function toObject
     * @memberof crx_file.AsymmetricKeyProof
     * @static
     * @param {crx_file.AsymmetricKeyProof} message AsymmetricKeyProof
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AsymmetricKeyProof.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      var object = {};
      if (options.defaults) {
        if (options.bytes === String)
          object.publicKey = "";
        else {
          object.publicKey = [];
          if (options.bytes !== Array)
            object.publicKey = $util.newBuffer(object.publicKey);
        }
        if (options.bytes === String)
          object.signature = "";
        else {
          object.signature = [];
          if (options.bytes !== Array)
            object.signature = $util.newBuffer(object.signature);
        }
      }
      if (message.publicKey != null && message.hasOwnProperty("publicKey"))
        object.publicKey =
            options.bytes === String
                ? $util.base64.encode(message.publicKey, 0,
                                      message.publicKey.length)
                : options.bytes === Array
                      ? Array.prototype.slice.call(message.publicKey)
                      : message.publicKey;
      if (message.signature != null && message.hasOwnProperty("signature"))
        object.signature =
            options.bytes === String
                ? $util.base64.encode(message.signature, 0,
                                      message.signature.length)
                : options.bytes === Array
                      ? Array.prototype.slice.call(message.signature)
                      : message.signature;
      return object;
    };

    /**
     * Converts this AsymmetricKeyProof to JSON.
     * @function toJSON
     * @memberof crx_file.AsymmetricKeyProof
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AsymmetricKeyProof.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AsymmetricKeyProof;
  })();

  crx_file.SignedData = (function() {
    /**
     * Properties of a SignedData.
     * @memberof crx_file
     * @interface ISignedData
     * @property {Uint8Array|null} [crxId] SignedData crxId
     */

    /**
     * Constructs a new SignedData.
     * @memberof crx_file
     * @classdesc Represents a SignedData.
     * @implements ISignedData
     * @constructor
     * @param {crx_file.ISignedData=} [properties] Properties to set
     */
    function SignedData(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
    }

    /**
     * SignedData crxId.
     * @member {Uint8Array} crxId
     * @memberof crx_file.SignedData
     * @instance
     */
    SignedData.prototype.crxId = $util.newBuffer([]);

    /**
     * Creates a new SignedData instance using the specified properties.
     * @function create
     * @memberof crx_file.SignedData
     * @static
     * @param {crx_file.ISignedData=} [properties] Properties to set
     * @returns {crx_file.SignedData} SignedData instance
     */
    SignedData.create = function create(
        properties) { return new SignedData(properties); };

    /**
     * Encodes the specified SignedData message. Does not implicitly {@link
     * crx_file.SignedData.verify|verify} messages.
     * @function encode
     * @memberof crx_file.SignedData
     * @static
     * @param {crx_file.ISignedData} message SignedData message or plain object
     *     to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignedData.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.crxId != null && message.hasOwnProperty("crxId"))
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.crxId);
      return writer;
    };

    /**
     * Encodes the specified SignedData message, length delimited. Does not
     * implicitly {@link crx_file.SignedData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof crx_file.SignedData
     * @static
     * @param {crx_file.ISignedData} message SignedData message or plain object
     *     to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignedData.encodeDelimited = function encodeDelimited(
        message, writer) { return this.encode(message, writer).ldelim(); };

    /**
     * Decodes a SignedData message from the specified reader or buffer.
     * @function decode
     * @memberof crx_file.SignedData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @param {number} [length] Message length if known beforehand
     * @returns {crx_file.SignedData} SignedData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignedData.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.crx_file.SignedData();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
        case 1:
          message.crxId = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
        }
      }
      return message;
    };

    /**
     * Decodes a SignedData message from the specified reader or buffer, length
     * delimited.
     * @function decodeDelimited
     * @memberof crx_file.SignedData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode
     *     from
     * @returns {crx_file.SignedData} SignedData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignedData.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SignedData message.
     * @function verify
     * @memberof crx_file.SignedData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is
     *     not
     */
    SignedData.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.crxId != null && message.hasOwnProperty("crxId"))
        if (!(message.crxId && typeof message.crxId.length === "number" ||
              $util.isString(message.crxId)))
          return "crxId: buffer expected";
      return null;
    };

    /**
     * Creates a SignedData message from a plain object. Also converts values to
     * their respective internal types.
     * @function fromObject
     * @memberof crx_file.SignedData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {crx_file.SignedData} SignedData
     */
    SignedData.fromObject = function fromObject(object) {
      if (object instanceof $root.crx_file.SignedData)
        return object;
      var message = new $root.crx_file.SignedData();
      if (object.crxId != null)
        if (typeof object.crxId === "string")
          $util.base64.decode(object.crxId,
                              message.crxId = $util.newBuffer(
                                  $util.base64.length(object.crxId)),
                              0);
        else if (object.crxId.length)
          message.crxId = object.crxId;
      return message;
    };

    /**
     * Creates a plain object from a SignedData message. Also converts values to
     * other types if specified.
     * @function toObject
     * @memberof crx_file.SignedData
     * @static
     * @param {crx_file.SignedData} message SignedData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SignedData.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      var object = {};
      if (options.defaults)
        if (options.bytes === String)
          object.crxId = "";
        else {
          object.crxId = [];
          if (options.bytes !== Array)
            object.crxId = $util.newBuffer(object.crxId);
        }
      if (message.crxId != null && message.hasOwnProperty("crxId"))
        object.crxId =
            options.bytes === String
                ? $util.base64.encode(message.crxId, 0, message.crxId.length)
                : options.bytes === Array
                      ? Array.prototype.slice.call(message.crxId)
                      : message.crxId;
      return object;
    };

    /**
     * Converts this SignedData to JSON.
     * @function toJSON
     * @memberof crx_file.SignedData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SignedData.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SignedData;
  })();

  return crx_file;
})();

return $root;
});
