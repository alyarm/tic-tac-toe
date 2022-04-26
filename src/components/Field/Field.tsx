import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { makeMove } from '../../store/gameSlice'
import styles from './Field.module.css'

export const Field = () => {

  const {field, winner, crossedLine} = useAppSelector(state => state.gameSlice)
  const dispatch = useAppDispatch()

  const move = (id: number) => {
    dispatch(makeMove(id))
  }

  return (
    <div
      className={`${styles.field} 
      ${winner ? styles.gameOver : ''}
      ${crossedLine ? `${styles.crossedLine} ${styles[crossedLine]}` : ''}`}
    >
      {field.map((cell, index) => {
        return(
          <div
            className={styles.item}
            key={index}
            onClick={() => move(index)}
            tabIndex={winner ? -1 : 1}
            aria-label={`cell #${index + 1} ${cell ? cell : 'empty'}`}
          >
            {cell ? cell : null}
          </div>
        )
      })}
    </div>
  )
}
