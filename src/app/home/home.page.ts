import { Component, OnInit} from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';
import { IRoom } from '../interfaces/room';
import { PopoverAddRoomitemComponent } from '../shared/components/popover-add-roomitem/popover-add-roomitem.component';
import { RoomService } from '../shared/services/room.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    isDraggabble = false;
    get roomSelected(): IRoom {
        return this.roomSerivce.roomSelected;
    }

    constructor(
        private screenOrientation: ScreenOrientation,
        private popoverController: PopoverController,
        private roomSerivce: RoomService
    ) {}

    ngOnInit(): void {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE)
        .catch(e => console.log('ScreenOrientation is not available on this device'));
    }

    addRoomItem(event: Event){
        this.popoverController.create({
            component: PopoverAddRoomitemComponent,
            translucent: true,
            showBackdrop: false,
            event
        }).then(popover => {
            popover.present();
        });
    }
}
