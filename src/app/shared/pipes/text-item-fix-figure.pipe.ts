import { Pipe, PipeTransform } from '@angular/core';
import { IRoomItem } from 'src/app/interfaces/room-item';

@Pipe({
    name: 'textItemFixFigure'
})
export class TextItemFixFigurePipe implements PipeTransform {

    transform(value: string, room: IRoomItem): string {
        if (room.type !== 7) {
            if (value?.length > 3) {
                return value.slice(0, 1) + '..';
            };
        };

        return value;
    }
}
