import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BoardSettingsContext } from '../context/BoardContext'
import { SizingSettingsContext } from '../context/SizingContext'
import { WinningContext } from '../context/WinningContext'
import GameControlPanel from './GameControlPanel'

const Board = () => {
  const {
    board,
    getGridTemplateColumns,
    createDropButtons,
    domBoard,
    dropping,
  } = useContext(BoardSettingsContext)

  const {
    win,
    setWin,
    verticalWin,
    horizontalWin,
    backwardsDiagonalWin,
    forwardsDiagonalWin,
  } = useContext(WinningContext)

  const { columns } = useContext(SizingSettingsContext)
  const [gridColumns] = useState(getGridTemplateColumns())

  // Checking winning
  useEffect(() => {
    if (dropping || win) return

    const isWin = () => {
      return (
        forwardsDiagonalWin() ||
        backwardsDiagonalWin() ||
        horizontalWin() ||
        verticalWin() ||
        null
      )
    }
    setWin(isWin())
  }, [
    board,
    win,
    forwardsDiagonalWin,
    backwardsDiagonalWin,
    horizontalWin,
    verticalWin,
    setWin,
    dropping,
  ])

  // board grid style will change if column value change
  const maxWidth = 3 * columns + 1
  const styleObj = {
    maxWidth: `${maxWidth}rem`,
    gridTemplateColumns: gridColumns,
  }

  return (
    <>
      <div className='board' style={styleObj} ref={domBoard}>
        {createDropButtons()}
        {board.map((color, index) => (
          <div
            className='cell board-block'
            key={'color' + index}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
      <GameControlPanel />
      <div className='settings'>
        <Link to='/settings'>
          <i className='fas fa-cogs'></i> Settings
        </Link>
      </div>
    </>
  )
}

export default Board
