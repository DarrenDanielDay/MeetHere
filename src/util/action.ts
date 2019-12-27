import { Constructor } from 'vue/types/options';
import { isElForm } from './element-ui-types';

export interface Action {
    perform(): Promise<any>;
}

export function AlwaysPromise(): Promise<any> {
    return new Promise((ac) => ac());
}

export function DelayPromise(milliseconds: number): Promise<any> {
    return new Promise(ac => {
        setTimeout(() => {
            ac();
        }, milliseconds);
    });
}

export function isAction(obj: any): obj is Action {
    return obj.perform !== undefined;
}

export class PromiseAction implements Action {
    constructor(public promise: Promise<any>) { }
    public perform() {
        return this.promise;
    }
}

export class DelayAction implements Action {
    constructor(public duration: number) { }
    public perform() {
        return DelayPromise(this.duration);
    }
}

export type ActionFunction = (...args: any[]) => Promise<any>;

export type AnyFunction = (...args: any[]) => any;

export type NoParamReturnFunction = () => void;

export class CallbackAction implements Action {

    public static always(): Action {
        return new CallbackAction(() => new Promise((ac) => ac()));
    }

    constructor(public cb: ActionFunction) { }

    public perform(): Promise<any> {
        return this.cb();
    }

}

export class AlwaysAction implements Action {
    public perform() {
        return AlwaysPromise();
    }
}

export class SimpleAction implements Action {
    constructor(private cb: NoParamReturnFunction) { }
    public perform() {
        try {
            this.cb();
        } catch (e) {
            console.warn("Exceprtion in simple action:");
            console.warn(e);
        }
        return AlwaysPromise();
    }
}

export class ChainAction implements Action {

    private notifyAccept?: AnyFunction;
    private notifyReject?: AnyFunction;
    private actions: Action[];
    private isPerforming: boolean;
    private isWaiting: boolean;

    constructor() {
        this.actions = [];
        this.isPerforming = false;
        this.isWaiting = false;
    }

    public next(action: Action | NoParamReturnFunction | Promise<any>): ChainAction {
        if (this.isPerforming) {
            console.warn("cannot add chain when performing");
            return this;
        }
        if (isAction(action)) {
            // console.log("add action");
            this.actions.push(action);
        } else if (action instanceof Promise) {
            // console.log("add promise action");
            this.actions.push(new PromiseAction(action));
        } else {
            // console.log("add simple action");
            this.actions.push(new SimpleAction(action));
        }
        return this;
    }

    public clear(): ChainAction {
        this.actions = []
        return this;
    }

    public wait(): ChainAction {
        // console.log("add wait action");
        return this.next(new CallbackAction(() => {
            if (this.isWaiting) {
                console.warn("the chain is already waiting!");
                return AlwaysPromise();
            }
            this.isWaiting = true;
            return new Promise((ac, rj) => {
                this.notifyAccept = ac;
                this.notifyReject = rj;
            });
        }))
    }

    public notify(result?: any): void {
        const timer = setInterval(() => {
            if (this.notifyAccept) {
                // console.log("notify!")
                this.notifyAccept(result);
                this.notifyAccept = undefined;
                this.isWaiting = false;
                clearInterval(timer);
            }
        },100);
    }

    public abort(reason?: any): void {
        const timer = setInterval(() => {
            if (this.notifyReject) {
                // console.log("abort!")
                this.notifyReject(reason);
                this.notifyReject = undefined;
                this.isWaiting = false;
                clearInterval(timer);
            }
        },100);
    }

    public perform() {
        this.isPerforming = true;
        const actions: Action[] = this.actions.map(item => item);
        return this._perform(actions);
    }

    private _perform(actions: Action[]): Promise<any> {
        
        const promise = new Promise((ac, rj) => {
            if (actions.length === 0) {
                ac();
                this.finish();
            } else {
                const action = actions[0];
                // console.log("performing action:")
                // console.log(action);
                action.perform().then(() => {
                    this._perform(actions)
                    .then(() => {
                        ac();
                    })
                    .catch((e) => {
                        rj(e);
                        this.finish();
                    });
                }).catch((e) => {
                    rj(e);
                    this.finish();
                });
                actions.splice(0, 1)
            }
        });
        return promise;
    }

    private finish() {
        this.isPerforming = false;
    }
}

export const actionTypes: Constructor[] = [
    PromiseAction,
    CallbackAction,
    AlwaysAction,
    SimpleAction,
    ChainAction,
    DelayAction
];

export class CheckFormAction implements Action {
    private cb: ActionFunction;

    constructor(private vue: Vue, private formRefname: string) {
        this.cb = () => {
            const form = vue.$refs[formRefname];
            if (isElForm(form)) {
                return form.validate()
            } else {
                throw new Error("cannot find el-form!");
            }
        }
    }

    public perform() {
        return this.cb();
    }
}

