import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'app-popover-add-room',
    templateUrl: './popover-add-room.component.html',
    styleUrls: ['./popover-add-room.component.scss'],
})
export class PopoverAddRoomComponent implements OnInit {

    formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private roomService: RoomService,
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', [
                Validators.required,
            ]],
        });
    }

    addRoom(): void {
        if (this.formGroup.valid) {
            const name: string = this.formGroup.get('name').value;
            this.roomService.addRoom(name);
        };
    }
}
