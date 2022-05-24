import React from 'react'
import { Route, Routes } from 'react-router-dom'

import UploadFile from './UploadFile'
import NotFound from './NotFound'
import PackageList from './PackageList'
import Layout from './Layout'
import Package from './Package'

/** App handles routing in frontend
 */
const App = () => (
    <Routes>
        <Route path="*" element={<Layout />}>
            <Route index element={<PackageList />} />
            <Route path="packages" element={<PackageList />}>
                <Route path=":name" element={<Package />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="upload" element={<UploadFile />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
)

export default App
