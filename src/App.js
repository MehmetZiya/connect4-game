import { Routes, Route } from 'react-router-dom'
import SizingSettingsProvider from './context/SizingContext'
import BoardSettingsProvider from './context/BoardContext'
import WinningProvider from './context/WinningContext'
import Board from './components/Board'
import SettingsPage from './components/SettingsPage'

const App = () => {
  return (
    <div className='App'>
      <SizingSettingsProvider>
        <BoardSettingsProvider>
          <WinningProvider>
            <h1>Connect 4 Game</h1>
            <Routes>
              <Route path='/' element={<Board />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Routes>
          </WinningProvider>
        </BoardSettingsProvider>
      </SizingSettingsProvider>
    </div>
  )
}

export default App
