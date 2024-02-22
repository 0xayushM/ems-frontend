import { useState } from 'react'
import './App.css'
import ListComponent from './components/ListComponent'
import { Header } from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Create } from './components/Create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          {/*http://localhost:3000 */}
          <Route path='/' element = {<ListComponent/>}></Route>
          {/* http://localhost:3000/employees */}
          <Route path='/employees' element={<ListComponent/>}></Route>
          {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<Create/>}></Route>
          {/* http://localhost:3000/edit-employee/:id */}
          <Route path='/edit-employee/:id' element={<Create/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
