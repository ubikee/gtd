import React from 'react';
import { Site, Page } from 'ywana-core6'
import { AppContextProvider } from './AppContext'
import Inbox from './pages/inbox/page'
import Login from './pages/login/page'

/**
 * Site
 */
const AppSite = () => {

  const init = 'LOGIN'
  
  return (
    <Site title="Ubikee GTD" init={init} min>
      <Page id="INBOX" section="AGENT" icon="inbox" title="Bandeja" layout="workspace">
        <Inbox />
      </Page>
      <Page id="LOGIN" section="APP" icon="exit_to_app" layout="page">
            <Login landingPage="INBOX" user="jeroldan@ywana.com" pwd="12345678"/>
        </Page>
    </Site>
  )
}

/**
 * App
 */
const App = (props) => {
  return (
    <AppContextProvider>
      <AppSite />
    </AppContextProvider>
  )
}

export default App;

