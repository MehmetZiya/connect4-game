import React, { useContext, useState } from 'react'
import { BoardSettingsContext } from '../context/BoardContext'
import { SizingSettingsContext } from '../context/SizingContext'

const Board = () => {
  const { board, getGridTemplateColumns } = useContext(BoardSettingsContext)
  const { columns } = useContext(SizingSettingsContext)
  const [gridColumns] = useState(getGridTemplateColumns())
  const maxWidth = 3 * columns + 1
  const styleObj = {
    maxWidth: `${maxWidth}rem`,
    gridTemplateColumns: gridColumns,
  }

  return (
    <>
      <div className='board' style={styleObj}>
        {board.map((color, index) => (
          <div
            className='cell board-block'
            key={'color' + index}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </>
  )
}

export default Board
