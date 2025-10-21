# Browser Actions Recorder

This project provides scripts and a small library for capturing user interactions in a browser environment.

## Usage

Install the package and initialize the recorder:

```bash
npm install browser-actions-recorder
```

```ts
import { ActionRecorder } from 'browser-actions-recorder';

const recorder = new ActionRecorder();
recorder.start();
// user performs actions
recorder.stop();
console.log(recorder.getActions());
```

## Development

Run `npm install` to install dependencies. The `build` script compiles the TypeScript sources, generates type declarations and documentation.

### Testing

Tests are executed with Jest:

```bash
npm test
```
