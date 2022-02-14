import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/room';
import { IRoomItem } from 'src/app/interfaces/room-item';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoomService } from '../../services/room.service';
import { PopoverRoomitemOptionsComponent } from '../popover-roomitem-options/popover-roomitem-options.component';

@Component({
    selector: 'app-cook',
    templateUrl: './cook.component.html',
    styleUrls: ['./cook.component.scss'],
})
export class CookComponent implements OnInit {

    get roomItems(): IRoomItem[] {
        return this.roomService.roomSelected !== null ?
            this.roomService.roomSelected.roomItems : [];
    }

    constructor(
        private popoverController: PopoverController,
        private roomService: RoomService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {
    }

    toggleLockItem(roomItem: IRoomItem): void {
        roomItem.locked = !roomItem.locked;
        this.localStorageService.updateRooms();
    }

    async openOptions(e: Event, roomItem: IRoomItem): Promise<void>{
        console.log(JSON.stringify(this.roomService.roomSelected.roomItems));

        if (!roomItem.locked) {
            this.popoverController.create({
                component: PopoverRoomitemOptionsComponent,
                showBackdrop: false,
                componentProps: {roomItem},
                event: e,
                translucent: true
            }).then(async popover => {
                roomItem.locked = true;
                await popover.present();
                roomItem.locked = false;
            });
        };
    }

    setPositionRoomItem(event: CdkDragEnd, roomItem: IRoomItem): void{
        roomItem.position.x = event.source.getFreeDragPosition().x;
        roomItem.position.y = event.source.getFreeDragPosition().y;
        this.localStorageService.updateRooms();
    }
}
