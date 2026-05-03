import { useEffect, useReducer, useRef } from "react";
import axios from 'axios';
 
const PostReducer = ( currentPost , action)=>{
if(action.type ==="SetPosts"){
  return action.payload;
}

if(action.type ==="AddPost"){
  return  [ ...currentPost,action.payload];
}
else if(action.type === "DeletePost"){
 return post._id !== action.payload
 ;
}
return currentPost;
}


 const PostedTasks =()=>{
    const [posted , dispatchPost] = useReducer(PostReducer,[]);

    const  title = useRef();
    const   description = useRef();
    const  budget  = useRef();
    const issueDate =useRef();
    const deadlineDate  = useRef();
    const skill  = useRef ();

   
      const fetchPosts = async() => {
         try{
             const res = await  axios.get("http://localhost:5000/api/auth/posts");
              console.log("Fetched posts:", res.data);
             dispatchPost({type:"SetPosts" , payload:res.data});
         }
         catch(error)
         {
       console.log(error);
         }                  
      };
    
  useEffect(()=>{
   fetchPosts();
  },[]);
   
  const Addpost = async () =>{
      const tasks= { 
       title :  title.current.value,
        description :  description.current.value,
        budget :   budget .current.value,
       issueDate :issueDate.current.value,
        deadlineDate :deadlineDate.current.value,
        skill : skill.current.value,
      };

      try{
            const res = await  axios.post("http://localhost:5000/api/auth/posts",tasks);
             console.log("Added post:", res.data);
             dispatchPost({type:"AddPost" , payload:res.data});
      }
      catch(error){
         console.log(error);
      }
           
     }
              
            
     const DeletePost = async (id) =>{
       try{
              await  axios.delete(`http://localhost:5000/api/auth/posts/${id}`);
               console.log("Deleted post:", id); 
             dispatchPost({type:"DeletePost" , payload:id});
                  
      }
      catch(error){
         console.log(error);
      }
    }
                 
    return(
       <div className="Posted-Tasks">
        <h1 className="heading">POSTED TASKS</h1>
          <div className="postCreater">
              <input type="text" className="input" placeholder="Enter the Title" ref={title} />
              <input type="text" className="input" placeholder="Enter the Description" ref={description}/>
              <input type="number" className="input" placeholder="Enter the budget" ref={budget}/>
              <input type="date"  className="input" placeholder="Enter the issued date" ref={issueDate}/>
              <input type="date"className="input" placeholder="Enter the deadline date" ref={deadlineDate}/>
              <input type="text" className="input" placeholder="Enter the Required skills" ref={skill}/>
              <div style={{display:"flex" , justifyContent:"center"}}>
           <button type="button" id="create-post" onClick={Addpost}>Create Task</button>
              </div>
             </div>
                 
             
         <div className="postbox">
        {  posted.length!=0 ? (posted.map((post) => (
          <div key={post._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Budget: {post.budget}</p>
            <p>Issue Date: {post.issueDate}</p>
            <p>Deadline: {post.deadlineDate}</p>
            <p>Skills: {post.skill}</p>
             <div style={{display:"flex" , justifyContent:"center"}}>
             <button type="button" id="delete-post" onClick={()=> DeletePost(post._id)} >Delete Task</button>
             </div>
          </div>
        ))) :(<p>No data</p>)}
       
      </div>

       </div>
    )
 }
 export default PostedTasks;