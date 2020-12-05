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

"Install toolchain dependencies"

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

def browserbuild_setup_workspace():
    """This repository rule should be called from your WORKSPACE file."""

    yarn_install(
        name = "build_bazel_rules_browserbuild_web_ext_deps",
        package_json = Label("//internal/web_ext:package.json"),
        yarn_lock = Label("//internal/web_ext:yarn.lock"),
        symlink_node_modules = False,
    )
