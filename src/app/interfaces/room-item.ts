export interface IRoomItem{
    id: number,
    type: TypeRoomItem,
    status: Status,
    content: string,
    locked: boolean,
    position: PositionRoomItem,
    parent: string,
    bgColor: Color,
    contentColor: Color,
    selected: boolean,
}

export interface PositionRoomItem {
    x: number,
    y: number,
}

export enum TypeRoomItem {
    horizontalRectangle,
    verticalRectangle,
    square,
    rhomb,
    circle,
    verticalWall,
    horizontalWall,
    text
}

enum Status {
    empty,
    assignedOrder,
    orderShipped,
    notApply
}

enum Color{
    default,
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light,
    transparent
}
