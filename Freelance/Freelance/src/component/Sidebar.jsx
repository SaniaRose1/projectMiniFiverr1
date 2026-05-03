
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar=()=>{
  const location = useLocation();
   const navigate = useNavigate();
    const buttons = [
    {name: "Dashboard", path:"/dashboard"}
    ];
  

    return(
<div className="sidebar">
    <div className="d-flex flex-column  p-3 " style={{width: "280px"}}> <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"> <svg className="bi pe-none me-2" width="40" height="100" aria-hidden="true"><use xlinkHref="#bootstrap"></use></svg> <span className="fs-4" style={{fontWeight:"bold"}}>MiniFiverr</span> </a> <hr/> 
  
    
  {buttons.map((items,index)=>(
     
     <div className="listBtn" key={items.id || index} >
     <button type="button"  onClick={()=> navigate(items.path) } className={`btn  ${location.pathname === items.path ? "active" : " "}  `} >{items.name}</button>
</div>
     
  ))}  
   </div> </div>

    );
}
export default Sidebar;