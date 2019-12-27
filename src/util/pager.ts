import { Bean } from '@/model/bean/bean';
import { User } from '@/model/entity/user';
import { News } from '@/model/entity/news';
import { UserBean } from '@/model/bean/user-bean';
import { NewsBean } from '@/model/bean/news-bean';
import { CommentBean } from '@/model/bean/comment-bean';
import { VenueBean } from '@/model/bean/venue-bean';
import { OrderBean } from '@/model/bean/order-bean';

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
            pager.currentPageElements.splice(0, pager.currentPageElements.length);
            list.pageElements.forEach((item) => {
                pager.currentPageElements.push(item);
            })
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
        public pageSize: number,
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
            ac({
                pageElements: [News._default()],
                totalPageCount: 7
            })
        })
    }
}

export class CommentPager extends PagerImpl implements RequestPager<CommentBean> {
    public currentPageElements: CommentBean[] = [];
    public request(): Promise<PagerResonse<CommentBean>> {
        // todo
        throw new Error();
    }
}

export class VenuePager extends PagerImpl implements RequestPager<VenueBean> {
    public currentPageElements: VenueBean[] = [];
    public request(): Promise<PagerResonse<VenueBean>> {
        // todo
        throw new Error();
    }
}

export class OrderPager extends PagerImpl implements RequestPager<OrderBean> {
    public currentPageElements: OrderBean[] = [];
    public request(): Promise<PagerResonse<OrderBean>> {
        // todo
        throw new Error();
    }
}


