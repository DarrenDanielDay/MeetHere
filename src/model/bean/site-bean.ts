import { Bean } from "./bean";
import { defaultImage } from '@/util/images';

export interface SiteBean extends Bean {
  name: string;
  venueID: number;
  introduction: string;
  image: string;
  price: number;
}

export const defaultSiteBean: SiteBean = {
  id: -1,
  name: "default-site",
  venueID: -1,
  introduction: "empty introduction...",
  image: defaultImage,
  price: 100
};

export const emptySiteBean: SiteBean = {
  id: 0,
  name: "",
  venueID: 0,
  introduction: "",
  image: "",
  price: 0
};
