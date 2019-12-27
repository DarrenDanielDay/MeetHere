import { Entity } from "./entity";
import { VenueBean, defaultVenueBean, emptyVenueBean } from "../bean/venue-bean";
import { Moment } from "moment";
import { SiteBean } from '../bean/site-bean';
import { Site } from './site';

export class Venue extends Entity implements VenueBean {
  public static _default(): Venue {
    return new Venue(defaultVenueBean);
  }
  public static _empty(): Venue {
    return new Venue(emptyVenueBean);
  }
  public name!: string;
  public address!: string;
  public introduction!: string;
  public phone!: string;
  public price!: number;
  public beginTime!: Moment;
  public endTime!: Moment;
  public images!: string[];
  public cover!: string;
  public sites!: SiteBean[];
  constructor(bean: VenueBean) {
    super(bean);
  }

  public _default(): Venue {
    return new Venue(defaultVenueBean);
  }

  public clone(): Venue {
    const venue = new Venue(this);
    venue.images = this.images.map(item => item);
    venue.sites = this.sites.map(item => {
      return new Site({
        id: item.id,
        image:item.image,
        introduction:item.introduction,
        name:item.name,
        price:item.price,
        venueID:item.venueID
      });
    });
    return venue;
  }
}
