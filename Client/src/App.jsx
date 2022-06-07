
import './App.css'
import { Nav } from './components/Navbar'
import {Home} from "./components/Home"
import { SignUp } from './components/Signup'
import { Login } from './components/Login'
import {  Routes, Route} from "react-router-dom"
function App() {
 

  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route path='/' element={ <Home></Home>}></Route>
        <Route path='/login' element={ <Login></Login>}></Route>
        <Route path='/signup' element={ <SignUp></SignUp>}></Route>
      </Routes>
     
    </div>
  )
}

export default App
