[npm]: https://www.npmjs.com/package/on-lang
[github]: https://github.com/rajatasusual/on-lang
[readme]: https://github.com/rajatasusual/on-lang/blob/main/README.md
[twitter]: https://twitter.com/rajatasusual

<img src="https://raw.githubusercontent.com/rajatasusual/rajatasusual/master/onlang_shorthand.png" alt="onlang_shorthand" height="100">

ONLang (Object Notation Language) is a markup-style programming language designed to define and interact with objects in a user-friendly and intuitive way. It is built on top of TypeScript, making it easy to use and extend.

> Built on top of [TypeScript](https://www.typescriptlang.org/) and [NestJS](https://nestjs.com/)


**_Information_**

[![JS.org](https://img.shields.io/badge/JS.org-Documentation-ffe70b)](https://onlang.js.org/)
[![npm version](https://img.shields.io/npm/v/on-lang.svg)](https://www.npmjs.com/package/on-lang)
[![npm downloads](https://img.shields.io/npm/dm/on-lang.svg)](https://www.npmjs.com/package/on-lang)
[![GitHub license](https://img.shields.io/github/license/rajatasusual/on-lang.svg)](https://github.com/rajatasusual/on-lang/blob/main/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/network)

**_Project Health_**

[![CodeQL](https://github.com/rajatasusual/on-lang/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/rajatasusual/on-lang/actions/workflows/codeql.yml)
[![ESLint](https://github.com/rajatasusual/on-lang/actions/workflows/eslint.yml/badge.svg)](https://github.com/rajatasusual/on-lang/actions/workflows/eslint.yml)
[![Node.js Package](https://github.com/rajatasusual/on-lang/actions/workflows/npm-test.yml/badge.svg)](https://github.com/rajatasusual/on-lang/actions/workflows/npm-test.yml)
[![GitHub issues](https://img.shields.io/github/issues/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/issues)



## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Command Options](#command-options)
- [Stage of Development](#stage-of-development)
- [Contributing](#contributing)

## Description

> **_NOTE:_**  This Language is in active development. Please read current stage of development [here](#stage)

## Features

- **Markup Syntax:** Intuitive and human-readable syntax for defining objects.
- **Dynamic Aspect Resolution:** ONLang understands and adapts to the structure of various systems, making it versatile for integrating with different APIs and services.

## Installation

To install ONLang, run the following command:

```bash
npm install -g on-lang
```
This will install the ONLang package globally. 

## Usage

### ONLang Script file (.onl)

```yaml
!onlang
Survey:
    SurveyOptions:
        Language: "en"
        SurveyTitle: "User Satisfaction Survey"
    Block:
        Type: "Standard"
        Questions:
          QID1:
            Type: "MultipleChoice"
            Question: "How satisfied are you with our service?"
            Options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
          QID2:
            Type: "Text"
            Question: "Any additional comments or suggestions?"

```
>**_NOTE:_** The `!onlang` tag is required at the beginning of dynamic objects that need to be resolved and compiled at runtime. The validation is performed at compile time by the ONLang compiler using Validation Functions generated for schemas available at runtime.


### ONLang CLI

```bash
onlang [files(optional)]
```

> **_NOTE:_** You need node.js installed to use ONLang. See [here](https://nodejs.org/en/download/) for installation instructions.

files is optional. Without it, ONLang will read and compile all files in the current directory taking the schema path from the `onlang.schemaPath` config in .env file.

## Configuring .env file

```bash
onlang.schemaPath=src/schemas
```

## Examples

### Schema Validation

```bash
onlang validate test_schema.json test_schema2.json
```

### Script Parsing

```bash
onlang parse script.onl
```

## Command Options

- `-h, --help`: Display this help message
- `-v, --version`: Display the current version
- `parse`: Parse ONLang script
- `validate`: Validate JSON schema for ONLang script

## Stage of Development

### [DONE] Step 1: Read and Compile
- **JSON Schema Conversion**:

ONLang dynamically generates JSON schemas for objects from external systems (Qualtrics, Salesforce, etc.).
These JSON schemas are validated using Ajv [here](https://github.com/ajv-validator/ajv) and are used to generate Validation Functions.

### [ONGOING] Step 2: ONLang Scripting:

Users create ONLang scripts that involve the creation of objects (e.g., Qualtrics survey) using the YAML syntax and onlang schema.

### Step 3: Dynamic Aspect Resolution:

The ONLang compiler utilizes dynamic aspect resolution to understand and adapt to the schema for objects from external systems without explicit user-provided JSON schemas.

### Step 4: Validation in ONLang Compiler:

The ONLang compiler validates ONLang scripts:
Ensures that objects created conform to the dynamically resolved schema.
Verifies the syntax and hierarchy of the ONLang script.

### Step 5: Transpilation and Execution:

If the validation is successful, the ONLang script is transpiled into a JavaScript file.
The transpiled JavaScript file is then executed.

## Contributing

If you'd like to contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md)
See code of conduct [here](CODE_OF_CONDUCT.md)