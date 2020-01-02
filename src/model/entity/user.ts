import { UserBean, defaultUserBean, defaultAdminBean, emptyUserBean, emptyAdminBean } from "../bean/user-bean";
import { Entity } from "./entity";
import backend from '@/logic/backend';

export class User extends Entity implements UserBean {
  public static _default(): User {
    return new User(defaultUserBean);
  }

  public static _empty(): User {
    return new User(emptyUserBean);
  }

  public static fromID(id: number): User {
    let user = new User(defaultUserBean);
    backend.get("/get-user-by-id", {
      id: id
    }).then((rs) => {
      const bean = rs.data.result
      user.update({
        nickname: bean.nickname,
        mobilephone: bean.phone,
        avatar: bean.avatar,
        isAdmin: false,
        email: bean.email,
        id: bean.id
      })
    })
    return user;
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

  public update(bean: {[K in keyof UserBean]?:UserBean[K]}): User {
    super.update(bean as UserBean)
    return this
  }

  public selfUpdate() {
    backend.get("/get-user-by-id", {
      id: this.id
    }).then((rs) => {
      const bean = rs.data.result
      this.update({
        nickname: bean.nickname,
        mobilephone: bean.phone,
        avatar: bean.avatar,
        isAdmin: false,
        email: bean.email,
        id: bean.id
      })
    })
  }
}
