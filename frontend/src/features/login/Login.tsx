import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	performLogin,
  selectCount,
} from './loginSlice';
import styles from './Login.module.css';

export function Login() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
		<h3>LOGIN</h3>
		<input
			aria-label="Set increment amount"
			value={incrementAmount}
			onChange={(e) => setIncrementAmount(e.target.value)}
		/>
		<input
			aria-label="Set increment amount"
			type={"password"}
			value={incrementAmount}
			onChange={(e) => setIncrementAmount(e.target.value)}
		/>
        <button
          className={styles.button}
          onClick={() => dispatch(performLogin(incrementValue))}
        >
          Login
        </button>
    </div>
  );
}
