import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-variant': '#F5F5F5',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-background': '#1C1B1F',
          'on-surface': '#1C1B1F',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#616161',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#121212',
          surface: '#212121',
          'surface-variant': '#424242',
          'on-primary': '#000000',
          'on-secondary': '#FFFFFF',
          'on-background': '#FFFFFF',
          'on-surface': '#FFFFFF',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
