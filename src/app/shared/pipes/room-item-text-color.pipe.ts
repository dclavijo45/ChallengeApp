import { Pipe, PipeTransform } from '@angular/core';
import { IRoomItem } from 'src/app/interfaces/room-item';

@Pipe({
    name: 'roomItemTextColor',
    pure: false
})
export class RoomItemTextColorPipe implements PipeTransform {

    transform(room: IRoomItem): string {
        switch (room.contentColor) {
            case 1:
                return 'primary';
            case 2:
                return 'secondary';
            case 3:
                return 'tertiary';
            case 4:
                return 'success';
            case 5:
                return 'warning';
            case 6:
                return 'danger';
            case 7:
                return room.bgColor === 7 ? 'light' : 'dark';
            case 8:
                return 'medium';
            case 9:
                return room.bgColor === 9 ? 'dark' : 'light';
            case 10:
                return 'transparent';
            default:
                switch (room.bgColor) {
                    case 9:
                        return 'dark';
                    case 7:
                        return 'light';

                    default:
                        return 'dark';
                };
        };
    }
}
