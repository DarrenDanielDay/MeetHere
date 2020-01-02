import { Bean } from "./bean";
import { Moment } from "moment";
import moment from "moment";
import { SiteBean, defaultSiteBean } from './site-bean';
import { defaultImages, defaultImage } from '@/util/images';
import { Site } from '../entity/site';

export interface VenueBean extends Bean {
  name: string;
  address: string;
  introduction: string;
  phone: string;
  price: number;
  beginTime: Moment;
  endTime: Moment;
  images: string[];
  sites: SiteBean[];
  cover: string;
}

export const defaultVenueBean: VenueBean = {
  id: -1,
  name: "default-venue",
  address: "address",
  introduction: "intro...",
  phone: "12345678901",
  price: 100,
  beginTime: moment.utc(),
  endTime: moment.utc(),
  images: defaultImages,
  sites: [defaultSiteBean],
  cover: defaultImage,  
};

export const emptyVenueBean: VenueBean = {
  id: 0,
  name: "",
  address: "",
  introduction: "",
  phone: "",
  price: 0,
  beginTime: moment(),
  endTime: moment(),
  images: [],
  sites: [],
  cover: ""
};

export function isVenueBean(obj: any): obj is VenueBean {
  return obj && obj.sites !== undefined;
} 
