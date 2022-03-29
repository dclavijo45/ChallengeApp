import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IRoomItem } from 'src/app/interfaces/room-item';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoomService } from '../../services/room.service';
import { PopoverRoomitemOptionsComponent } from '../popover-roomitem-options/popover-roomitem-options.component';

@Component({
    selector: 'app-cook',
    templateUrl: './cook.component.html',
    styleUrls: ['./cook.component.scss']
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

    ngOnInit() {}

    canUpdateRI: boolean = false;

    positionIcon: CdkDrag["freeDragPosition"] = {
        x: 411,
        y: 220
    }

    mouseMove(e: any): void {
        this.positionIcon.x = e.layerX == 823 ? 822 : e.layerX;
        this.positionIcon.y = e.layerY == 441 ? 440 : e.layerY;

        this.canUpdateRI = true;
    }

    mouseLeave(): void {
        this.canUpdateRI = false;
    }

    selectRoomItem(roomItem: IRoomItem): void {
        roomItem.selected = true;
    }

    toggleLockItem(roomItem: IRoomItem): void {
        roomItem.locked = !roomItem.locked;
        this.localStorageService.updateRooms();
    }

    async openOptions(event: Event, roomItem: IRoomItem): Promise<void> {
        if (!roomItem.locked && !roomItem.selected) {
            this.popoverController.create({
                component: PopoverRoomitemOptionsComponent,
                showBackdrop: false,
                componentProps: {roomItem},
                event,
                translucent: true
            }).then(async popover => {
                roomItem.locked = true;
                roomItem.selected = true;
                await popover.present();
                await popover.onWillDismiss();
                roomItem.locked = false;
                roomItem.selected = false;
                this.localStorageService.updateRooms();
            });
        };
    }

    setPositionRoomItem(event: CdkDragEnd, roomItem: IRoomItem): void {
        if (this.canUpdateRI) {
            roomItem.position.x = event.source.getFreeDragPosition().x;
            roomItem.position.y = event.source.getFreeDragPosition().y;
        }else{
            roomItem.position.x = Math.random() * 411;
            roomItem.position.y = Math.random() * 220;
        };

        roomItem.selected = false;
        this.localStorageService.updateRooms();
    }

    private backupPositionRoomItem(x: number, y: number): void {
        localStorage.setItem("positionRoomItemBk", JSON.stringify({
            x,
            y
        }));
    };

    private restorePositionRoomItem(): CdkDrag["freeDragPosition"] {
        const positionRoomItemBk = JSON.parse(localStorage.getItem("positionRoomItemBk"));
        if (positionRoomItemBk) {
            return positionRoomItemBk;
        }else{
            return {
                x: 411,
                y: 220
            };
        }
    }
}
