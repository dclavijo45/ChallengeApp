import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PopoverRoomitemOptionsComponent } from './popover-roomitem-options/popover-roomitem-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookComponent } from './cook/cook.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipesModule } from '../pipes/pipes.module';
import { PopoverAddRoomitemComponent } from './popover-add-roomitem/popover-add-roomitem.component';
import { PopoverAddRoomComponent } from './popover-add-room/popover-add-room.component';
import { PopoverRoomOptionsComponent } from './popover-room-options/popover-room-options.component';

@NgModule({
    declarations: [
        HeaderComponent,
        PopoverRoomitemOptionsComponent,
        CookComponent,
        PopoverAddRoomitemComponent,
        PopoverAddRoomComponent,
        PopoverRoomOptionsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        DragDropModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        PopoverRoomitemOptionsComponent,
        CookComponent,
        PopoverAddRoomitemComponent,
        PopoverAddRoomComponent,
        PopoverRoomOptionsComponent
    ]
})
export class ComponentsModule { }
