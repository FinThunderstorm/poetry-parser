import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import packagesReducer from './reducers/packagesSlice'
import Package from './components/Package'
import PackageList from './components/PackageList'
import UploadFile from './components/UploadFile'
import NotFound from './components/NotFound'

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
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="packages" element={<PackageList />}>
                                <Route path=":name" element={<Package />} />
                            </Route>
                            <Route path="upload" element={<UploadFile />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
