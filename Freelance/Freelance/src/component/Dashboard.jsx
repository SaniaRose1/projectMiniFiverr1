 import {useNavigate} from "react-router-dom";

const Dashboard =()=>{

  const navigate = useNavigate();
    return(
    
    <div className="dashboard">

     <div id="poster">
       <h1>For Poster </h1>
       <button className="btns" onClick={() => navigate("/PostedTasks")}>Post Tasks</button>
        <button  className="btns">Applicant List</button>
         <button  className="btns"> Selected Freelancer</button>
        </div>
         <div id="freelancer">
          <h1> For Freelancer</h1>
          <button  className="btns" onClick={() => navigate("/ApplyForTasks")}>Apply for  Task</button>
        <button  className="btns"> Tasks Completed</button>
         <button  className="btns"> Earnings</button>
        </div>
    </div>
    );
}
export default Dashboard;