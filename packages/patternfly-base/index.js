/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const path = require("path");
const BG_IMAGES_DIRNAME = "bgimages";

function posixPath(pathStr) {
  return pathStr.split(path.sep).join(path.posix.sep);
}

const scssRule = {
  test: /\.s[ac]ss$/i,
  use: [require.resolve("style-loader"), require.resolve("css-loader"), require.resolve("sass-loader")],
};

const cssRule = {
  test: /\.css$/,
  use: [require.resolve("style-loader"), require.resolve("css-loader")],
};

const fontsRule = {
  test: /\.(svg|ttf|eot|woff|woff2)$/,
  // only process modules with this loader
  // if they live under a 'fonts' or 'pficon' directory
  include: [
    {
      or: [
        (input) => posixPath(input).includes("node_modules/@patternfly/react-core/dist/styles/assets/fonts"),
        (input) => posixPath(input).includes("node_modules/@patternfly/react-core/dist/styles/assets/pficon"),
        (input) => posixPath(input).includes("node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codicon"),
        (input) => posixPath(input).includes("node_modules/monaco-editor/dev/vs/base/browser/ui/codicons/codicon"),
      ],
    },
  ],
  use: {
    loader: require.resolve("file-loader"),
    options: {
      // Limit at 50k. larger files emitted into separate files
      limit: 5000,
      outputPath: "fonts",
      name: (file) => {
        const fileName = path.basename(file);
        console.log("### file", file, file.includes("react-core@4"), fileName);
        if (file.includes("react-core@4")) {
          return `v4/${fileName}`;
        }
        return file.includes("react-core@5") ? `v5/${fileName}` : fileName;
      },
    },
  },
};

const backgroundFilterSvgRule = {
  test: /\.svg$/,
  include: (input) => input.indexOf("background-filter.svg") > 1,
  use: [
    {
      loader: require.resolve("url-loader"),
      options: {
        limit: 5000,
        outputPath: "svgs",
        name: "[name].[ext]",
      },
    },
  ],
};

const backgroundSvgRule = {
  test: /\.svg$/,
  // only process SVG modules with this loader if they live under a 'bgimages' directory
  // this is primarily useful when applying a CSS background using an SVG
  include: (input) => input.indexOf(BG_IMAGES_DIRNAME) > -1,
  use: {
    loader: require.resolve("svg-url-loader"),
    options: {},
  },
};

const genericSvgRule = {
  test: /\.svg$/,
  // only process SVG modules with this loader when they don't live under a 'bgimages',
  // 'fonts', or 'pficon' directory, those are handled with other loaders
  include: (input) =>
    input.indexOf(BG_IMAGES_DIRNAME) === -1 &&
    input.indexOf("fonts") === -1 &&
    input.indexOf("background-filter") === -1 &&
    input.indexOf("pficon") === -1,
  use: {
    loader: require.resolve("raw-loader"),
    options: {},
  },
};

const imagesRule = {
  test: /\.(jpg|jpeg|png|gif)$/i,
  include: [
    {
      or: [
        (input) => posixPath(input).includes("src"),
        (input) => posixPath(input).includes("node_modules/@patternfly/react-styles/css/assets/images"),
        (input) => posixPath(input).includes("node_modules/@patternfly/react-core/dist/styles/assets/images"),
        (input) =>
          posixPath(input).includes(
            "node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css/assets/images"
          ),
        (input) =>
          posixPath(input).includes(
            "node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css/assets/images"
          ),
        (input) =>
          posixPath(input).includes(
            "node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css/assets/images"
          ),
      ],
    },
  ],
  use: [
    {
      loader: require.resolve("url-loader"),
      options: {
        limit: 5000,
        outputPath: "images",
        name: "[name].[ext]",
      },
    },
  ],
};

module.exports = {
  webpackModuleRules: [
    scssRule,
    cssRule,
    fontsRule,
    backgroundFilterSvgRule,
    backgroundSvgRule,
    genericSvgRule,
    imagesRule,
  ],
  individualRules: {
    scssRule,
    cssRule,
    fontsRule,
    backgroundFilterSvgRule,
    backgroundSvgRule,
    genericSvgRule,
    imagesRule,
  },
};
