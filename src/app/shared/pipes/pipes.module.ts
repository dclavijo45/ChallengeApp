import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextItemFixFigurePipe } from './text-item-fix-figure.pipe';

@NgModule({
    declarations: [
        TextItemFixFigurePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
      TextItemFixFigurePipe
  ]
})
export class PipesModule { }
