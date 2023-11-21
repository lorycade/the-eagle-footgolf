import './App.css'
import RoutersCst from './RoutersCst'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeOptions } from './theme/theme';
import UserContextProvider from './context/userContext'
import { useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {

  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <UserContextProvider>
          <CssBaseline />
          <RoutersCst />
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
