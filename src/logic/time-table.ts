import { inrange, Peroid } from '../model/entity/peroid';
import { ButtonType } from 'element-ui/types/button';


export type StatusClass = "inavailable" | "available" | "occupied" | "selected";
export type StatusExpression = "不可用" | "可用" | "被占用" | "已选";
export interface ButtonStyle {
    expression: StatusExpression;
    buttonType: ButtonType;
}
export const statusmapper: Record<StatusClass, ButtonStyle> = {
    inavailable: {
        expression: "不可用",
        buttonType: "info"
    },
    available: {
        expression: "可用",
        buttonType: "success"
    },
    occupied: {
        expression: "被占用",
        buttonType: "danger"
    },
    selected: {
        expression: "已选",
        buttonType: "primary"
    }
};

function available(status: StatusClass) {
    return status === "available" || status === "selected";
}

export class ButtonState {
    constructor(public disabled: boolean, public buttonstyle: StatusClass) {}
}
export class TimeTable {

    public current: ButtonState[];
    private initial: StatusClass[];
    private peroidMapping: number[];
    private p1?: number;
    private p2?: number;

    constructor(initial?: StatusClass[]) {
        if (initial && initial.length === 48) {
            this.initial = initial;
        } else {
            this.initial = []
            for (let i = 0; i < 48; i++) {
                this.initial.push("available");
            }
        }
        this.current = this.initial.map(item => new ButtonState(!available(item), item));
        this.peroidMapping = new Array(48);
        this.devide();
    }

    public handleClick(id: number) {
        if (id === this.p1) {
            if (this.p2 !== undefined) {
                const tmp = this.p1;
                this.p1 = this.p2;
                this.p2 = tmp;
                this.cancelPoint(id);
            } else {
                this.cancelPoint(id);
            }
        } else if (id === this.p2) {
            this.cancelPoint(id);
        } else {
            this.selectPoint(id);
        }
    }

    private available(id: number): boolean {
        return available(this.initial[id]);
    }

    private devide() {
        console.log("devide");
        let currentGroup = 0;
        this.peroidMapping[0] = currentGroup;
        for (let i = 1; i < 48; i++) {
            if (this.available(i) !== this.available(i-1)) {
                currentGroup++;
            }
            this.peroidMapping[i] = currentGroup;
        }
        console.log(this.peroidMapping);
    }

    private selectGroup(id: number) {
        console.log(`select group ${id}`)
        if (!this.available(id) || !inrange(id)) {
            throw new Error("cannot select unavailable group");
        }
        const group = this.peroidMapping[id];
        this.current.forEach((value, index) => {
            value.disabled = this.peroidMapping[index] !== group;
        })
    }

    private selectPoint(id: number) {
        console.log(`set point ${id}`)
        if (this.p1 === undefined) {
            this.p1 = id;
            this.selectGroup(id);
            this.cover(id, id);
        } else {
            this.p2 = id;
            this.reset()
            this.selectGroup(id);
            this.cover(this.p1, id);            
        }
    }

    private cover(begin: number, end: number) {
        const max = Math.max(begin, end);
        const min = Math.min(begin, end);
        console.log(`cover ${min}, ${max}`);
        for (let i = min; i <= max; i++) {
            this.current[i].buttonstyle = "selected";
        }
    }

    private cancelPoint(id: number) {
        console.log(`cancel ${id}`);
        if (this.p2 === undefined) {
            // cancel p1
            this.p1 = undefined;
            this.reset();
        } else {
            // cancel p2
            this.p2 = undefined;
            if (this.p1 !== undefined) {
                // always true
                this.reset();
                this.selectGroup(this.p1);
                this.cover(this.p1, this.p1);
            }
        }
    }

    private reset() {
        console.log("reset");
        this.initial.forEach((value, index) => {
            this.current[index].buttonstyle = value;
            this.current[index].disabled = !available(value);
        })
    }

    
}


