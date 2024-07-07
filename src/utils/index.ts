/**
 * 节流函数
 * 
 * @param func - 需要节流的函数
 * @param delay - 节流时间
 * @param leading - 是否开始时调用
 * @param trailing - 是否结束时调用
 * @returns 节流后的函数
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100,
  leading: boolean = false,
  trailing: boolean = false
): (...args: Parameters<T>) => ReturnType<T> {
  let lastTime = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let result: ReturnType<T>;

  // 返回节流函数
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const now = Date.now();

    // 首次执行时检查是否配置了 leading = false（默认），阻止立即执行
    if (lastTime === 0 && leading === false) {
      lastTime = now;
    }

    const remaining = delay - (now - lastTime);

    // 超出间隔时间，或配置了立即执行
    if (remaining <= 0) {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      result = func(...args);
    }
    // 没有超出间隔时间，且配置了 trailing = true
    else if (timeout === null && trailing !== false) {
      timeout = setTimeout(() => {
        lastTime = leading === false ? 0 : Date.now();
        timeout = null;
        result = func(...args);
      }, remaining);
    }

    return result;
  };
}

export { throttle };