# GOLDBOX

Playing ground to train my rusty skill. It is based on ElectronJS.

## SETUP PROJECT

Clone the project
```
$ git clone https://<token>@github.com/winnuayi/goldbox
$ cd goldbox
```

Install javascript dependencies
```
$ npm install
```

Run project
```
$ npm start
```

## FEATURES

This is a minimal Electron app. It shows how to:
- Create a main window
- Create a child window (from main process)
- Persist data using IndexedDB (and Dexie, IndexedDB wrapper) with Simpleton Pattern
- Communicate from child window to parent window
- Loading Bootstrap CSS
- Import API Provider class
- Get resource using API (two way communication, render to main to render)