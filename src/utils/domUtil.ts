import { trim } from "./commonUtil";
import { hasWindow } from "./systemInfo";

/**
 *
 * 设置页面标题
 * @export
 * @param {string} title
 */
export function setDocumentTitle(title: string): void {
  document.title = title;
}

/* istanbul ignore next */
export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
// Here I want to use the type CSSStyleDeclaration, but the definition for CSSStyleDeclaration
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function (element: HTMLElement, styleName: string): string | null {
  if (hasWindow) return null;
  if (!element || !styleName) return null;
  // styleName = camelize(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  const styleObj = element.style as any;
  try {
    const style = styleObj[styleName];
    if (style) return style;
    const computed = (document.defaultView as any).getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch (e) {
    return styleObj[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(
  element: HTMLElement,
  styleName: CSSStyleDeclaration | string,
  value?: string
): void {
  if (!element || !styleName) return;

  if (styleName instanceof CSSStyleDeclaration) {
    Object.keys(styleName).forEach((prop) => {
      setStyle(element, prop, (styleName as any)[prop]);
    });
  } else {
    (element.style as any)[styleName] = value;
  }
}

export function removeStyle(element: HTMLElement, style: CSSStyleDeclaration | string) {
  if (!element || !style) return;

  if (style instanceof CSSStyleDeclaration) {
    Object.keys(style).forEach((prop) => {
      setStyle(element, prop, "");
    });
  } else {
    setStyle(element, style, "");
  }
}

export function scrollIntoView(container: HTMLElement, selected: HTMLElement): void {
  if (hasWindow) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = (pointer as HTMLElement).offsetParent;
  }
  const top =
    selected.offsetTop + offsetParents.reduce((prev, curr) => prev + (curr as any).offsetTop, 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
