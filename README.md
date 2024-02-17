[npm]: https://www.npmjs.com/package/on-lang
[github]: https://github.com/rajatasusual/on-lang
[readme]: https://github.com/rajatasusual/on-lang/blob/main/README.md
[twitter]: https://twitter.com/rajatasusual

# ONLang

built with [NestJS](https://nestjs.com/)

![build status](https://github.com/github/docs/actions/workflows/npm-test.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/on-lang.svg)](https://www.npmjs.com/package/on-lang)
[![npm downloads](https://img.shields.io/npm/dm/on-lang.svg)](https://www.npmjs.com/package/on-lang)
[![GitHub license](https://img.shields.io/github/license/rajatasusual/on-lang.svg)](https://github.com/rajatasusual/on-lang/blob/main/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/network)
[![GitHub issues](https://img.shields.io/github/issues/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/issues)

## Description
> **_NOTE:_**  This Language is in active development. Please read current stage of development [here](#stage)
ONLang (Object Notation Language) is a markup-style programming language designed to define and interact with objects in a user-friendly and intuitive way. It is built on top of TypeScript, making it easy to use and extend.

## Features

- **Markup Syntax:** Intuitive and human-readable syntax for defining objects.
- **Dynamic Aspect Resolution:** ONLang understands and adapts to the structure of various systems, making it versatile for integrating with different APIs and services.

## Installation

To install ONLang, run the following command:

```bash
npm install -g onlang
```
This will install the ONLang package globally. 

## Usage

```bash
onlang [files(optional)]
```

> **_NOTE:_** You need node.js installed to use ONLang. See [here](https://nodejs.org/en/download/) for installation instructions.

files is optional. Without it, ONLang will read and compile all files in the current directory taking the schema path from the `onlang.schemaPath` config in .env file.

## Configuring .env file
```bash
onlang.schemaPath=src/schemas
```

## Command Options

- `-h, --help`: Display this help message
- `-v, --version`: Display the current version


# Stage
### [DONE] Step 1: Read and Compile
- **JSON Schema Conversion**:
ONLang dynamically generates JSON schemas for objects from external systems (Qualtrics, Salesforce, etc.).
These JSON schemas are converted into TypeScript classes using @rajatasusual/json-schema-2-ts.

### Step 2: ONLang Scripting:
Users create ONLang scripts that involve the creation of objects (e.g., Qualtrics survey) using the TypeScript classes generated from JSON schemas.

### Step 3: Dynamic Aspect Resolution:
The ONLang compiler utilizes dynamic aspect resolution to understand and adapt to the schema for objects from external systems without explicit user-provided JSON schemas.

### Step 4: Validation in ONLang Compiler:
The ONLang compiler validates ONLang scripts:
Ensures that objects created conform to the dynamically resolved schema.
Verifies the syntax and hierarchy of the ONLang script.

### Step 5: Transpilation and Execution:
If the validation is successful, the ONLang script is transpiled into a JavaScript file.
The transpiled JavaScript file is then executed.
