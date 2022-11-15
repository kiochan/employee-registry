import type { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#efefef',
    },
    secondary: {
      main: '#efefef',
    },
  },
  typography: {
    fontFamily: ['Shippori Mincho', 'serif'].map((s) => `"${s}"`).join(', '),
    allVariants: {
      color: '#ffffff',
    },
    subtitle2: {
      fontFamily: ['Passions Conflict', 'cursive'].map((s) => `"${s}"`).join(', '),
    },
  },
}

const theme = createTheme(themeOptions)

export default theme
