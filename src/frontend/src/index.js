import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import packagesReducer from './reducers/packagesSlice'
import App from './components/App'

const store = configureStore({
    reducer: {
        packages: packagesReducer,
    },
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#009688',
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
