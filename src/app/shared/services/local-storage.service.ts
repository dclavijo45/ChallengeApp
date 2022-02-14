import { Injectable } from '@angular/core';
import { RoomBuiltExample } from '../utils/roomBuilt';
import { RoomService } from './room.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(
        private roomService: RoomService
    ) {
        const rooms = localStorage.getItem('rooms');
        if (rooms) {
            this.roomService.rooms = JSON.parse(rooms);
            this.roomService.roomSelected = this.roomService.rooms.length > 0 ?
            this.roomService.rooms[0] : null;
        }else{
            this.roomService.addRoom('Dinning Room');
            this.roomService.roomSelected = this.roomService.rooms[0];
            this.roomService.roomSelected.roomItems = RoomBuiltExample;
        };
    }

    updateRooms(): void{
        localStorage.setItem('rooms', JSON.stringify(this.roomService.rooms));
    }
}
