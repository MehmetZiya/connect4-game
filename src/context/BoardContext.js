import { useState, createContext, useContext, useRef } from 'react'
import { SizingSettingsContext } from './SizingContext'

export const BoardSettingsContext = createContext()
const BoardSettingsProvider = (props) => {
  const { rows, columns } = useContext(SizingSettingsContext)
  const colors = {
    empty: 'rgb(200, 200, 200)',
    player1: 'rgb(243, 78, 78)',
    player2: 'rgb(20, 106, 206)',
  }
  const [board, setBoard] = useState(
    localStorage.newBoard
      ? JSON.parse(localStorage.getItem('newBoard'))
      : new Array(rows * columns).fill(colors.empty)
  )
  const [currentPlayer, setCurrentPlayer] = useState(
    localStorage.currentPlayer
      ? JSON.parse(localStorage.getItem('currentPlayer'))
      : colors.player1
  )
  const [dropping, setDropping] = useState(false)
  const domBoard = useRef(null)
  const [win, setWin] = useState(null)
  const [draw, setDraw] = useState(false)
  const getGridTemplateColumns = () => {
    let gridTemplateColumns = ''
    for (let i = 0; i < columns; i++) {
      gridTemplateColumns += '1fr '
    }
    return gridTemplateColumns
  }

  const getDomBoardCell = (index) => {
    if (!domBoard.current) return
    const board = domBoard.current
    const blocks = board.querySelectorAll('.board-block')
    return blocks[index]
  }
  const animateDrop = async (row, column, color, currentRow) => {
    if (currentRow === undefined) {
      currentRow = 0
    }
    return new Promise((resolve) => {
      if (currentRow > row) {
        return resolve()
      }
      if (currentRow > 0) {
        let c = getDomBoardCell(getIndex(currentRow - 1, column))
        c.style.backgroundColor = colors.empty
      }
      let c = getDomBoardCell(getIndex(currentRow, column))
      c.style.backgroundColor = color
      setTimeout(
        () => resolve(animateDrop(row, column, color, ++currentRow)),
        100
      )
    })
  }

  const handleDrop = async (column) => {
    localStorage.setItem('previousBoard', JSON.stringify(board))
    localStorage.setItem('previousPlayer', JSON.stringify(currentPlayer))
    if (dropping || win) return
    const row = findEmptyRow(column)
    if (row < 0) return
    setDropping(true)
    await animateDrop(row, column, currentPlayer)
    setDropping(false)
    const newBoard = board.slice()
    newBoard[getIndex(row, column)] = currentPlayer
    localStorage.setItem('newBoard', JSON.stringify(newBoard))
    setBoard(JSON.parse(localStorage.getItem('newBoard')))
    const changePlayerTurn = (player) => {
      if (player === colors.player1) {
        return colors.player2
      }
      if (player === colors.player2) {
        return colors.player1
      }
    }
    localStorage.setItem(
      'currentPlayer',
      JSON.stringify(changePlayerTurn(currentPlayer))
    )
    setCurrentPlayer(JSON.parse(localStorage.getItem('currentPlayer')))
  }
  const createDropButtons = () => {
    const dropBtns = []
    for (let i = 0; i < columns; i++) {
      dropBtns.push(
        <button
          key={i}
          className='cell drop-button'
          onClick={() => handleDrop(i)}
          style={{
            backgroundColor: currentPlayer,
          }}
        >
          <i className='fas fa-angle-double-down'></i>
        </button>
      )
    }
    return dropBtns
  }
  const getIndex = (rowValue, columnValue) => {
    const index = rowValue * columns + columnValue
    if (index > rows * columns) {
      return null
    }
    return index
  }

  const getRowAndColumn = (index) => {
    if (index > rows * columns) {
      return null
    }
    const rowValue = Math.floor(index / columns)
    const columnValue = Math.floor(index % columns)
    return {
      rowValue,
      columnValue,
    }
  }
  const restartGame = () => {
    setCurrentPlayer(colors.player1)
    setWin(null)
    setBoard(new Array(rows * columns).fill(colors.empty))
    setDraw(false)
    localStorage.removeItem('currentPlayer')
    localStorage.removeItem('newBoard')
    localStorage.removeItem('previousBoard')
    localStorage.removeItem('previousPlayer')
  }
  const findEmptyRow = (column) => {
    let { empty } = colors
    for (let i = 0; i < rows; i++) {
      if (board[getIndex(i, column)] !== empty) {
        return i - 1
      }
    }
    return rows - 1
  }
  const undoPrevBoard = () => {
    setBoard(JSON.parse(localStorage.getItem('previousBoard')))
    setCurrentPlayer(JSON.parse(localStorage.getItem('previousPlayer')))
  }

  const values = {
    board,
    setBoard,
    colors,
    getGridTemplateColumns,
    currentPlayer,
    setCurrentPlayer,
    createDropButtons,
    getIndex,
    getRowAndColumn,
    findEmptyRow,
    domBoard,
    win,
    setWin,
    draw,
    setDraw,
    restartGame,
    undoPrevBoard,
  }

  return (
    <BoardSettingsContext.Provider value={values}>
      {props.children}
    </BoardSettingsContext.Provider>
  )
}

export default BoardSettingsProvider
