export interface RecordedAction {
  /** Type of DOM event that was captured. */
  type: string;
  /** Timestamp in milliseconds when the event occurred. */
  timestamp: number;
  /** CSS selector describing the target element. */
  selector: string;
  /** Value of the element for input events. */
  value?: string;
}

/**
 * Records user interactions with the document by listening to common DOM events.
 *
 * ```ts
 * const recorder = new ActionRecorder();
 * recorder.start();
 * // ... user interacts with the page ...
 * recorder.stop();
 * console.log(recorder.getActions());
 * ```
 */
export class ActionRecorder {
  private actions: RecordedAction[] = [];
  private listener = this.handleEvent.bind(this);
  private running = false;

  constructor(private events: string[] = ['click', 'input']) {}

  /** Begin recording events. */
  start(): void {
    if (this.running) return;
    this.events.forEach(evt => document.addEventListener(evt, this.listener, true));
    this.running = true;
  }

  /** Stop recording events. */
  stop(): void {
    if (!this.running) return;
    this.events.forEach(evt => document.removeEventListener(evt, this.listener, true));
    this.running = false;
  }

  /**
   * Remove all previously recorded actions.
   */
  clear(): void {
    this.actions = [];
  }

  /**
   * Return a copy of recorded actions.
   */
  getActions(): RecordedAction[] {
    return [...this.actions];
  }

  private handleEvent(e: Event): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const action: RecordedAction = {
      type: e.type,
      timestamp: Date.now(),
      selector: this.getSelector(target)
    };
    if (e.type === 'input' && (target as HTMLInputElement).value !== undefined) {
      action.value = (target as HTMLInputElement).value;
    }
    this.actions.push(action);
  }

  private getSelector(el: Element): string {
    if (el.id) return `#${el.id}`;
    const parts: string[] = [];
    let element: Element | null = el;
    while (element && parts.length < 4) {
      let part = element.tagName.toLowerCase();
      if (element.classList.length) {
        part += '.' + Array.from(element.classList).join('.');
      }
      parts.unshift(part);
      element = element.parentElement;
    }
    return parts.join(' > ');
  }
}

export default ActionRecorder;
