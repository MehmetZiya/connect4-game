import { useState, createContext, useContext } from 'react'
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

  const getGridTemplateColumns = () => {
    let gridTemplateColumns = ''
    for (let i = 0; i < columns; i++) {
      gridTemplateColumns += '1fr '
    }
    return gridTemplateColumns
  }

  const values = {
    board,
    setBoard,
    colors,
    getGridTemplateColumns,
  }

  return (
    <BoardSettingsContext.Provider value={values}>
      {props.children}
    </BoardSettingsContext.Provider>
  )
}

export default BoardSettingsProvider
