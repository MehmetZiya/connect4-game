import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoardSettingsContext } from '../context/BoardContext'
import { SizingSettingsContext } from '../context/SizingContext'

const SettingsPage = () => {
  const {
    rows,
    columns,
    setRows,
    setColumns,
    player1Name,
    player2Name,
    setPlayer1Name,
    setPlayer2Name,
  } = useContext(SizingSettingsContext)

  const { restartGame } = useContext(BoardSettingsContext)
  const navigate = useNavigate()

  const handleStartGame = () => {
    localStorage.setItem('player1Name', JSON.stringify(player1Name))
    localStorage.setItem('player2Name', JSON.stringify(player2Name))
    localStorage.setItem('rows', rows)
    localStorage.setItem('columns', columns)
    setPlayer1Name(JSON.parse(localStorage.getItem('player1Name')))
    setPlayer2Name(JSON.parse(localStorage.getItem('player2Name')))
    setRows(JSON.parse(localStorage.getItem('rows')))
    setColumns(JSON.parse(localStorage.getItem('columns')))
    restartGame()
    navigate('/')
  }
  return (
    <div>
      <form className='formControl'>
        <div className='setColRow input'>
          <label>Columns :</label>
          <input
            type='number'
            min='7'
            max='14'
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
          />
        </div>
        <div className='setColRow  input'>
          <label>Rows :</label>
          <input
            type='number'
            min='6'
            max='12'
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>

        <div className='input'>
          <label>Player 1 Name :</label>
          <input
            type='text'
            placeholder={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </div>
        <div className='input'>
          <label>Player 2 Name :</label>
          <input
            type='text'
            placeholder={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </div>
        <div>
          <button
            type='submit'
            className='restartBtn'
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage
