export default class CursorPositionPacket {
    public readonly name = 'cursor_position';
    
    public constructor(
        public readonly data: number[]
    ) { 
    }
};