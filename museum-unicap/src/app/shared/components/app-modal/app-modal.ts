import { Component, ElementRef, effect, input, output, viewChild } from '@angular/core';

/**
 * Accessible dialog primitive.
 *
 * - Renders only while `open` is true (content stays out of the DOM/a11y tree).
 * - `role="dialog"` + `aria-modal` + `aria-label` for assistive technology.
 * - Moves focus to the dialog when opened, supports `Escape` and backdrop
 *   click to close, and restores focus to the previously focused element.
 */
@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.html',
})
export class AppModal {
  /** Whether the dialog is currently visible. */
  readonly open = input.required<boolean>();

  /** Accessible name describing the dialog purpose. */
  readonly dialogLabel = input.required<string>();

  /** Emitted when the user closes the dialog (Escape, backdrop or internal action). */
  readonly closed = output<void>();

  private readonly dialogEl = viewChild<ElementRef<HTMLElement>>('dialog');

  private lastFocused: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (this.open()) {
        this.lastFocused = (globalThis.document?.activeElement ?? null) as HTMLElement | null;
        // Focus after the conditional content has been rendered.
        setTimeout(() => this.dialogEl()?.nativeElement.focus());
      } else {
        this.lastFocused?.focus();
        this.lastFocused = null;
      }
    });
  }

  protected onCloseRequest(): void {
    this.closed.emit();
  }
}
