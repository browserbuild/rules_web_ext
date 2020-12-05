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

"""Repository rule implementations for WORKSPACE to use."""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def rules_browserbuild_dependencies():
    """Macro to include Browser Extension dependencies in a WORKSPACE."""

    if "build_bazel_rules_nodejs" not in native.existing_rules():
        http_archive(
            name = "build_bazel_rules_nodejs",
            sha256 = "452bef42c4b2fbe0f509a2699ffeb3ae2c914087736b16314dbd356f3641d7e5",
            urls = [
                "https://github.com/bazelbuild/rules_nodejs/releases/download/2.3.0/rules_nodejs-2.3.0.tar.gz",
                "https://mirror.bazel.build/github.com/bazelbuild/rules_nodejs/releases/download/2.3.0/rules_nodejs-2.3.0.tar.gz",
            ],
        )

    if "bazel_skylib" not in native.existing_rules():
        http_archive(
            name = "bazel_skylib",
            sha256 = "afbe4d9d033c007940acd24bb9becf1580a0280ae0b2ebbb5a7cb12912d2c115",
            strip_prefix = "bazel-skylib-ffad33e9bfc60bdfa98292ca655a4e7035792046",
            urls = [
                "https://github.com/bazelbuild/bazel-skylib/archive/ffad33e9bfc60bdfa98292ca655a4e7035792046.tar.gz",
                "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/archive/ffad33e9bfc60bdfa98292ca655a4e7035792046.tar.gz",
            ],
        )

def rules_browserbuild_dev_dependencies():
    """
    Fetch dependencies needed for local development, but not needed by users.

    These are in this file to keep version information in one place, and make the WORKSPACE
    shorter.
    """

    if "io_bazel_stardoc" not in native.existing_rules():
        http_archive(
            name = "io_bazel_stardoc",
            sha256 = "aa0c0785d971841c26bc5ef842ef965fe9859f55de69044c7628c19fe185358f",
            strip_prefix = "stardoc-247c2097e7346778ac8d03de5a4770d6b9890dc5",
            url = "https://github.com/bazelbuild/stardoc/archive/247c2097e7346778ac8d03de5a4770d6b9890dc5.tar.gz",
        )
