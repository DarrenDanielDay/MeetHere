import { Entity } from "./entity";
import {
  OrderBean,
  OrderStatusEnum,
  defaultOrderBean,
  emptyOrderBean
} from "../bean/order-bean";
import { UserBean } from "../bean/user-bean";
import { SiteBean } from "../bean/site-bean";
import { Moment } from "moment";

export class Order extends Entity implements OrderBean {
  public static _default(): Order {
    return new Order(defaultOrderBean);
  }
  public static _empty(): Order {
    return new Order(emptyOrderBean);
  }

  public user!: UserBean;
  public site!: SiteBean;
  public startTime!: Moment;
  public endTime!: Moment;
  public status!: OrderStatusEnum;

  constructor(bean?: OrderBean) {
    super(bean);
  }

  public _default(): Order {
    return new Order(defaultOrderBean);
  }

  public clone(): Order {
    return new Order(this);
  }
}
