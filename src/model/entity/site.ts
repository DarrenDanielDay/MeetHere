import { Entity } from "./entity";
import { SiteBean, defaultSiteBean, emptySiteBean } from "../bean/site-bean";
import backend from '@/logic/backend';
import noop from '@/util/no-operation';
import { Optional } from '../bean/bean';

export class Site extends Entity implements SiteBean {
  public static fromID(id: number): Site {
    const site: Site = Site._empty();
    site.id = id;
    backend.get("/site-detail",{id}).then((rs) => {
      const d = rs.data.result
      site.update({
        introduction: d.siteIntro,
        name:d.siteName,
        price:d.sitePrice,
        image:d.siteUrl
      })
    }).catch(noop);
    return site
  }

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

  public update(bean: Optional<SiteBean>) {
    super.update(bean as SiteBean);
    return this
  }
}
