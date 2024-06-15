import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { Navigate, Route, Routes,BrowserRouter } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from "./context/AuthContext";
function App() {
    const {authUser}=useAuthContext()
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser? <Home/>:<Navigate to={"/sign-in"}/>}/>
          <Route path="/sign-in" element={authUser? <Navigate to='/'/>:<SignIn/>}/>
          <Route path="/sign-up" element={authUser? <Navigate to='/'/>:<SignUp/>}/>
        </Routes>
        <Toaster/>
        </BrowserRouter>
      
      
      </div>
    </>
  )
}

export default App
