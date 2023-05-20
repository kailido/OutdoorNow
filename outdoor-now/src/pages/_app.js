import '@/styles/globals.css'
import { UserAuthProvider } from '../context/userAuth'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme'

export default function App({ Component, pageProps }) {
  return (
    <UserAuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserAuthProvider>
  )
}
