import loginReducer, {
  LoginState,
} from './loginSlice';

describe('counter reducer', () => {
  const initialState: LoginState = {
    value: 3,
    status: 'idle',
	  username: '',
	  password: '',
	  authorized: false
  };

  it('should handle initial state', () => {
    expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
		username: '',
		password: '',
		authorized: false
    });
  });



});
