
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostedTasks from "./component/PostedTasks";
import Layout from './component/Layout';
import Dashboard from './component/Dashboard';
import Layout1 from './component/Layout1';
import Authentication from "./component/Authenticatication";
import Applyfortasks from "./component/Applyfortasks";



function App() {
 return(
 
 <Routes>
<Route path="/" element={<Authentication/>}/>
<Route path='/' element={<Layout/>}>
<Route path="/dashboard" element={<Dashboard/>}/>
</Route>
<Route path='/PostedTasks' element={<Layout1><PostedTasks/></Layout1>}/>
<Route path='/ApplyForTasks' element={<Layout1><Applyfortasks/></Layout1>}/>
</Routes>

  )
}

export default App;
