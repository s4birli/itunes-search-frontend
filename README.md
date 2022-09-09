# Search iTunes Music - Frontend
- ## [Demo](https://itunes-search-frontend.vercel.app/)

- ## [Backend Project](https://github.com/s4birli/itunes-search-backend)
## Quick Start

### 1. Install dependencies

```
yarn install
```

### 2. Run Applications

```
yarn start
```

If you run project and get error, make sure you've installed `Node.js >= 16` and `yarn`.

You can run `cat package.json` to see available commands.

## Environment

### `✅` VS Code editor highly recommended

### Recommended plugins

- `✅` [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- `✅` [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- `✅` [Code Spell Checker Plugin](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- `✅` [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- `✅` [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- `✅` [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- `✅` [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
- `✅` [GitLens — Git supercharge](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## General Structure

```
public
  |-- assets
      |-- fonts
          Web fonts.
      |-- icons
          SVG icons, and anything that looks like an icon.
      |-- images
          Static images, like backgrounds.
      `-- logo
          Various versions of logotype and basic branding.
  |-- data
      Static `json` files that can be called from the API,
      allowing them to be requested on demand and hence avoid bundling them into project.
  `-- manifest
      PWA related images.
src
  |-- components
      Contains reusable components, such as: Navigation, Menus, etc...
      These components usually contain project specific data or behavior, they
      could make API calls and perform complex logic.
  |-- libraries
      Libraries are non-react units of code, used throughout project.
      The best example of this is fetch.
  |-- pages
      Pages are components that connects to routes, and render final view
      that user interacts with. They're usually named the same as actual route (ie URL path).
  |-- store
    Redux store implement in this path
      |-- middleware
          Redux middleware
      |-- state
          Redux slices, states, and actions
```

Most of folders contains `index.ts` file, which will export all files, and allow easy and readable inclusion in style of
`import { store } from '@app/store'`.

### Do's and don'ts

- `✅` DO: Follow consistent naming of files (capitalization, CamelCase, easy to understand names).
- `🔴` DON'T: Created new components if used only in one place (on one screen).
- `🔴` DON'T: Needlessly create deeply nested folders.
- `🔴` DON'T: Introduce big data chunks inside the actual code. Store them in `/public/data/` and request them with API when needed.
- `🔴` DON'T: Add anything in the root (`src`) part of the project.
- `🔴` DON'T: Non-component separations - global files (i.e. global constants, types, styles).
- `🔴` DON'T: Introduce needles, heavy - in scope, size or complexity, external dependencies.

## Environment

- `🔴` DON'T: change `environment.ts` unless you're introducing a new variable,
- `✅` DO: change `.env` and set your own values.
- `✅` DO: if you're introducing a new variable to `environment.ts`, use descriptive and easy to understand naming
- `✅` DO: Include `environment` in following way: `import env from '@app/environment'`


## Code Style

We're following simple rules as defined in `.eslint.json`:

- `✅` DO: 2 spaces, no tabs
- `✅` DO: single quite for JS, double quite fro HTML/Element Props
- `✅` DO: semicolons
- `✅` DO: keep lines short
- `🔴` DON'T: leave unused variable (build will fail!)
- `🔴` DON'T: leave console.log or console.error in code
- `✅` DO: Use ` yarn lint ` command to reformat files. 
  
We're using TypeScript:

- `✅` DO: define proper and up-to-date types (especially for API request/response)
- `✅` DO: generally: keep types in file with code; types can be stored in external file, named: `myFile.types.ts` (note the .d);
- `🔴` DON'T: use `any` notation (build will fail)
- `🔴` DON'T: create common repository of types (i.e. `src/types` directory)
