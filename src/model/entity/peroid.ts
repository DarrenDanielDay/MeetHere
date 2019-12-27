export function inrange(id: number) {
    return  0 <= id && id < 48 && id === Math.ceil(id);
}

export class TimePiece {
    public beginTime: string;
    public endTime: string;
    constructor(public readonly id: number) {
        if (!inrange(id)) {
            throw new Error("period id must be integer in [0,48)")
        }
        this.beginTime = `${Math.floor(id / 2)}:${id % 2 ? "30" : "00"}`
        this.endTime = `${Math.floor((id + 1) / 2)}:${id % 2 ? "00" : "30"}`
        // console.log(this.id);
        // console.log(this.beginTime);
        // console.log(this.endTime);
    }
}

export class Peroid {
    public readonly beginTimePiece: TimePiece;
    public readonly endTimePiece: TimePiece;

    constructor(public readonly begin: number, public readonly end: number) {
        this.beginTimePiece = new TimePiece(begin);
        this.endTimePiece = new TimePiece(end);
    }

    public toString() {
        return `${this.beginTimePiece.beginTime}~${this.endTimePiece.endTime}`;
    }
}
