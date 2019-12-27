import { Bean } from "./bean";
import { UserBean, defaultAdminBean, emptyUserBean } from "./user-bean";
import { Moment } from "moment";
import moment from "moment";
import { defaultImages } from '@/util/images';

export interface NewsBean extends Bean {
  content: string;
  imgs: string[];
  title: string;
  publisher: UserBean;
  time: Moment;
}

export const defaultNewsBean: NewsBean = {
  id: -1,
  content: `假新闻的第一行
    假新闻的第二行，有 空 格，错开的
  假新闻的第三行，而且非常非常非常非常非常非常非常非常非常长
  4
  5
  6
  7
  8
  9
  0
  1
  2
  3
  4
  5
  6
  7
  8
  9
  0
  1

  3
  4

              `,
  imgs: defaultImages,
  title: "假新闻",
  publisher: defaultAdminBean,
  time: moment()
};

export const emptyNewsBean: NewsBean = {
  id: 0,
  content: "",
  title: "",
  time: moment(),
  imgs: [],
  publisher: emptyUserBean
};
