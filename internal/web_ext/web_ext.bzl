# Copyright 2020 github.com/browserbuild. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Web extension rule"""

load("@bazel_tools//tools/build_defs/pkg:path.bzl", "compute_data_path", "dest_path")

def _quote(filename, protect = "="):
    return filename.replace("\\", "\\\\").replace(protect, "\\" + protect)

def _create_artifact(ctx, inputs, arg_file):
    args = ctx.actions.args()
    args.add(arg_file.path)
    args.add("-o", ctx.outputs.artifact.path)

    ctx.actions.run(
        executable = ctx.executable._build_artifact,
        inputs = inputs,
        outputs = [ctx.outputs.artifact],
        arguments = [args],
    )

def _create_crx(ctx):
    path = ctx.actions.declare_file("%s.crx" % ctx.label.name)

    args = ctx.actions.args()
    args.add(ctx.outputs.artifact.path)
    args.add("-o", path)
    args.add("-c", ctx.attr.compression)
    args.add("--key", ctx.file.crx_key)

    ctx.actions.run(
        mnemonic = "PackageCrx",
        executable = ctx.executable._build_crx,
        inputs = [ctx.file.crx_key] + [ctx.outputs.artifact],
        outputs = [path],
        arguments = [args],
        use_default_shell_env = True,
    )

    return path

def _create_zip(ctx):
    path = ctx.actions.declare_file("%s.zip" % ctx.label.name)

    args = ctx.actions.args()
    args.add(ctx.outputs.artifact.path)
    args.add("-o", path)
    args.add("-c", ctx.attr.compression)

    ctx.actions.run(
        mnemonic = "PackageZip",
        executable = ctx.executable._build_zip,
        inputs = [ctx.outputs.artifact],
        outputs = [path],
        arguments = [args],
        use_default_shell_env = True,
    )

    return path

def _web_ext_impl(ctx):
    data_path = compute_data_path(ctx.outputs.artifact, ctx.attr.strip_prefix)

    flags = [struct(input = _quote(ctx.file.manifest.path), output = "manifest.json")]

    for f in ctx.files.srcs[:]:
        flags += [struct(input = _quote(f.path), output = dest_path(f, data_path))]

    json = struct(files = flags)

    arg_file = ctx.actions.declare_file(ctx.label.name + ".flags.json")
    ctx.actions.write(arg_file, json.to_json())

    inputs = ctx.files.srcs[:] + [ctx.file.manifest] + [arg_file]
    outputs = [ctx.outputs.artifact]

    _create_artifact(ctx, inputs, arg_file)

    if ctx.file.crx_key != None:
        path = _create_crx(ctx)
        outputs.append(path)

    if ctx.attr.zip:
        path = _create_zip(ctx)
        outputs.append(path)

    return DefaultInfo(files = depset(outputs))

_COMPRESSION_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

_COMPRESSION_LEVEL_DEFAULT = 1

_BROWSER_EXTENSION_ATTRS = {
    "compression": attr.int(
        doc = """An integer. The ZIP compression level (0-9).""",
        values = _COMPRESSION_LEVELS,
        default = _COMPRESSION_LEVEL_DEFAULT,
    ),
    "crx_key": attr.label(
        doc = """A label. The private key file (RSA or ECDSA using the NIST P-256 curve) to sign the CRX package.
If absent, no CRX package will be created.""",
        default = None,
        allow_single_file = True,
    ),
    "manifest": attr.label(
        doc = "A label. The manifest.json file.",
        allow_single_file = [".json"],
        mandatory = True,
    ),
    "srcs": attr.label_list(
        doc = "A list of labels. Source files to be added to the package.",
        allow_files = True,
    ),
    "strip_prefix": attr.string(
        doc = "A string. Path to be removed from the root directory relative to the package.",
        default = "/",
    ),
    "zip": attr.bool(
        doc = "A boolean. Whether to create a zip package.",
        default = True,
    ),
    "_build_artifact": attr.label(
        default = Label("@build_bazel_rules_web_ext//internal/web_ext:build_artifact"),
        cfg = "exec",
        executable = True,
        allow_files = True,
    ),
    "_build_crx": attr.label(
        default = Label("@build_bazel_rules_web_ext//internal/web_ext:crx_bin"),
        cfg = "exec",
        executable = True,
    ),
    "_build_zip": attr.label(
        default = Label("@build_bazel_rules_web_ext//internal/web_ext:zip_bin"),
        cfg = "exec",
        executable = True,
    ),
}

web_ext = rule(
    implementation = _web_ext_impl,
    attrs = _BROWSER_EXTENSION_ATTRS,
    outputs = {
        "artifact": "%{name}.artifact",
    },
    executable = False,
)
