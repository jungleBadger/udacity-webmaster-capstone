import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	performSignup,
	updateUsername,
	updatePassword,
	updateConfirmPassword,
	username as selectUsername,
	password as selectPassword,
	confirmPassword as selectConfirmPassword,
} from './signupSlice';
import styles from './Signup.module.css';

export function Signup() {
  const username: string = useAppSelector(selectUsername);
  const password: string = useAppSelector(selectPassword);
  const confirmPassword: string = useAppSelector(selectConfirmPassword);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.signup}>
		<h3>SIGNUP</h3>

		<input
			aria-label="Username"
			value={username}
			placeholder="Username"
			onChange={(e) => dispatch(updateUsername(e.target.value))}
		/>
		<input
			aria-label="Password"
			type={"password"}
			value={password}
			placeholder="Password"
			onChange={(e) => dispatch(updatePassword(e.target.value))}
		/>

		<input
			aria-label="Confirm password"
			type={"password"}
			value={confirmPassword}
			placeholder="Confirm password"
			onChange={(e) => dispatch(updateConfirmPassword(e.target.value))}
		/>
        <button
          className={styles.button}
		  disabled={!password || password !== confirmPassword}
          onClick={() => dispatch(performSignup({username, password}))}
        >
          Signup
        </button>
    </div>
  );
}
