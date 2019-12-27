import { Bean } from "./bean";
import { UserBean, defaultUserBean, emptyUserBean } from "./user-bean";
import moment from "moment";
import { Moment } from "moment";
import { NewsBean, defaultNewsBean, emptyNewsBean } from "./news-bean";
import { VenueBean } from "./venue-bean";

export type CommentTarget = NewsBean | VenueBean | undefined;

export interface CommentBean extends Bean {
  user: UserBean;
  time: Moment;
  target: CommentTarget;
  content: string;
}

export const defaultCommentBean: CommentBean = {
  id: -1,
  user: defaultUserBean,
  time: moment(),
  target: defaultNewsBean,
  content: `
    （这是一条默认评论）
            这是第一行，错开的
    这是第二行，有 空 格F
    这是第三行而且F这行非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长`
};

export const emptyCommentBean: CommentBean = {
  id: 0,
  user: emptyUserBean,
  time: moment(),
  target: emptyNewsBean,
  content: ""
};
