import React, { useContext, useEffect } from 'react'
import { WinningContext } from '../context/WinningContext'
import { BoardSettingsContext } from '../context/BoardContext'
import { SizingSettingsContext } from '../context/SizingContext'

const GameControlPanel = () => {
  const { player1Name, player2Name } = useContext(SizingSettingsContext)
  const { win } = useContext(WinningContext)
  const {
    currentPlayer,
    colors,
    restartGame,
    undoPrevBoard,
    board,
    draw,
    setDraw,
  } = useContext(BoardSettingsContext)

  useEffect(() => {
    if (!board.includes(colors.empty)) {
      setDraw(true)
    }
  }, [board, setDraw, colors.empty])

  return (
    <div>
      {localStorage.previousBoard && (
        <>
          {!win && (
            <button className='undoBtn' onClick={undoPrevBoard}>
              <i className='fas fa-undo-alt'></i>Undo
            </button>
          )}
          <button className='restartBtn' onClick={restartGame}>
            Restart Game
          </button>
        </>
      )}

      {!win && !draw && (
        <h2 style={{ color: currentPlayer }}>
          TURN:
          {currentPlayer === colors.player1
            ? player1Name.toUpperCase()
            : player2Name.toUpperCase()}
        </h2>
      )}
      {win ? (
        <>
          <h2 style={{ color: win.winner }}>
            {win.winner === colors.player1
              ? player1Name.toUpperCase()
              : player2Name.toUpperCase()}{' '}
            WON!!
          </h2>
        </>
      ) : draw ? (
        <h2> DRAW !!!</h2>
      ) : (
        <span></span>
      )}
    </div>
  )
}

export default GameControlPanel
