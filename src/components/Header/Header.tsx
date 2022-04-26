import React from 'react'
import styles from './Header.module.css'
import {ReactComponent as Restart} from '../../assets/svg/restart.svg'
import { useAppDispatch } from '../../hooks/redux'
import { restartGame } from '../../store/gameSlice'

export const Header = () => {

  const dispatch = useAppDispatch()

  const onRestart = () => dispatch(restartGame())

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Tic-Tie-Toe
      </h1>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.restart}`}
          onClick={onRestart}
          aria-label='Restart game'
        >
          <Restart />
        </button>
      </div>
    </header>
  )
}
