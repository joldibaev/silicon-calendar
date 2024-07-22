import { IsEqualPipe } from './is-equal.pipe';

describe('IsEqualPipe', () => {
  it('create an instance', () => {
    const pipe = new IsEqualPipe();
    expect(pipe).toBeTruthy();
  });
});
