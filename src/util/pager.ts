import { Bean } from '@/model/bean/bean';
import { User } from '@/model/entity/user';
import { News } from '@/model/entity/news';
import { UserBean } from '@/model/bean/user-bean';
import { NewsBean, isNewsBean } from '@/model/bean/news-bean';
import { CommentBean, CommentTarget } from '@/model/bean/comment-bean';
import { VenueBean, defaultVenueBean } from '@/model/bean/venue-bean';
import { OrderBean } from '@/model/bean/order-bean';
import { Comment } from '@/model/entity/comment';
import backend from '@/logic/backend';
import moment from 'moment';
import noop from './no-operation';
import { SiteBean } from '@/model/bean/site-bean';
import { orderStatesMap } from './apis';

export interface Pager<T extends Bean> {
    /**
     * 当前页面元素
     */
    readonly currentPageElements: T[];
    /**
     * 页面大小
     */
    pageSize: number;
    /**
     * 当前页面,从1开始计数
     */
    currentPage: number;
    /**
     * 总页数
     */
    totalCount?: number;
    /**
     * 当前页数改变时需要被调用
     */
    onPageChange(): Promise<any>;
}
export interface PagerResonse<T extends Bean> {
    pageElements: T[];
    totalPageCount: number;
}

export interface RequestPager<T extends Bean> extends Pager<T> {
    request(): Promise<PagerResonse<T>>;
}

function updatePage<T extends Bean>(pager: RequestPager<T>): Promise<any> {
    return new Promise((ac, rj) => {
        pager.request().then((list) => {
            console.log('request success push!')
            pager.currentPageElements.splice(0, pager.currentPageElements.length);
            console.log(list);
            list.pageElements.forEach((item) => {
                pager.currentPageElements.push(item);
            })
            console.log(pager)
            pager.totalCount = list.totalPageCount * pager.pageSize;
            ac();
        }).catch((e) => {
            rj(e);
        })
    });
}

abstract class PagerImpl implements RequestPager<Bean> {
    public currentPageElements: Bean[];
    public totalCount?: number | undefined;
    public currentPage: number;
    constructor(
        public pageSize: number
    ) {
        this.currentPageElements = []
        this.currentPage = 1;
    }
    public onPageChange(): Promise<any> {
        return updatePage(this)
    }
    public abstract request(): Promise<PagerResonse<Bean>>;
}


export class UserPager extends PagerImpl implements RequestPager<UserBean> {

    public currentPageElements: UserBean[] = [];
    public request(): Promise<PagerResonse<UserBean>> {
        // todo;
        throw new Error("Method not implemented.");
    }
}

export class NewsPager extends PagerImpl implements RequestPager<NewsBean> {
    public currentPageElements: NewsBean[] = [];
    public request(): Promise<PagerResonse<NewsBean>> {
        // todo
        // throw new Error();
        return new Promise((ac, rj) => {
            backend.get("/all-news", {
                page: this.currentPage - 1,
                segment: this.pageSize
            }).then((rs) => {
                if (rs.data.code === 200) {
                    const r = rs.data.result;
                    const ele: NewsBean[] = []
                    r.newsList.forEach(v => {
                        ele.push({
                            id: v.id,
                            content: v.content,
                            publisher: User.fromAdminID(v.managerId),
                            imgs: [],
                            title: v.title,
                            time: moment(v.time)
                        })
                    })
                    ele.forEach(v => {
                        backend.get("/news-images", {
                            newsId: v.id
                        }).then((rr) => {
                            v.imgs = rr.data.result.images
                        }).catch(noop)
                    })
                    ac({
                        pageElements: ele,
                        totalPageCount: r.numOfPages
                    }) 
                } else {
                    rj(rs.data.message)
                }
            })
        })
    }
}

export class CommentPager extends PagerImpl implements RequestPager<CommentBean> {
    public currentPageElements: CommentBean[] = [];
    constructor(public pageSize: number, public target: CommentTarget) {
        super(pageSize)
    }
    public request(): Promise<PagerResonse<CommentBean>> {
        // todo
        // throw new Error();
        return new Promise((ac, rj) => {
            // const rnd = Math.floor(Math.random()*this.pageSize)
            const ele: Comment[] = []
            // for (let i = 0; i < rnd; i++) {
            //     ele.push(Comment._default());
            // }
            // ac({
            //     pageElements: ele,
            //     totalPageCount: 7
            // })
            if (!this.target) {
                backend.get("/global-comments",{
                    page: this.currentPage - 1,
                    segment: this.pageSize
                }).then((rs) => {
                    console.log(rs);
                    rs.data.result.comments.forEach(v => {
                        ele.push(new Comment({
                            id: v.id,
                            content: v.content,
                            target: this.target,
                            time: moment(),
                            user: User.fromID(v.userId)
                        }))
                    })
                    ac({
                        pageElements:ele,
                        totalPageCount: rs.data.result.num_of_pages
                    })
                }).catch(noop);
            } else if (isNewsBean(this.target)) {
                backend.get("/news-comments", {
                    page: this.currentPage - 1,
                    segment: this.pageSize,
                    newsId: this.target.id
                }).then(rs => {
                    rs.data.result.comments.forEach(v => {
                        ele.push(new Comment({
                            id: v.id,
                            content: v.content,
                            target: this.target,
                            time: moment(),
                            user: User.fromID(v.userId)
                        }))
                    })
                    ac({
                        pageElements:ele,
                        totalPageCount: rs.data.result.num_of_pages
                    })
                }).catch(noop)
            } else {
                backend.get("/venue-comments", {
                    page: this.currentPage - 1,
                    segment: this.pageSize,
                    venueId: this.target.id
                }).then(rs => {
                    this.totalCount = rs.data.result.num_of_pages;
                    rs.data.result.comments.forEach(v => {
                        ele.push(new Comment({
                            id: v.id,
                            content: v.content,
                            target: this.target,
                            time: moment(),
                            user: User.fromID(v.userId)
                        }))
                    })
                    ac({
                        pageElements:ele,
                        totalPageCount: rs.data.result.num_of_pages
                    })
                }).catch(noop)
            }
        })
    }
}

export class VenuePager extends PagerImpl implements RequestPager<VenueBean> {
    public currentPageElements: VenueBean[] = [];
    public request(): Promise<PagerResonse<VenueBean>> {
        // todo
        throw new Error();
    }
}

export class AllVenuePager extends VenuePager {
    public request(): Promise<PagerResonse<VenueBean>> {
        return new Promise((ac, rj) => {
            backend.get("/venues",{
                page: this.currentPage-1,
                segment: this.pageSize
            }).then((rs) => {
                const dt = rs.data
                if (dt.code === 200) {
                    const ls: VenueBean[] = [];
                    dt.result.venues.forEach(v => {
                        ls.push({
                            id: v.id,
                            name: v.name,
                            address: v.address,
                            cover: v.cover,
                            beginTime: moment.utc(v.beginTime),
                            endTime: moment.utc(v.endTime)
                        } as VenueBean)
                    })
                    ac({
                        pageElements: ls,
                        totalPageCount: dt.result.num_of_pages
                    })
                }
            }).catch(noop)
        });
    }
}

export class SearchVenuePager extends VenuePager {

    public keyword?: string;
    public searchResult?: VenueBean[];

    constructor(pageSize: number) {
        super(pageSize)
    }

    public request(): Promise<PagerResonse<VenueBean>> {
        // if (this.searchResult) {
        //     return new Promise((ac) => {
        //         if (this.searchResult) {
        //             const start = this.pageSize * (this.currentPage - 1)
        //             ac({
        //                 pageElements:this.searchResult.slice(start,start + this.pageSize),
        //                 totalPageCount:Math.floor(this.searchResult.length/this.pageSize)
        //             })
        //         }
        //     })
        // }
        return new Promise((ac, rj) => {
            // todo search with keyword
            if (this.keyword) {

                backend.get("/venue", {
                    name: this.keyword,
                    segment:this.pageSize,
                    page: this.currentPage - 1
                }).then(rs => {
                    const ele: VenueBean[] = []
                    rs.data.result.venues.forEach(v => {
                        ele.push({
                            id: v.id,
                            name: v.name,
                            address: v.address,
                            cover: v.cover,
                            beginTime: moment.utc(v.beginTime),
                            endTime: moment.utc(v.endTime)
                        } as VenueBean)
                    })
                    ac({
                         pageElements: ele,
                         totalPageCount: rs.data.result.num_of_pages

                    })
                }).catch(noop)
            }
        })
    }
}

export class OrderPager extends PagerImpl implements RequestPager<OrderBean> {
    public currentPageElements: OrderBean[] = [];
    public request(): Promise<PagerResonse<OrderBean>> {
        // todo
        throw new Error()
    }
}


export class UserOrderPager extends OrderPager {

    constructor(pageSize: number, public user: UserBean) {
        super(pageSize)
    }
    public request(): Promise<PagerResonse<OrderBean>> {
        return new Promise((ac, rj) => {
            backend.get("/orders", {
                id: this.user.id,
                page: this.currentPage - 1,
                segment: this.pageSize
            }).then(rs => {
                if (rs.data.code === 200) {
                    const ele: OrderBean[] = []
                    rs.data.result.details.forEach(v => {
                        ele.push({
                            id: v.id,
                            user:this.user,
                            site: {
                                name: v.siteName,
                                image: v.siteImage,
                            } as SiteBean,
                            startTime: moment(v.reserveDate + " " + v.beginTime),
                            endTime: moment(v.reserveDate + " " + v.endTime),
                            status: orderStatesMap[v.state]
                        })
                    })
                    ac({
                        pageElements: ele,
                        totalPageCount: rs.data.result.num_of_pages
                    })
                }
            })
        })
    }
}



