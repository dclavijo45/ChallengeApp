import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextItemFixFigurePipe } from './text-item-fix-figure.pipe';
import { RoomItemTextColorPipe } from './room-item-text-color.pipe';
import { RoomFigurePipe } from './room-figure.pipe';

@NgModule({
    declarations: [
        TextItemFixFigurePipe,
        RoomItemTextColorPipe,
        RoomFigurePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TextItemFixFigurePipe,
        RoomItemTextColorPipe,
        RoomFigurePipe
    ]
})
export class PipesModule { }
