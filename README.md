[npm]: https://www.npmjs.com/package/onlang
[github]: https://github.com/rajatasusual/on-lang
[readme]: https://github.com/rajatasusual/on-lang/blob/main/README.md
[twitter]: https://twitter.com/rajatasusual

# ONLang

[![npm version](https://img.shields.io/npm/v/onlang.svg)](https://www.npmjs.com/package/onlang)
[![npm downloads](https://img.shields.io/npm/dm/onlang.svg)](https://www.npmjs.com/package/onlang)
[![GitHub license](https://img.shields.io/github/license/rajatasusual/on-lang.svg)](https://github.com/rajatasusual/on-lang/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/network)
[![GitHub issues](https://img.shields.io/github/issues/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/rajatasusual/on-lang)](https://github.com/rajatasusual/on-lang/graphs/contributors)

## Description
ONLang (Object Notation Language) is a markup-style programming language designed to define and interact with objects in a user-friendly and intuitive way. It is built on top of TypeScript, making it easy to use and extend.

## Features

- **Markup Syntax:** Intuitive and human-readable syntax for defining objects.
- **Dynamic Aspect Resolution:** ONLang understands and adapts to the structure of various systems, making it versatile for integrating with different APIs and services.

## Installation

To install ONLang, run the following command:

```bash
npm install onlang
```

## Usage

```bash
onlang [files]
```

## Command Options

- `-h, --help`: Display this help message
- `-v, --version`: Display the current version

### [DONE] Step 1: Read and Compile
- **JSON Schema Conversion**:
ONLang dynamically generates JSON schemas for objects from external systems (Qualtrics, Salesforce, etc.).
These JSON schemas are converted into TypeScript classes using @rajatasusual/json-schema-2-ts.
