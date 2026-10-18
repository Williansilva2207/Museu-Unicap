import { TestBed } from '@angular/core/testing';

/**
 * DOM interaction helpers shared by component specs.
 *
 * Angular v22 runs zoneless, so specs must explicitly flush scheduled
 * effects (and pending microtasks from async handlers) after acting.
 */

/**
 * Lets the test runner settle after an interaction or an HTTP flush:
 * drains pending microtasks/timers, flushes scheduled change-detection
 * effects and renders the resulting state.
 */
export async function settle(fixture: {
  whenStable(): Promise<unknown>;
  detectChanges(): void;
}): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await TestBed.flushEffects();
  await fixture.whenStable();
  fixture.detectChanges();
}

function find<T extends Element>(root: HTMLElement, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}

function dispatchValueEvents(input: HTMLInputElement): void {
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/** Clicks the native radio matching the given value. */
export function clickRadio(root: HTMLElement, value: string): void {
  const input = find<HTMLInputElement>(root, `input[type="radio"][value="${value}"]`);
  input.click();
  dispatchValueEvents(input);
}

/**
 * Clicks the checkbox/radio inside the `.choice` label whose text contains
 * the given label (used by wrapped tactile controls without element ids).
 */
export function clickChoiceByLabel(root: HTMLElement, text: string): void {
  const labels = Array.from(root.querySelectorAll<HTMLElement>('label'));
  const label = labels.find((candidate) => (candidate.textContent ?? '').includes(text));
  if (!label) {
    throw new Error(`Label not found by text: ${text}`);
  }
  const input = label.querySelector<HTMLInputElement>('input');
  if (!input) {
    throw new Error(`Input not found inside label: ${text}`);
  }
  input.click();
  dispatchValueEvents(input);
}

/** Clicks the native checkbox with the given id. */
export function clickCheckbox(root: HTMLElement, inputId: string): void {
  const input = find<HTMLInputElement>(root, `#${inputId}`);
  input.click();
  dispatchValueEvents(input);
}

/** Types a value into a native input (triggers the input/change events). */
export function setInputValue(root: HTMLElement, inputId: string, value: string): void {
  const input = find<HTMLInputElement>(root, `#${inputId}`);
  input.value = value;
  dispatchValueEvents(input);
}

/** Finds a button whose text contains the given label. */
export function buttonByText(root: HTMLElement, label: string): HTMLButtonElement {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('button'));
  const found = buttons.find((button) => (button.textContent ?? '').includes(label));
  if (!found) {
    throw new Error(`Button not found by text: ${label}`);
  }
  return found;
}

/** Clicks the button whose text contains the given label. */
export function clickButton(root: HTMLElement, label: string): void {
  buttonByText(root, label).click();
}

/** Submits the first form on the page. */
export function submitForm(root: HTMLElement): void {
  const form = find<HTMLFormElement>(root, 'form');
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}
