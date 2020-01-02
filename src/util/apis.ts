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
    result: T;
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
    "/accept-rediscover": {
        username: string
    }
    "/refuse-rediscover": {
        username: string
    }
    "/get-forget-users": {};
    "/reserve": {
        siteId: number,
        userId: number,
        bookDate: string,
        beginPeriod: number,
        endPeriod: number
    }
    "/delete-site": {
        id: number
    };
    "/forget-password": {
        username: string
    };
    "/topNVenues": {
        n: number
    };
    "/news-images": {
        newsId: number
    };
    "/news": {
        newsId: number
    };
    "/all-news": {
        page: number,
        segment: number
    };
    "/modify-comment": {
        commentId: number,
        content: string,
        userId: number
    }
    "/site-time-list": {
        date: string,
        id: number
    };
    "/orders": {
        id: number,
        page: number,
        segment: number
    };
    "/get-user-by-id": {
        id: number
    };
    "/sign-in": {
        userId?: number,
        identifier: string,
        identityType: "nickname",
        credential: string
    };
    "/sign-up": {
        nickname: string,
        password: string,
        email: string,
        phone: string
    };
    "/update-user-info": {
        avatar: string,
        email: string,
        id: number,
        nickname: string,
        phone: string
    };
    "/update-avatar": {
        file: FormData,
        userId: number
    };
    "/site-detail": {
        id: number
    };
    "/venue": {
        name: string,
        page: number,
        segment: number
    };
    "/venues": {
        page: number,
        segment: number
    };
    "/venue-detail": {
        id: number
    };
    "/add-global-comment": {
        content: string,
        userId: number
    };
    "/add-news-comment": {
        content: string,
        userId: number,
        newsId: number
    };
    "/add-venue-comment": {
        content: string,
        userId: number,
        venueId: number
    };
    "/delete-comment": {
        id: string | number
    };
    "/discover-comments": {};
    "/global-comments": {
        page: number,
        segment: number
    };
    "/news-comments": {
        page: number,
        segment: number,
        newsId: number
    };
    "/venue-comments": {
        page: number,
        segment: number,
        venueId: number ;
    };
    
}

export type BookableEnum = -1 | 0 | 1;

/**
 * api返回类型映射接口，实现后可用于前端单独测试
 */

export interface MeetHereAPIMapper {
    "/accept-rediscover": MeetHereResponse<NoMoreInfo>;
    "/refuse-rediscover": MeetHereResponse<NoMoreInfo>;
    "/get-forget-users": MeetHereResponse<Array<{
        id: number,
        nickname: string,
        avatar: string,
        phone: string,
        email: string
    } | null>>
    "/reserve": MeetHereResponse<{
        detail: {
            siteName: string,
            siteImage: string,
            venueName: string,
            bookTime: string,
            reserveDate: string,
            cost: number,
            beginTime: string,
            endTime: string,
            state: string
        }
    }>;
    "/delete-site": MeetHereResponse<NoMoreInfo>;
    "/forget-password": MeetHereResponse<NoMoreInfo>;
    "/topNVenues": MeetHereResponse<{
        venues: Array<{
            rank: number,
            venueId: number,
            times: number
        }>
    }>;
    "/news-images": MeetHereResponse<{
        images: string[]
    }>
    "/news": MeetHereResponse<{
        news: {
            id: number,
            managerId: number,
            time: string,
            title: string,
            content: string
        }
    }>;
    "/all-news": MeetHereResponse<{
        newsList: Array<{
            id: number,
            managerId: number,
            time: string,
            title: string,
            content: string
        }>,
        numOfPages: number
    }>
    "/modify-comment": MeetHereResponse<NoMoreInfo>;
    "/site-time-list": MeetHereResponse<{
        times: {

            siteTimes: Array<{
                bookable: BookableEnum,
                periodId: number,
                period: string
            }>,
            bookDate: string
        }
    }>;
    "/orders": MeetHereResponse<{
        // todo
    }>;
    "/get-user-by-id": MeetHereResponse<{
        id: number,
        nickname: string,
        avatar: string,
        phone: string,
        email: string
    }>;
    "/sign-in": MeetHereResponse<{
        id: number,
        nickname: string,
        avatar: string,
        phone: string,
        email: string
    }>;
    "/sign-up": MeetHereResponse<NoMoreInfo>;
    "/update-user-info": MeetHereResponse<NoMoreInfo>;
    "/update-avatar": MeetHereResponse<NoMoreInfo>
    "/site-detail": MeetHereResponse<{
        sitePrice: number,
        siteUrl: string,
        siteName: string,
        siteIntro: string
    }>;
    "/venue-detail": MeetHereResponse<{
        images: string[],
        address: string,
        phone: string,
        name: string,
        sites: Array<{
            id: number,
            name: string,
            venueId: number,
            intruction: string,
            image: string,
            price: number
        }>,
        id: number,
        beginTime: string,
        endTime: string,
        introduction: string
    }>;
    "/venue": MeetHereResponse<{
        num_of_pages: number,
        venues: Array<{
            id: number,
            name: string,
            address: string,
            beginTime: string,
            endTime: string,
            cover: string
        }>,
    }>;
    "/venues": MeetHereResponse<{
        num_of_pages: number,
        venues: Array<{
            id: number,
            name: string,
            address: string,
            beginTime: string,
            endTime: string,
            cover: string
        }>,
    }>;
    "/add-global-comment": MeetHereResponse<NoMoreInfo>;
    "/add-news-comment": MeetHereResponse<NoMoreInfo>;
    "/add-venue-comment": MeetHereResponse<NoMoreInfo>;
    "/delete-comment": MeetHereResponse<NoMoreInfo>;
    "/discover-comments": MeetHereResponse<NoMoreInfo>;
    "/global-comments": MeetHereResponse<{
        num_of_pages: number,
        comments: Array<{
            id: number,
            type: string,
            userId: number,
            content: string,
            link: number
        }>
    }>;
    "/news-comments": MeetHereResponse<{
        num_of_pages: number,
        comments: Array<{
            id: number,
            type: string,
            userId: number,
            content: string,
            link: number
        }>
    }>;
    "/venue-comments": MeetHereResponse<{
        num_of_pages: number,
        comments: Array<{
            id: number,
            type: string,
            userId: number,
            content: string,
            link: number
        }>
    }>;
}

/**
 * 按method分类的api
 */

export type GetOnlyAPI =
    "/accept-rediscover" |
    "/add-global-comment" |
    "/add-news-comment" |
    "/add-venue-comment" |
    "/all-news" |
    "/delete-comment" |
    "/forbid-user" |
    "/forget-password" |
    "/get-forget-users" |
    "/get-user-by-id"|
    "/global-comments" |
    "/modify-comment" |
    "/news" |
    "/news-images" |
    "/news-comments" |
    "/orders" |
    "/permit-user" |
    "/refuse-rediscover" |
    "/venue" |
    "/venues" |
    "/venue-comments" |
    "/venue-detail" |
    "/site" |
    "/site-detail" |
    "/site-time-list" |
    "/topNVenues" |
    "/users";

export type PostOnlyAPI = 
    "/add-site" |
    "/add-news" |
    "/add-venue" |
    "/manager-sign-in" |
    "/reserve" |
    "/sign-up" |
    "/sign-in" |
    "/update-avatar"|
    "/update-site" |
    "/update-user-info" | 
    "/update-venue";

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
    "/topNVenues" |
    "/update-site" |
    "/update-venue" |
    "/venue" |
    "/venues" |
    "/venue-detail";

export type NewsAPI =
    "/add-news" |
    "/all-news" |
    "/news" |
    "/news-images";

export type UserAPI =
    "/forbid-user" |
    "/permit-user" |
    "/sign-in" |
    "/sign-up" |
    "/update-user-info" |
    "/update-avatar" |
    "/users" |
    "/get-user-by-id" |
    "/forget-password";

export type ManagerAPI =
    "/accept-rediscover" |
    "/refuse-rediscover" |
    "/get-forget-users" |
    "/manager-sign-in";

export type CommentAPI =
    "/add-global-comment" |
    "/add-news-comment" |
    "/add-venue-comment" |
    "/delete-comment" |
    "/discover-comment" |
    "/global-comments" |
    "/modify-comment" |
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


