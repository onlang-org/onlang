// src/onlang/onlang.parser.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ONLangParser {
  parseObject(inputCode: string): any {
    const tokens = inputCode.match(/\S+/g);
    let currentIndex = 0;

    function parseObjectNode() {
      const objectNode = { type: 'object', name: tokens[currentIndex + 1], properties: [], commands: [] };

      currentIndex += 2; // Skip 'object' and object name
      while (tokens[currentIndex] !== 'object' && tokens[currentIndex] !== undefined) {
        if (tokens[currentIndex] === 'generate-code' || tokens[currentIndex] === 'interact-ui') {
          objectNode.commands.push(tokens[currentIndex]);
          currentIndex += 1; // Skip command
        } else {
          // Handle other tokens as needed
        }
      }

      return objectNode;
    }

    // Entry point for parsing ONLang code
    return parseObjectNode();
  }
}
