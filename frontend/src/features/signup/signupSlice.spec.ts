import signupReducer, {
  SignupState,
} from './signupSlice';

describe('counter reducer', () => {
  const initialState: SignupState = {
    value: 3,
    status: 'idle',
	  username: '',
	  password: ''
  };

  it('should handle initial state', () => {
    expect(signupReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
		username: '',
		password: ''
    });
  });



});
