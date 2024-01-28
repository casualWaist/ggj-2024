import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { setScriptIndex } from './App.tsx'
import './index.css'
import CaptureWrapper from "./components/CaptureWrapper.tsx"

// This is just structure, don't worry about it
setScriptIndex([""], 0)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CaptureWrapper>
          <App/>
      </CaptureWrapper>
  </React.StrictMode>,
)
