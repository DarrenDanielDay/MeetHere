import { Method } from '../logic/backend';

// 对接时需要添加

export interface MeetHereResponseData<T> {
    code: number;
    // 如有可能，也可以枚举出code的所有取值，例如
    // code: 200 | 404 | 503 | ...
    message: string;    
    // T可以是任何实体对象（或省略部分属性的实体）
    // 也可以是实体对象的列表
    // 也可以是未定义
    result?: T;
}

export interface NoMoreInfo {
    
}

export interface MeetHereResponse<T> {
    data: MeetHereResponseData<T>;
    status: number;
    statusText: string;
    headers: {"content-type": string};
    config: { url: string, method: Method, data: string};
}

/**
 * api参数格式的映射接口，发生变化后能很快检查出需要修改的地方
 */

export interface MeetHereAPIParameterMapper {
    "/sign-in": {
        id: string | number,
        method: "nickname",
        credential: string
    };
    "/sign-up": {
        nickname: string,
        password: string,
        email: string,
        phone: string
    }

}


/**
 * api返回类型映射接口，实现后可用于前端单独测试
 */

export interface MeetHereAPIMapper {
    "/sign-in": MeetHereResponse<NoMoreInfo>;
    "/sign-up": MeetHereResponse<NoMoreInfo>;
}

/**
 * 按method分类的api
 */

export type GetOnlyAPI =
    "/users";

export type PostOnlyAPI = 
    "/sign-up" |
    "/sign-in";

export type PutOnlyAPI =
    "/???"

export type DeleteOnlyAPI = 
    "/delete-site"

/**
 * 按controller分类的apis
 */

export type SiteAPI = 
    "/site-detail";

export type VenueAPI = 
    "/site-detail" |
    "/add-site" |
    "/add-venue" |
    "/delete-site" |
    "/update-site" |
    "/update-venue";

export type NewsAPI =
    "/add-news" |
    "/all-news" |
    "/news" |
    "/news-images";

export type UserAPI =
    "/forbit-user" |
    "/permit-user" |
    "/sign-in" |
    "/sign-up" |
    "/update-user-info" |
    "/users";

export type ManagerAPI =
    "/manager-sign=in";

export type CommentAPI =
    "/add-global-comment" |
    "/add-news-comment" |
    "/add-venue-comment" |
    "/delete-comment" |
    "/discover-comment" |
    "/global-comments" |
    "/news-comments" |
    "/venue-comments";

export type OrderAPI =
    "/orders" |
    "/reserve" |
    "/site" |
    "/site-time-list" |
    "/venue" |
    "/venue-detail" |
    "/venues";

export type ErrorControllerAPI =
    "/error";

export type MeetHereAPI = 
    SiteAPI |
    VenueAPI |
    NewsAPI |
    UserAPI |
    ManagerAPI |
    CommentAPI |
    OrderAPI |
    ErrorControllerAPI;


