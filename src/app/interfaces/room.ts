import { IRoomItem, TypeRoomItem } from "./room-item";

export interface IRoom {
    id: number,
    roomItems: IRoomItem[],
    name: string
}
