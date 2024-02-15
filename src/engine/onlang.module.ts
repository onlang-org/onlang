// src/onlang/onlang.module.ts

import { Module } from '@nestjs/common';
import { ONLangService } from './onlang.service';
import { ONLangParser } from './onlang.parser';

@Module({
    providers: [ONLangService, ONLangParser],
    exports: [ONLangService, ONLangParser], // Export the components to make them accessible in other modules
})
export class ONLangModule { }
