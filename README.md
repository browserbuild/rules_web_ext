# rules_web_ext

Package web extensions with Bazel

[![CI](https://github.com/browserbuild/rules_web_ext/workflows/CI/badge.svg?branch=master)](https://github.com/browserbuild/rules_web_ext/actions)

## Documentation

* [Setup](#setup)
* [Example](#example)
* [web_ext](#web_ext)

## Setup

```bzl
http_archive(
    name = "build_bazel_rules_web_ext",
    sha256 = "aca8e53ad9aa7be5eab2a7be3f3344af2d22269d92cfb75c21ad17d726f3020f",
    strip_prefix = "rules_web_ext-0.2.0",
    url = "https://github.com/browserbuild/rules_web_ext/archive/0.2.0.tar.gz",
)

load("@build_bazel_rules_web_ext//:package.bzl", "rules_browserbuild_dependencies")

rules_browserbuild_dependencies()

load("@build_bazel_rules_web_ext//:index.bzl", "browserbuild_setup_workspace")

browserbuild_setup_workspace()
```

## Example

```bzl
load("@build_bazel_rules_web_ext//:index.bzl", "web_ext")

web_ext(
    name = "my_web_ext",
    srcs = [
        ":app",
        ":options",
        ":background_script",
        ":sass_styles"
    ],
    crx_key = ":key.pem",
    manifest = ":manifest.json",
)
```


## web_ext

<pre>
web_ext(<a href="#web_ext-name">name</a>, <a href="#web_ext-compression">compression</a>, <a href="#web_ext-crx_key">crx_key</a>, <a href="#web_ext-manifest">manifest</a>, <a href="#web_ext-srcs">srcs</a>, <a href="#web_ext-strip_prefix">strip_prefix</a>, <a href="#web_ext-zip">zip</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="web_ext-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/docs/build-ref.html#name">Name</a> | required |  |
| <a id="web_ext-compression"></a>compression |  An integer. The ZIP compression level (0-9).   | Integer | optional | 1 |
| <a id="web_ext-crx_key"></a>crx_key |  A label. The private key file (RSA or ECDSA using the NIST P-256 curve) to sign the CRX package. If absent, no CRX package will be created.   | <a href="https://bazel.build/docs/build-ref.html#labels">Label</a> | optional | None |
| <a id="web_ext-manifest"></a>manifest |  A label. The manifest.json file.   | <a href="https://bazel.build/docs/build-ref.html#labels">Label</a> | required |  |
| <a id="web_ext-srcs"></a>srcs |  A list of labels. Source files to be added to the package.   | <a href="https://bazel.build/docs/build-ref.html#labels">List of labels</a> | optional | [] |
| <a id="web_ext-strip_prefix"></a>strip_prefix |  A string. Path to be removed from the root directory relative to the package.   | String | optional | "/" |
| <a id="web_ext-zip"></a>zip |  A boolean. Whether to create a zip package.   | Boolean | optional | True |
