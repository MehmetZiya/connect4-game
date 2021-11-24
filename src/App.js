import SizingSettingsProvider from './context/SizingContext'
import BoardSettingsProvider from './context/BoardContext'
import Board from './components/Board'

const App = () => {
  return (
    <div className='App'>
      <SizingSettingsProvider>
        <BoardSettingsProvider>
          <h1>Connect 4 Game</h1>
          <Board />
        </BoardSettingsProvider>
      </SizingSettingsProvider>
    </div>
  )
}

export default App
