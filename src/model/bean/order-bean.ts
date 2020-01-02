import { Bean } from "./bean";
import { UserBean, defaultUserBean, emptyUserBean } from "./user-bean";
import { SiteBean, defaultSiteBean, emptySiteBean } from "./site-bean";
import { Moment } from "moment";
import moment from "moment";

export enum OrderStatusEnum {
  // 未开始
  Pending,
  // 已完成
  TimePassed,
  // 已取消
  UserCanceled,
  // 管理员取消
  AdminCanceled
}

export interface OrderBean extends Bean {
  user: UserBean;
  site: SiteBean;
  startTime: Moment;
  endTime: Moment;
  status: OrderStatusEnum;
}

export const defaultOrderBean: OrderBean = {
  id: -1,
  user: defaultUserBean,
  site: defaultSiteBean,
  startTime: moment.utc(),
  endTime: moment.utc(),
  status: OrderStatusEnum.Pending
};

export const emptyOrderBean: OrderBean = {
  id: 0,
  user: emptyUserBean,
  site: emptySiteBean,
  startTime: moment.utc(),
  endTime: moment.utc(),
  status: OrderStatusEnum.Pending
};
