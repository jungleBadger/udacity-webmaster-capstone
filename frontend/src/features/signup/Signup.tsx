import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	performSignup,
	updateUsername,
	updatePassword,
	username as selectUsername,
	password as selectPassword,
} from './signupSlice';
import styles from './Signup.module.css';

export function Signup() {
  const username: string = useAppSelector(selectUsername);
  const password: string = useAppSelector(selectPassword);
  const dispatch = useAppDispatch();

  return (
    <div>
		<h3>SIGNUP</h3>

		<input
			aria-label="Username"
			value={username}
			onChange={(e) => dispatch(updateUsername(e.target.value))}
		/>
		<input
			aria-label="Password"
			type={"password"}
			value={password}
			onChange={(e) => dispatch(updatePassword(e.target.value))}
		/>
        <button
          className={styles.button}
          onClick={() => dispatch(performSignup({username, password}))}
        >
          Login
        </button>
    </div>
  );
}
