import { useContext } from 'react'

import { GlobalContextProvider, GlobalContext } from './context/GlobalContext'
import Portfolio from './pages/Portfolio'

import Header from './components/Header'
import AnimatedCursor from './components/Cursor'

import './i18next'
import './App.css'

const AppComponent = () => {
  const { theme } = useContext(GlobalContext)

  const isNotMobile = window.innerWidth >= 768

  return (
    <div className='App' style={{ background: theme ? '#fff' : '#0c151d' }}>
      {isNotMobile && <AnimatedCursor />}
      <div className='appWrapper'>
        <Header />
        <Portfolio />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <GlobalContextProvider>
      <AppComponent />
    </GlobalContextProvider>
  )
}

export default App
