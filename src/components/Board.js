import React, { useContext, useState } from 'react'
import { BoardSettingsContext } from '../context/BoardContext'
import { SizingSettingsContext } from '../context/SizingContext'

const Board = () => {
  const {
    board,
    getGridTemplateColumns,
    createDropButtons,
    domBoard,
    dropping,
  } = useContext(BoardSettingsContext)
  const { columns } = useContext(SizingSettingsContext)
  const [gridColumns] = useState(getGridTemplateColumns())

  // board grid style will change if column value change
  const maxWidth = 3 * columns + 1
  const styleObj = {
    maxWidth: `${maxWidth}rem`,
    gridTemplateColumns: gridColumns,
  }

  return (
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
  )
}

export default Board
