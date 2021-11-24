import { useState, createContext } from 'react'

export const SizingSettingsContext = createContext()

const SizingSettingsProvider = (props) => {
  const [rows, setRows] = useState(
    localStorage.rows ? JSON.parse(localStorage.getItem('rows')) : 6
  )
  const [columns, setColumns] = useState(
    localStorage.columns ? JSON.parse(localStorage.getItem('columns')) : 7
  )
  const [player1Name, setPlayer1Name] = useState(
    localStorage.player1Name
      ? JSON.parse(localStorage.getItem('player1Name'))
      : 'PLAYER 1'
  )
  const [player2Name, setPlayer2Name] = useState(
    localStorage.player2Name
      ? JSON.parse(localStorage.getItem('player2Name'))
      : 'PLAYER 2'
  )

  const values = {
    rows,
    setRows,
    columns,
    setColumns,
    player1Name,
    player2Name,
    setPlayer1Name,
    setPlayer2Name,
  }
  return (
    <SizingSettingsContext.Provider value={values}>
      {props.children}
    </SizingSettingsContext.Provider>
  )
}
export default SizingSettingsProvider
