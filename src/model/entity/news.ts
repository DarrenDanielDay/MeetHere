import { Entity } from "./entity";
import { NewsBean, defaultNewsBean, emptyNewsBean } from "../bean/news-bean";
import { UserBean } from "../bean/user-bean";
import { Moment } from "moment";

export class News extends Entity implements NewsBean {
  public static _default(): News {
    return new News(defaultNewsBean);
  }
  public static _empty(): News {
    return new News(emptyNewsBean);
  }
  public content!: string;
  public imgs!: string[];
  public title!: string;
  public publisher!: UserBean;
  public time!: Moment;
  constructor(bean: NewsBean) {
    super(bean);
  }
  public _default(): News {
    return new News(defaultNewsBean);
  }
  public clone(): News {
    const news = new News(this);
    news.imgs = this.imgs.map(item => item);
    return news;
  }
}
