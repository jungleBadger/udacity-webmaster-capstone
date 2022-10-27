import loginReducer, {
  LoginState,
  increment,
  decrement,
  incrementByAmount,
} from './loginSlice';

describe('counter reducer', () => {
  const initialState: LoginState = {
    value: 3,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });



});
