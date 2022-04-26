import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface stateProps  {
  field: Array<null | 'X' | 'O'>,
  currentPlayer: 'X' | 'O',
  winner: null | 'X' | 'O' | 'Tie',
  crossedLine:  'firstRow' | 'firstCol' | 
                'secondRow' | 'secondCol' |
                'thirdRow' | 'thirdCol' |
                'leftDiagonal' | 'rigthDiagonal' |
                null,
  loading: boolean
}

const initialState = {
  field: [
    null, null, null, 
    null, null, null,
    null, null, null
  ],
  currentPlayer: 'X',
  winner: null,
  crossedLine: null,
  loading: false
} as stateProps


export const makeMove = createAsyncThunk(
  'gameSlice/makeMove',
  async (cellId: number, {getState, dispatch}) => {
    const state = getState() as RootState 
    const cell = state.gameSlice.field[cellId]
    const winner = state.gameSlice.winner
    if(cell === null && !winner) {
      dispatch(markCell(cellId))
      dispatch(checkWinner())
      dispatch(switchPlayer())
    }
  }
)

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    restartGame (state) {
      state.field = state.field.map(cell => cell = null)
      state.winner = null
      state.crossedLine = null
      state.currentPlayer = 'X'
    },
    switchPlayer (state) {
      state.currentPlayer === 'X' ? state.currentPlayer = 'O' : state.currentPlayer = 'X'
    },
    markCell (state, action: PayloadAction<number>) {
      if(action.payload < state.field.length && !state.field[action.payload]) {
        state.field[action.payload] = state.currentPlayer
      }
    },
    checkWinner (state) {

      if(state.field[0] === 'X' && state.field[1] === 'X' && state.field[2] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'firstRow'
      } else if (state.field[0] === 'O' && state.field[1] === 'O' && state.field[2] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'firstRow'
      } else if (state.field[3] === 'X' && state.field[4] === 'X' && state.field[5] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'secondRow'
      } else if (state.field[3] === 'O' && state.field[4] === 'O' && state.field[5] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'secondRow'
      } else if (state.field[6] === 'X' && state.field[7] === 'X' && state.field[8] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'thirdRow'
      } else if (state.field[6] === 'O' && state.field[7] === 'O' && state.field[8] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'thirdRow'
      } else if (state.field[0] === 'X' && state.field[3] === 'X' && state.field[6] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'firstCol'
      } else if (state.field[0] === 'O' && state.field[3] === 'O' && state.field[6] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'firstCol'
      } else if (state.field[1] === 'X' && state.field[4] === 'X' && state.field[7] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'secondCol'
      } else if (state.field[1] === 'O' && state.field[4] === 'O' && state.field[7] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'secondCol'
      } else if (state.field[2] === 'X' && state.field[5] === 'X' && state.field[8] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'thirdCol'
      } else if (state.field[2] === 'O' && state.field[5] === 'O' && state.field[8] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'thirdCol'
      } else if (state.field[0] === 'X' && state.field[4] === 'X' && state.field[8] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'leftDiagonal'
      } else if (state.field[0] === 'O' && state.field[4] === 'O' && state.field[8] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'leftDiagonal'
      } else if (state.field[2] === 'X' && state.field[4] === 'X' && state.field[6] === 'X') {
        state.winner = 'X'
        state.crossedLine = 'rigthDiagonal'
      } else if (state.field[2] === 'O' && state.field[4] === 'O' && state.field[6] === 'O') {
        state.winner = 'O'
        state.crossedLine = 'rigthDiagonal'
      } else if(state.field.every(cell => cell === 'O' || cell === 'X')) {
        state.winner = 'Tie'
      }
    }    

  },
  extraReducers: (builder) => {
    builder.addCase(makeMove.pending, (state) => {
      state.loading = true
    })
    builder.addCase(makeMove.fulfilled, (state) => {
      state.loading = false
    })
  }
})




export const { restartGame, switchPlayer, checkWinner, markCell} = gameSlice.actions
export default gameSlice.reducer