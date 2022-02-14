import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { IOptionsRoomItem } from 'src/app/interfaces/options-roomitem';
import { debounceTime } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';
import { IRoom } from 'src/app/interfaces/room';
import { IRoomItem } from 'src/app/interfaces/room-item';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-popover-roomitem-options',
    templateUrl: './popover-roomitem-options.component.html',
    styleUrls: ['./popover-roomitem-options.component.scss'],
})
export class PopoverRoomitemOptionsComponent implements OnInit {

    options: IOptionsRoomItem[]= [
        {
            id: 1,
            type: 0,
            name: 'Background color'
        },
        {
            id: 2,
            type: 1,
            name: 'Content'
        },
        {
            id: 3,
            type: 2,
            name: 'Content color'
        },
        {
            id: 4,
            type: 3,
            name: 'Status'
        },
        {
            id: 5,
            type: 4,
            name: 'Type'
        },
        {
            id: 6,
            type: 5,
            name: 'Remove item'
        }
    ];

    @Input("roomItem") roomItem: IRoomItem;
    formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private popoverController: PopoverController,
        private toastController: ToastController,
        private roomService: RoomService,
        private alertController: AlertController,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            bgColor: [this.roomItem.bgColor.toString(), [
                Validators.required,
            ]],
            contentColor: [this.roomItem.contentColor.toString(), [
                Validators.required,
            ]],
            status: [this.roomItem.status.toString(), [
                Validators.required,
            ]],
            type: [this.roomItem.type.toString(), [
                Validators.required,
            ]],
            content: [this.roomItem.content.toString(), [
                Validators.required,
            ]],
        });

        this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(async values => {
            if (this.roomItem.type === 7 && values.type !== '7') {
                this.roomItem.bgColor = 0;
            } else{
                if (this.roomItem.type !== 7 && values.type === '7') {
                    this.roomItem.bgColor = 10;
                } else {
                    this.roomItem.bgColor = parseInt(values.bgColor);
                };
            };

            this.roomItem.contentColor = parseInt(values.contentColor);
            this.roomItem.status = parseInt(values.status);
            this.roomItem.type = parseInt(values.type);
            this.roomItem.content = values.content;

            const toast = await this.toastController.create({
                message: 'Successfully saved',
                icon: 'checkmark-outline',
                position: 'top',
                duration: 2000
            });
            this.localStorageService.updateRooms();
            toast.present();
        });
    }

    async removeItemRoom(option: IOptionsRoomItem): Promise<void> {
        switch (option.type) {
            case 5:
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
                            handler: async () => {
                                if (this.roomService.roomSelected === null) {
                                    return;
                                };

                                this.roomService.roomSelected.roomItems = this.roomService.roomSelected.roomItems.filter(item => JSON.stringify(item) !== JSON.stringify(this.roomItem));
                                const toast = await this.toastController.create({
                                    message: 'Successfully removed',
                                    icon: 'checkmark-outline',
                                    position: 'top',
                                    duration: 2000
                                });
                                this.localStorageService.updateRooms();
                                this.popoverController.dismiss()
                                await toast.present();
                            }
                        }
                    ]
                });

                await alert.present();
                break;

            default:
                break;
        };
    }
}
