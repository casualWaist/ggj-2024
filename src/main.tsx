import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CaptureWrapper from "./components/CaptureWrapper.tsx"
// import Test from "./components/Test.tsx";

// This is just structure, don't worry about it

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CaptureWrapper>
          <App/>
      </CaptureWrapper>
      {/*<Test />*/}
  </React.StrictMode>,
)
