import { createContext } from 'react'
import { useContext } from 'react/cjs/react.development'
import { BoardSettingsContext } from './BoardContext'
import { SizingSettingsContext } from './SizingContext'

export const WinningContext = createContext()

const WinningProvider = (props) => {
  const { colors, board, getIndex, getRowAndColumn, win, setWin } =
    useContext(BoardSettingsContext)
  const { rows, columns } = useContext(SizingSettingsContext)
  const winTypes = {
    vertical: 0,
    horizontal: 1,
    forwardsDiagonal: 2,
  }

  const createWinState = (start, winType) => {
    const win = {
      winner: board[start],
      winningCells: [],
    }

    let pos = getRowAndColumn(start)
    console.log(start)
    console.log(pos)

    while (true) {
      let current = board[getIndex(pos.row, pos.column)]
      if (current === win.winner) {
        win.winningCells.push({ ...pos })
        if (winType === winTypes.horizontal) {
          pos.column++
        } else if (winType === winTypes.vertical) {
          pos.row++
        } else if (winType === winTypes.backwardsDiagonal) {
          pos.row++
          pos.column++
        } else if (winType === winTypes.forwardsDiagonal) {
          pos.row++
          pos.column--
        }
      } else {
        return win
      }
    }
  }

  const verticalWin = () => {
    const { empty } = colors
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row <= rows - 4; row++) {
        let start = getIndex(row, column)
        if (board[start] === empty) continue
        let counter = 1
        for (let k = row + 1; k < row + 4; k++) {
          if (board[getIndex(k, column)] === board[start]) {
            counter++
            if (counter === 4) {
              return createWinState(start, winTypes.vertical)
            }
          }
        }
      }
    }
  }

  const horizontalWin = () => {
    const { empty } = colors
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        let start = getIndex(row, column)
        if (board[start] === empty) continue
        let counter = 1
        for (let k = column + 1; k < column + 4; k++) {
          if (board[getIndex(row, k)] === board[start]) {
            counter++
            if (counter === 4) {
              return createWinState(start, winTypes.horizontal)
            }
          }
        }
      }
    }
  }

  const backwardsDiagonalWin = () => {
    const { empty } = colors
    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        let start = getIndex(row, column)
        if (board[start] === empty) continue
        let counter = 1
        for (let i = 1; i < 4; i++) {
          if (board[getIndex(row + i, column + i)] === board[start]) {
            counter++
            if (counter === 4)
              return createWinState(start, winTypes.backwardsDiagonal)
          }
        }
      }
    }
  }
  const forwardsDiagonalWin = () => {
    const { empty } = colors
    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 3; column <= columns; column++) {
        let start = getIndex(row, column)
        if (board[start] === empty) continue
        let counter = 1
        for (let i = 1; i < 4; i++) {
          if (board[getIndex(row + i, column - i)] === board[start]) {
            counter++
            if (counter === 4)
              return createWinState(start, winTypes.forwardsDiagonal)
          }
        }
      }
    }
  }

  const values = {
    win,
    setWin,
    winTypes,
    verticalWin,
    horizontalWin,
    backwardsDiagonalWin,
    forwardsDiagonalWin,
  }
  return (
    <WinningContext.Provider value={values}>
      {props.children}
    </WinningContext.Provider>
  )
}

export default WinningProvider
