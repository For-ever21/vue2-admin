import { walkObj } from "@utils/commonUtil";
/**
 *"
 * 将list=[{level1:"",Levek2:"",Level3:"",others:""}]这样的数据根据
 * keys=[level1,Levek2:"",Level3:"",]
 * retult = cascaderAdapter(list,keys);
 * 转换成适合elementUI库里的级联选择器使用的格式。
 * @param {*} data
 * @param {*} keys
 * @returns
 * @memberof UIDataAdpater
 */
export function cascaderAdapter(data: Array<any>, keys: Array<any>) {
  const obj: Record<string | number, any> = {};
  let array = [];
  if (data instanceof Array && keys instanceof Array) {
    const len = keys.length;
    let item = null;
    let keyObj = null;
    let value = null;
    let label = null;
    const dataLen = data.length;
    let temp = null;
    for (let i = 0; i < dataLen; i++) {
      item = data[i];
      let j = 0;
      temp = obj;
      while (j < len) {
        keyObj = keys[j];
        value = item[keyObj.value];
        label = item[keyObj.label];
        if (value && label) {
          if (!temp[value]) {
            temp[value] = {
              value: value,
              label: label,
              data: item,
              children: {}
            };
          }
          temp = temp[value].children;
        }
        j++;
      }
    }
    array = object2Array(obj, "children");
  }
  return array;
}

/**
 * 将list=[{level1:"",Levek2:"",Level3:"",others:""}]这样的数据根据
 * keys=[{id:"level1",label:"level1Name"},{id:"level2",label:"level2Name"}]
 * retult = treeAdapter(list,keys);
 * 转换成适合elementUI库里的树节点使用的格式。树组件的props属性需设置为，{children: 'children',label: 'label'},
 * 不满意可以改造，函数多加个config配置项将该项设为可配置项。
 * @param {*} data
 * @param {*} keys
 * @returns
 * @memberof UIDataAdpater
 */
export function treeAdapter(data: Array<any>, keys: Array<any>) {
  const obj: Record<string | number, any> = {};
  let array = [];
  if (data instanceof Array && keys instanceof Array) {
    const len = keys.length;
    let item = null;
    let keyObj = null;
    let label = null;
    let id = "";
    const dataLen = data.length;
    let temp = null;
    for (let i = 0; i < dataLen; i++) {
      item = data[i];
      let j = 0;
      temp = obj;
      while (j < len) {
        keyObj = keys[j];
        id = item[keyObj.id];
        label = item[keyObj.label];
        if (!temp[id]) {
          temp[id] = {
            id: i,
            label: label,
            children: {},
            data: item
          };
        }
        temp = temp[id].children;
        j++;
      }
    }
    array = object2Array(obj, "children");
  }
  return array;
}

/**
 *
 *
 * @param {*} data
 * @param {*} option {label:labelKey,value:"valueKey"}
 * @memberof UIDataAdpater
 */
export function selectAdapter(data: Array<any>, option: Record<string | number, any>): Array<any> {
  const array = [];
  if (data instanceof Array) {
    const len = data.length;
    let label = null,
      value = null,
      item = null;
    const labelKey = option.label,
      valueKey = option.value;
    for (let i = 0; i < len; i++) {
      item = data[i];
      label = item[labelKey];
      value = item[valueKey];
      array.push({
        label: label,
        value: value
      });
    }
  } else {
    console.error("data  must be Array type!");
  }
  return array;
}
export function object2Array(obj: Record<string | number, any>, recursiveKey: string): Array<any> {
  const array: Array<any> = [];
  walkObj(
    obj,
    function (value: any) {
      if (value[recursiveKey]) {
        const keys = Object.keys(value[recursiveKey]);
        // console.log(keys.length,keys);
        if (keys.length > 0) {
          value[recursiveKey] = object2Array(value[recursiveKey], recursiveKey);
        } else {
          delete value[recursiveKey];
        }
      }
      array.push(value);
    },
    obj
  );
  return array;
}
