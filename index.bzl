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

""" Public API surface is re-exported here.

Users should not load files under "/internal"
"""

load("//internal:repositories.bzl", _browserbuild_setup_workspace = "browserbuild_setup_workspace")
load("//internal/web_ext:web_ext.bzl", _web_ext = "web_ext")

browserbuild_setup_workspace = _browserbuild_setup_workspace
web_ext = _web_ext
