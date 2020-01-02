import { Entity } from "./entity";
import { VenueBean, defaultVenueBean, emptyVenueBean } from "../bean/venue-bean";
import moment, { Moment } from "moment";
import { SiteBean } from '../bean/site-bean';
import { Site } from './site';
import backend from '@/logic/backend';

export class Venue extends Entity implements VenueBean {

  public static fromID(id: number): Venue {
    const venue = Venue._empty()
    backend.get("/venue-detail", {
      id
    }).then(rs => {
      if (rs.data.code === 200) {
        const v = rs.data.result
        venue.update({
          id: v.id,
          name: v.name,
          address: v.address,
          phone: v.phone,
          price: 0,
          introduction: v.introduction,
          images: v.images,
          cover: "",
          beginTime: moment(v.beginTime),
          endTime: moment(v.endTime),
          sites: []
        })
        v.sites.forEach(s => {
          venue.sites.push({
            id: s.id,
            image: s.image,
            name: s.name,
            introduction: s.intruction,
            price: s.price,
            venueID: s.venueId
          })
        })
      }
    })
    return venue
  }

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

  public update(bean: VenueBean) {
    super.update(bean);
    return this
  }
}
