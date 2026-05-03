import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout1 = ()=>{
  return(
<div className='container'>
  <Sidebar/>
  <div style={{flex:1}}>
    <Outlet/>
  </div>
  </div>
  );
}
export default Layout1;