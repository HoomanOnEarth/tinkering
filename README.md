This repo contains:

- apps/ 
- packages/

Every package might have it own typescript config files (optional)
- `tsconfig.json`
- `tsconfig.build.json`

The main idea of splitting tsconfig.json are:

tsconfig.json: make IDE happy, give it abilities to:
- Typescript type check only (--noEmit true)
- Module resolving using `compilerOptions.paths`

tsconfig.build.json: is everything else that needs to build package with `tsc`

example:

Package `node-lib` using `tsc` for type check & build

packages/node-lib should include:

``` tsconfig.json
{
  "extends": "../../tsconfig.json",
  {
    "compilerOptions": {
      types: ["node"]
    }
  },
  "include": ["src"]
}
```

``` tsconfig.build.json
{
  "extends": "../../tsconfig.build.json",
  {
    "compilerOptions": {
      types: ["node"]
    }
  },
  "include": ["src"]
}
```
