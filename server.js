/*
 Copyright 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const express = require('express');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const uaParser = require('ua-parser-js');
const pkg = require('./package.json');


nunjucks.configure({
  noCache: process.env.NODE_ENV !== 'production',
});

const app = express();

app.use(express.static(pkg.config.publicDir));

app.get('/', function(request, response) {
  // Parse the UA string to determine modulepreload support.
  const ua = uaParser(request.headers['user-agent']);

  const manifest = fs.readJsonSync(
      path.join(pkg.config.publicDir, 'manifest.json'));

  const modulepreload = fs.readJsonSync(
      path.join(pkg.config.publicDir, 'modulepreload.json'));

  const templateData = {
    manifest,
    modulepreload,
    browserSupportsModulePreload: ua.engine.name === 'Blink',
    ENV: process.env.NODE_ENV || 'development',
  };

  response.send(nunjucks.render('views/index.html', templateData));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running:\nhttp://localhost:${listener.address().port}`);
});
