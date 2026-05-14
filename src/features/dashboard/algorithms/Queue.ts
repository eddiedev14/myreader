import type { BookDashboard } from "../interfaces/book.interface";

export default class Queue {
  public items: BookDashboard[];

  constructor(initial: BookDashboard[] = []) {
    this.items = initial;
  }

  enqueue(value: BookDashboard) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.length > 0 ? this.items.shift() : null;
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.items.length) {
      return null;
    }

    return this.items.splice(position, 1)[0];
  }

  size() {
    return this.items.length;
  }
}
