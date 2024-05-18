import { useEffect } from 'react'
import { GlobalContextProvider, useGlobal } from './context/GlobalContext'
import Portfolio from './pages/Portfolio'

import Header from './components/Header'
import AnimatedCursor from './components/Cursor'

import './i18next'
import './App.css'

const AppComponent = (appContent: any) => {
  const { theme, setContent } = useGlobal()

  useEffect(() => {
    if (appContent) {
      setContent(appContent)
    }
  }, [appContent])

  return (
    <div className='App' style={{ background: theme ? '#fff' : '#0c151d' }}>
      <AnimatedCursor />

      <div className='appWrapper'>
        <Header />
        <Portfolio />
      </div>
    </div>
  )
}

const App = (appContent: any) => {
  return (
    <GlobalContextProvider>
      <AppComponent appContent={appContent} />
    </GlobalContextProvider>
  )
}

export default App
