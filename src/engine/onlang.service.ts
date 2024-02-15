// src/onlang/onlang.service.ts

import { Injectable } from '@nestjs/common';
import { ONLangParser } from './onlang.parser';

@Injectable()
export class ONLangService {
  constructor(private readonly onLangParser: ONLangParser) {}

  processONLangCode(inputCode: string): any {
    const objectNode = this.onLangParser.parseObject(inputCode);

    // Apply dynamic aspect resolution here if needed

    return objectNode;
  }
}
