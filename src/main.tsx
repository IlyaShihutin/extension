import React from 'react'
import ReactDOM from 'react-dom/client'

import { WalletProvider } from './store/WalletContext.tsx'
import { PageProvider } from './store/PageContext.tsx'

import Home from './Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageProvider>
      <WalletProvider>
        <Home />
      </WalletProvider>
    </PageProvider>
  </React.StrictMode>,
)
