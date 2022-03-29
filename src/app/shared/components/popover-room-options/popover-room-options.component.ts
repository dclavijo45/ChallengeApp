import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { IRoom } from 'src/app/interfaces/room';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'app-popover-room-options',
    templateUrl: './popover-room-options.component.html',
    styleUrls: ['./popover-room-options.component.scss'],
})
export class PopoverRoomOptionsComponent implements OnInit {

    @Input('room') room: IRoom;
    formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private toastController: ToastController,
        private roomService: RoomService,
        private alertController: AlertController,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            name: [this.room.name, [
                Validators.required,
            ]],
        });

        this.formGroup.valueChanges.pipe(debounceTime(500))
        .subscribe(async (values) => {
            this.room.name = values.name;
            const toast = await this.toastController.create({
                message: 'Successfully room updated',
                icon: 'checkmark-outline',
                position: 'top',
                duration: 2000
            });
            this.localStorageService.updateRooms();
            await toast.present();
        });
    }

    async removeRoom(): Promise<void> {
        const alert = await this.alertController.create({
            message: 'Are you sure you want to delete it?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    id: 'cancel-button'
                },
                {
                    text: 'Remove',
                    id: 'confirm-button',
                    handler: () => {
                        this.roomService.removeRoom(this.room);
                    }
                }
            ]
        });

        await alert.present();
    }

}
