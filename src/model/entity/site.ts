import { Entity } from "./entity";
import { SiteBean, defaultSiteBean, emptySiteBean } from "../bean/site-bean";

export class Site extends Entity implements SiteBean {
  public static _default(): Site {
    return new Site(defaultSiteBean);
  }
  public static _empty(): Site {
    return new Site(emptySiteBean);
  }
  public name!: string;
  public venueID!: number;
  public introduction!: string;
  public image!: string;
  public price!: number;

  constructor(bean?: SiteBean) {
    super(bean);
  }

  public _default(): Site {
    return new Site(defaultSiteBean);
  }

  public clone(): Site {
    return new Site(this);
  }
}
