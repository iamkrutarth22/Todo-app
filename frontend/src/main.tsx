import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from './store/store.ts'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

    <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
