import { Pipe, PipeTransform } from '@angular/core';
import { IRoomItem } from 'src/app/interfaces/room-item';

@Pipe({
    name: 'roomFigure',
    pure: false
})
export class RoomFigurePipe implements PipeTransform {

    transform(roomItem: IRoomItem): string[] {
        const classes: string[] = [];

        roomItem.locked ? classes.push('cursor-no-drop') : classes.push('cursor-move');

        switch (roomItem.type) {
            case 0:
                classes.push('item-horizontal-rectangle');
                break;
            case 1:
                classes.push('item-vertical-rectangle');
                break;
            case 2:
                classes.push('item-square');
                break;
            case 3:
                classes.push('item-rhomb');
                break;
            case 4:
                classes.push('item-circle');
                break;
            case 5:
                classes.push('item-vertical-wall');
                break;
            case 6:
                classes.push('item-horizontal-wall');
                break;
            case 7:
                classes.push('item-item-text');
                break;
            default:
                break;
        };

        switch(roomItem.bgColor){
            case 0:
                classes.push('item-figure-color-default');
                break;
            case 1:
                classes.push('item-figure-color-primary');
                break;
            case 2:
                classes.push('item-figure-color-secondary');
                break;
            case 3:
                classes.push('item-figure-color-tertiary');
                break;
            case 4:
                classes.push('item-figure-color-success');
                break;
            case 5:
                classes.push('item-figure-color-warning');
                break;
            case 6:
                classes.push('item-figure-color-danger');
                break;
            case 7:
                classes.push('item-figure-color-dark');
                break;
            case 8:
                classes.push('item-figure-color-medium');
                break;
            case 9:
                classes.push('item-figure-color-light');
                break;
            case 10:
                classes.push('item-figure-color-transparent');
                break;
            default:
                break;
        };

        roomItem.selected ?
            roomItem.bgColor === 7 ? classes.push('selected-figure-light') :
                classes.push('selected-figure-dark')
            : null;

        return classes;
    }
}
