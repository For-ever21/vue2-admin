import storage from "good-storage";
import Cookies from "js-cookie";
interface StorageConfig {
  prefix: string;
}
enum scopeNameMap {
  session = "session",
  cookie = "cookie"
}

interface Option {
  scopeName: scopeNameMap;
  prefix?: string;
  default?: any;
}

/**
 * 本地存储工具类
 *
 * @class LocalStorageUtil
 */
class LocalStorageUtil {
  scopeNameMap = scopeNameMap;
  prefix = "";
  constructor(config?: StorageConfig) {
    this.prefix = "";
    if (config) {
      if (config.prefix) {
        this.prefix = config.prefix;
      }
    }
  }

  /**
   *
   *
   * @param {*} scopeName
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  getScope(option?: Option) {
    if (!option || this.isEmpty(option.scopeName)) {
      return storage;
    } else {
      const scopeName = option.scopeName;
      if (scopeName == this.scopeNameMap.cookie) {
        return Cookies;
      } else if (storage[scopeName]) {
        return storage[scopeName];
      } else {
        console.error("scopeName ", scopeName, " is not defined!");
      }
    }
  }

  /**
   *
   * 获取符合本地存储规则的key,类内部调用的方法，禁止外部调用
   * @param {*} key
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _getKey(key: string, option?: Option): any {
    if (option && !this.isEmpty(option.prefix)) {
      key = this.prefix + key;
    }
    return key;
  }

  /**
   *
   *
   * @param {*} key
   * @param {*} val
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _set(key: string, val: any, option?: Option): LocalStorageUtil {
    key = this._getKey(key, option);
    this.getScope(option).set(key, val);
    return this;
  }

  /**
   *
   *
   * @param {*} key
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _get(key: string, option?: Option): any {
    key = this._getKey(key, option);
    return this.getScope(option).get(key);
  }

  /**
   *
   *
   * @param {*} key
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _remove(key: string, option?: Option): LocalStorageUtil {
    key = this._getKey(key, option);
    this.getScope(option).remove(key);
    return this;
  }

  /**
   *
   *
   * @param {*} key
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _has(key: string, option?: Option): boolean {
    key = this._getKey(key, option);
    return this.getScope(option).has(key);
  }

  /**
   *
   *
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _clear(option?: Option): LocalStorageUtil {
    this.getScope(option).clear();
    return this;
  }

  /**
   *
   *
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _getAll(option?: Option): Array<any> {
    return this.getScope(option).getAll();
  }

  /**
   *
   *
   * @param {*} callBack
   * @param {*} option
   * @return {*}
   * @memberof LocalStorageUtil
   */
  private _forEach(callBack: any, option?: Option): LocalStorageUtil {
    this.getScope(option).forEach(callBack);
    return this;
  }

  /**
   *
   * 将key：val存储到本地存储系统中，默认添加到localStorage中
   * @param {string} key
   * @param {*} val
   * @param {Option} [option]
   * @return {*}  {LocalStorageUtil}
   * @memberof LocalStorageUtil
   */
  public set(key: string, val: any, option?: Option): LocalStorageUtil {
    return this._set(key, val, option);
  }

  public get(key: string, option?: Option): any {
    return this._get(key, option);
  }

  public remove(key: string, option?: Option): LocalStorageUtil {
    return this._remove(key, option);
  }

  public has(key: string, option?: Option): boolean {
    return this._has(key, option);
  }

  public clear(option?: Option): LocalStorageUtil {
    return this._clear(option);
  }

  public getAll(option?: Option): Array<any> {
    return this._getAll(option);
  }

  public forEach(callback: any, option?: Option): LocalStorageUtil {
    return this.forEach(callback, option);
  }

  /**
   *
   * 将key：val存储到sessionStorage中
   * @param {string} key
   * @param {*} val
   * @return {*}  {LocalStorageUtil}
   * @memberof LocalStorageUtil
   */
  public setSession(key: string, val: any): LocalStorageUtil {
    return this._set(key, val, { scopeName: this.scopeNameMap.session });
  }

  /**
   *
   * 从sessionStorage 获取某个key所对应得值
   * @param {string} key
   * @param {*} [def] //当没有数据时，返回默认值
   * @return {*}  {*}
   * @memberof LocalStorageUtil
   */
  public getSession(key: string, def?: any) {
    return this._get(key, { scopeName: this.scopeNameMap.session, default: def });
  }

  /**
   *
   * 从sessionStorage 中移除某个key
   * @param {string} key
   * @return {*}  {LocalStorageUtil}
   * @memberof LocalStorageUtil
   */
  public removeSession(key: string): LocalStorageUtil {
    return this._remove(key, { scopeName: this.scopeNameMap.session });
  }

  /**
   *
   * 判断session中是否含有某个key
   * @param {string} key
   * @return {*}  {boolean}
   * @memberof LocalStorageUtil
   */
  public hasSession(key: string): boolean {
    return this._has(key, { scopeName: this.scopeNameMap.session });
  }

  /**
   *
   * 清除sessionStorage 中的所有数据
   * @return {*}  {LocalStorageUtil}
   * @memberof LocalStorageUtil
   */
  public clearSession(): LocalStorageUtil {
    return this._clear({ scopeName: this.scopeNameMap.session });
  }
  /**
   *
   * 判断一个对象是否为空
   * @param {*} obj
   * @return {*}  {boolean}
   * @memberof LocalStorageUtil
   */
  public isEmpty(obj: any): boolean {
    return obj === undefined || obj === null || obj === "";
  }

  public setCookie(key: string, value: any): void {
    Cookies.set(key, value);
  }

  public getCookie(key: string): any {
    return Cookies.get(key);
  }

  public removeCookie(key: string): void {
    Cookies.remove(key);
  }
}

const util = new LocalStorageUtil();
export default util;
