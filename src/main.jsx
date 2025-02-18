import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CollectionsProvider } from './Components/CollectionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CollectionsProvider>
    <App />
  </CollectionsProvider>,
  </StrictMode>,
)
