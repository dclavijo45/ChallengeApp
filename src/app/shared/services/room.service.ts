import { Injectable } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/room';
import { PositionRoomItem, TypeRoomItem } from 'src/app/interfaces/room-item';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    rooms: IRoom[] = []
    roomSelected: IRoom = this.rooms.length > 0 ? this.rooms[0] : null;

    constructor(
        private popoverController: PopoverController,
        private toastController: ToastController,
    ) {}

    addItemToRoom(type: TypeRoomItem): void{
        if (this.roomSelected === null) {
            return;
        };

        const id = this.roomSelected.roomItems.length > 0 ?
            this.roomSelected.roomItems[this.roomSelected.roomItems.length - 1].id + 1 : 1;

        let position: PositionRoomItem = {
            x: 710,
            y: 330
        };

        if (this.roomSelected.roomItems.length > 0) {
            let found = true;

            while (found) {
                let isNotExist = true;
                const newPosition: PositionRoomItem = {
                    x: parseInt((Math.random() * 750).toString()),
                    y: parseInt((Math.random() * 350).toString())
                };

                this.roomSelected.roomItems.forEach(room => {
                    if (room.position.x === newPosition.x && room.position.y === newPosition.y) {
                        isNotExist = false;
                    };
                });

                if (isNotExist) {
                    found = false;
                    position = newPosition;
                };
            };
        };

        this.roomSelected.roomItems.push({
            id,
            type,
            status: 0,
            content: type === 7 ? 'ABC123' : `${id}`,
            locked: false,
            parent: '.wrapper',
            bgColor: 0,
            contentColor: 0,
            position
        });

        this.updateRoomsLocalStorage();

        this.popoverController.dismiss();
    }

    async addRoom(name: string): Promise<void>{
        const id = this.rooms.length > 0 ? this.rooms[this.rooms.length - 1].id + 1 : 1;

        this.rooms.push({
            id,
            name,
            roomItems: []
        });

        const toast = await this.toastController.create({
            message: 'Successfully room added',
            icon: 'checkmark-outline',
            position: 'top',
            duration: 1000
        });
        this.updateRoomsLocalStorage();
        this.popoverController.dismiss().catch((e) => {});
        await toast.present();
    }

    async removeRoom(room: IRoom): Promise<void>{
        if (this.roomSelected !== null) {
            if (this.roomSelected.id === room.id) {
                this.roomSelected = null;
            };
        };

        this.rooms = this.rooms.filter(item => item.id !== room.id);
        const toast = await this.toastController.create({
            message: 'Successfully removed',
            icon: 'checkmark-outline',
            position: 'top',
            duration: 1000
        });
        this.updateRoomsLocalStorage();
        this.popoverController.dismiss()
        await toast.present();
    }

    // Prevent circular dependency with LocalStorageService
    updateRoomsLocalStorage(): void{
        localStorage.setItem('rooms', JSON.stringify(this.rooms));
    }
}
