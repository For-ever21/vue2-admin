/**
 * 定时器
 *
 * @class TaskTimer
 */
class TaskTimer {
  private timeOutId: number | null = null;

  setTimer(method: any, time: number, context: any): void {
    this.clearTimer();
    if (time === undefined) time = 0;
    this.timeOutId = setTimeout(function () {
      method.call(context);
    }, time);
  }
  clearTimer(): void {
    if (this.timeOutId != null) {
      clearTimeout(this.timeOutId);
      this.timeOutId = null;
    }
  }
}

/**
 *定时器管理类
 *
 * @class TimerManager
 */
class TimerManager {
  getTimer(): TaskTimer {
    return new TaskTimer();
  }
  destroyTimer(taskTimer: TaskTimer): TimerManager {
    taskTimer.clearTimer();
    return this;
  }
}
const util = new TimerManager();
export default util;
