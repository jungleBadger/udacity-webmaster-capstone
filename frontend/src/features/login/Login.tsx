import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	performLogin,
	updateUsername,
	updatePassword,
	username as selectUsername,
	password as selectPassword,
} from './loginSlice';
import styles from './Login.module.css';

export function Login() {
  const username: string = useAppSelector(selectUsername);
  const password: string = useAppSelector(selectPassword);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.login}>
		<h3>LOGIN</h3>

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
		  disabled={!password || !username}
		  onClick={() => dispatch(performLogin({username, password}))}
        >
          Login
        </button>
    </div>
  );
}
