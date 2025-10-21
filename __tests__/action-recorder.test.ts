import ActionRecorder from '../src/ActionRecorder';

describe('ActionRecorder', () => {
  test('records click events', () => {
    document.body.innerHTML = '<button id="btn">Click</button>';
    const button = document.getElementById('btn') as HTMLElement;
    const rec = new ActionRecorder(['click']);
    rec.start();
    button.click();
    rec.stop();
    const actions = rec.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe('click');
    expect(actions[0].selector).toBe('#btn');
  });

  test('records input events with value', () => {
    document.body.innerHTML = '<input id="field" />';
    const input = document.getElementById('field') as HTMLInputElement;
    const rec = new ActionRecorder(['input']);
    rec.start();
    input.value = 'hi';
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    rec.stop();
    const actions = rec.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].value).toBe('hi');
  });
});
