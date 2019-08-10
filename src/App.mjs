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

import {format} from 'date-fns/esm';
import React from 'react';
import {CodeBlock} from './CodeBlock.mjs';
import {timeOrigin} from './timeOrigin.mjs';

import './App.css';
import './Button.css';


export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: this.getImportedModules(),
    };

    // Bind methods.
    this.importAsyncDeps = this.importAsyncDeps.bind(this);
  }

  getImportedModules() {
    return performance.getEntriesByType('resource')
        .filter((entry) => entry.name.match(/\.m?js$/))
        .map((entry) => {
          const date = new Date(Math.round(entry.responseEnd + timeOrigin));
          const timestamp = format(date, 'hh:mm:ss.SSS');
          return {
            URL: new URL(entry.name, location.href).pathname,
            timestamp,
          };
        });
  }

  async importAsyncDeps() {
    // `AsyncComponent.mjs` imports `lodash-es` and `rxjs`.
    const {AsyncComponent} = await import('./AsyncComponent.mjs');

    // Logs an `AsyncComponent` instance, which contains the `debounce`
    // and `Observable` properties imported from `lodash-es` and `rxjs`.
    console.log(new AsyncComponent());

    this.setState({modules: this.getImportedModules()});
  }

  render() {
    const code = [
      '// `AsyncComponent.mjs` imports `lodash-es` and `rxjs`.',
      `const {AsyncComponent} = await import('./AsyncComponent.mjs');`,
      ``,
      '// Logs an `AsyncComponent` instance, which contains the `debounce`',
      '// and `Observable` properties imported from `lodash-es` and `rxjs`.',
      `console.log(new AsyncComponent());`,
    ].join('\n');

    return (<div class="App">
      <h2 className="App-heading">JavaScript Modules in Production Demo</h2>
      <p>This demo uses real, ES2015 JavaScript modules loaded with module scripts and actual <code>import</code> statements. Everything you see in the intial render was done with static imports. You can see dynamic <code>import()</code> in action by clicking the button and running the code below.</p>
      <CodeBlock code={code} lang="javascript" />
      <p>
        <button className="Button" onClick={this.importAsyncDeps}>Run code &nbsp;&rarr;</button>
      </p>
      <p>Running this code will dynamically <code>import()</code> the <code>AsyncComponent.mjs</code> module, as well as its dependencies (<code>lodash-es</code> and <code> rxjs</code>). After you run the code, notice how the list of modules below changes. <em>(View source or click the links below to see the module code.)</em></p>
      <h3 className="App-subHeading">Loaded modules</h3>
      <ul>{this.state.modules.map(({timestamp, URL}) => {
        return (<li key={URL} className="App-module">
          <time className="App-moduleTimestamp">[{timestamp}]</time>
          <a className="App-moduleURL" href={URL}>{URL}</a>
        </li>);
      })}</ul>
    </div>);
  }
}
