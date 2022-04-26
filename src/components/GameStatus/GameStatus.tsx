import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import styles from './GameStatus.module.css'


export const GameStatus = () => {

  const {winner, currentPlayer} = useAppSelector(state => state.gameSlice)

  return (
    <div className={styles.container}>
      <h4 className={styles.status}>
        {winner ?
          winner === 'Tie' ? 
            'Tie!'          
            :
            `${winner}'s won!`          
          :
          `Current player - ${currentPlayer}`
        }
      </h4>
    </div>
  )
}
