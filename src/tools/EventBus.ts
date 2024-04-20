export default class EventBus {
  private listeners: Record<string, CallableFunction[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`События ${event} не существует`);
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => listener(...args));
  }
}
