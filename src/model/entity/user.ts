import { UserBean, defaultUserBean, defaultAdminBean, emptyUserBean, emptyAdminBean } from "../bean/user-bean";
import { Entity } from "./entity";

export class User extends Entity implements UserBean {
  public static _default(): User {
    return new User(defaultUserBean);
  }

  public static _empty(): User {
    return new User(emptyUserBean);
  }

  public static _admin(): User {
    return new User(defaultAdminBean);
  }

  public static _emptyAdmin(): User {
    return new User(emptyAdminBean);
  }

  public id!: number;
  public nickname!: string;
  public isAdmin!: boolean;
  public avatar!: string;
  public email!: string;
  public mobilephone!: string;
  public isLoggedIn!: boolean;

  constructor(bean?: UserBean) {
    super(bean);
  }

  public _default(): User {
    return new User(defaultUserBean);
  }

  public clone(): User {
    return new User(this);
  }
}
