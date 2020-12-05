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

workspace(
    name = "build_bazel_rules_web_ext",
    managed_directories = {
        "@npm": ["node_modules"],
    },
)

load("//:package.bzl", "rules_browserbuild_dependencies", "rules_browserbuild_dev_dependencies")

rules_browserbuild_dependencies()

rules_browserbuild_dev_dependencies()

load("//:index.bzl", "browserbuild_setup_workspace")

browserbuild_setup_workspace()

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    package_json = ["//:package.json"],
    preserve_symlinks = True,
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@io_bazel_stardoc//:setup.bzl", "stardoc_repositories")

stardoc_repositories()
