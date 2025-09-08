import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/testvar.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState<string | null>(null)

  function updateTheme () {
    const themeList = [null, 'light', 'dark']
    let idx = themeList.indexOf(theme) + 1
    if (idx >= themeList.length) {
      idx = 0
    }
    setTheme(themeList[idx])
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme ?? ''
  }, [theme]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1><span style={{color: 'var(--color-a01)'}}>Vite</span> + <span style={{color: 'var(--color-a02)'}}>React</span></h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div style={{display: 'inline-block', width: 20}} />
        <button onClick={updateTheme}>
          theme is {String(theme)}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
