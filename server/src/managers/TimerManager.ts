class TimerManager {
  private timers = new Map<string, NodeJS.Timeout>();

  /**
   * Create a one-time timer
   */
  create(key: string, callback: () => void, delay: number): void {
    this.clear(key);

    const timer = setTimeout(() => {
      this.timers.delete(key);
      callback();
    }, delay);

    this.timers.set(key, timer);
  }

  /**
   * Create a repeating timer
   */
  createInterval(key: string, callback: () => void, delay: number): void {
    this.clear(key);

    const timer = setInterval(callback, delay);

    this.timers.set(key, timer);
  }

  /**
   * Clear timeout or interval
   */
  clear(key: string): void {
    const timer = this.timers.get(key);

    if (!timer) return;

    clearTimeout(timer);
    clearInterval(timer);

    this.timers.delete(key);
  }

  /**
   * Check if timer exists
   */
  has(key: string): boolean {
    return this.timers.has(key);
  }

  /**
   * Clear all timers
   */
  clearAll(): void {
    this.timers.forEach((timer) => {
      clearTimeout(timer);
      clearInterval(timer);
    });

    this.timers.clear();
  }

  /**
   * Active timer count
   */
  count(): number {
    return this.timers.size;
  }
}

export const timerManager = new TimerManager();
