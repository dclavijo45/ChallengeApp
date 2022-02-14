export interface IOptionsRoomItem {
    id: number,
    type: Type,
    name: string,
}

enum Type {
    setBgColor,
    setContent,
    setContentColor,
    setStatus,
    setType,
    removeItemRoom
}
