import { Bean } from "../bean/bean";

declare type Keys = keyof Bean;

function isProperty(obj: Bean, key: string): key is Keys {
  return key in obj;
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}

export abstract class Entity implements Bean {
  public id: number;
  constructor(bean?: Bean) {
    this.id = -1;
    if (bean) {
      this.update(bean);
    } else {
      this.update(this._default());
    }
  }
  public update(bean: Bean): Entity {
    for (const k in bean) {
      if (isProperty(bean, k)) {
        setProperty(this, k, getProperty(bean, k));
      }
    }
    
    return this;
  }

  public abstract clone(): Entity;
  public abstract _default(): Entity;
}
