import { Entity } from "./entity";
import {
  CommentBean,
  CommentTarget,
  defaultCommentBean,
  emptyCommentBean
} from "../bean/comment-bean";
import { UserBean } from "../bean/user-bean";
import { Moment } from "moment";

export class Comment extends Entity implements CommentBean {
  public static _default(): Comment {
    return new Comment(defaultCommentBean);
  }
  public static _empty(): Comment {
    return new Comment(emptyCommentBean);
  }
  public user!: UserBean;
  public time!: Moment;
  public target!: CommentTarget;
  public content!: string;
  constructor(bean?: CommentBean) {
    super(bean)
  }
  public _default(): Comment {
    return new Comment(defaultCommentBean);
  }
  public clone(): Comment {
    return new Comment(this);
  }
}
