import SizingSettingsProvider from './context/SizingContext'
import BoardSettingsProvider from './context/BoardContext'
import WinningProvider from './context/WinningContext'
import Board from './components/Board'

const App = () => {
  return (
    <div className='App'>
      <SizingSettingsProvider>
        <BoardSettingsProvider>
          <WinningProvider>
            <h1>Connect 4 Game</h1>
            <Board />
          </WinningProvider>
        </BoardSettingsProvider>
      </SizingSettingsProvider>
    </div>
  )
}

export default App
