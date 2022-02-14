import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/room';
import { RoomService } from '../../services/room.service';
import { PopoverAddRoomComponent } from '../popover-add-room/popover-add-room.component';
import { PopoverRoomOptionsComponent } from '../popover-room-options/popover-room-options.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    get rooms(): IRoom[] {
        return this.roomService.rooms;
    }

    constructor(
        private roomService: RoomService,
        private popoverController: PopoverController,
    ) { }

    ngOnInit() {}

    selectRoom(room: IRoom): void{
        this.roomService.roomSelected = room;
    }

    addRoom(event: Event): void{
        this.popoverController.create({
            component: PopoverAddRoomComponent,
            showBackdrop: false,
            event,
            translucent: true
        }).then(async popover => {
            await popover.present();
        });
    }

    roomOptions(event: Event, room: IRoom): void{
        this.popoverController.create({
            component: PopoverRoomOptionsComponent,
            showBackdrop: false,
            translucent: true,
            componentProps: {room},
            event
        }).then(async popover => {
            await popover.present();
        });
    }

    setPositionRoom(event: CdkDragDrop<any>): void{
        moveItemInArray(this.roomService.rooms, event.previousIndex, event.currentIndex);
    }
}
