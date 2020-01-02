import Axios from "axios";
import { Dictionary } from 'vue-router/types/router';
import {
    MeetHereAPI,
    MeetHereResponse,
    GetOnlyAPI,
    MeetHereAPIMapper,
    PostOnlyAPI,
    MeetHereAPIParameterMapper,
    DeleteOnlyAPI,
    PutOnlyAPI
} from '../util/apis';
import { forceCast } from '../util/cast';
import app from '@/main';
export type Method = "get" | "post" | "put" | "delete";

export type Parameter<API extends keyof MeetHereAPIParameterMapper> = MeetHereAPIParameterMapper[API];


type GetAPI = MeetHereAPI & GetOnlyAPI & keyof MeetHereAPIMapper;
type PostAPI = MeetHereAPI & PostOnlyAPI & keyof MeetHereAPIMapper;
type PutAPI = MeetHereAPI & PutOnlyAPI & keyof MeetHereAPIMapper;
type DeleteAPI = MeetHereAPI & DeleteOnlyAPI & keyof MeetHereAPIMapper;

export interface Backend {
    get<T extends GetAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]>;
    post<T extends PostAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]>;
    put<T extends PutAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]>;
    delete<T extends DeleteAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]>;
}

const headers = {
    "content-type" : "application/json"
}


class MeetHereBackend implements Backend {
    
    
    private domain: string = 'https://ecnuer996.cn';
    private api: string = '/MeetHere/api'

    constructor() {
        
    }

    public get<T extends GetAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]>  {
        console.log("GET");
        console.log(api,"api");
        console.log(params,"params")
        return new Promise<MeetHereAPIMapper[T]>((ac, rj) => {
            Axios({
                method: "get",
                url: this.getURL(api),
                params,
                headers
            }).then((rs) => {
                console.log(rs,"response")
                ac(forceCast(rs))
            }).catch((e) => {
                app.$message({
                    type: "error",
                    message: `网络错误！${e}`
                })
                rj(e)
            })
        });
    }
    public post<T extends PostAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]> {
        console.log("POST");
        console.log(api,"api");
        console.log(params,"params")
        return new Promise<MeetHereAPIMapper[T]>((ac, rj) => {
            Axios({
                method: "post",
                url: this.getURL(api),
                data: JSON.stringify(params),
                headers
            }).then((rs) => {
                console.log(rs,"response")
                ac(forceCast(rs))
            }).catch((e) => {
                app.$message({
                    type: "error",
                    message: `网络错误！${e}`
                })
                rj(e)
            })
        });
    }
    public put<T extends PutAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]> {
        return new Promise<MeetHereAPIMapper[T]>((ac, rj) => {
            Axios({
                method: "put",
                url: this.getURL(api),
                data: JSON.stringify(params),
                headers
            }).then((rs) => {
                ac(forceCast(rs))
            }).catch((e) => {
                app.$message({
                    type: "error",
                    message: `网络错误！${e}`
                })
                rj(e)
            })
        });
    }
    public delete<T extends DeleteAPI>(api: T, params: Parameter<T>): Promise<MeetHereAPIMapper[T]> {
        return new Promise<MeetHereAPIMapper[T]>((ac, rj) => {
            Axios({
                method: "delete",
                url: this.getURL(api),
                params,
                headers
            }).then((rs) => {
                ac(forceCast(rs))
            }).catch((e) => {
                rj(e)
            })
        });
    }

    private getURL(api: MeetHereAPI): string {
        return `${this.domain}${this.api}${api}`;
    }
}

const backend = new MeetHereBackend();

export default backend;

export { backend };
export { MeetHereBackend };
