import { Component, Input, OnInit } from '@angular/core';
import { IRoom } from 'src/app/interfaces/room';
import { TypeRoomItem } from 'src/app/interfaces/room-item';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'app-popover-add-roomitem',
    templateUrl: './popover-add-roomitem.component.html',
    styleUrls: ['./popover-add-roomitem.component.scss'],
})
export class PopoverAddRoomitemComponent implements OnInit {

    get room(): IRoom {
        return this.roomService.roomSelected ? this.roomService.roomSelected : null;
    }

    constructor(
        private roomService: RoomService
    ) { }

    ngOnInit(): void {}

    addItemToRoom(type: TypeRoomItem): void{
        if (this.room !== null) {
            this.roomService.addItemToRoom(type);
        };
    }
}
