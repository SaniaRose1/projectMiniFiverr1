import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Authentication =() => {
  const navigate = useNavigate();

  const [role, setRole] = useState("poster");

  
  const [posterData, setPosterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [freelancerData, setFreelancerData] = useState({
    name: "",
    email: "",
    password: "",
    skill: "",
    rating: ""
  });


  const handleRegister = async (e) => {
    e.preventDefault();

    let data =
      role === "poster"
        ? { ...posterData, role }
        : { ...freelancerData, role };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);

      alert("Registered Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();

    let data =
      role === "poster"
        ? {
            email: posterData.email,
            password: posterData.password,
            role
          }
        : {
            email: freelancerData.email,
            password: freelancerData.password,
            role
          };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
      
        localStorage.setItem("user", JSON.stringify(result.user));

       
        navigate("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container2">
    <div style={{ textAlign: "center", marginTop: "100px"  }}>
      <h2 style={{fontWeight:"bold"}} className="glow-text">MINIFIVERR</h2>

     <div className="container1">
      <div style={{padding:"10px", marginBottom: "20px" , marginTop:"30px" ,marginLeft:"30px",width:"400px",height:"70px",border:"7px solid black",borderRadius:"10px"}}>
        <button
          onClick={() => setRole("poster")}
          style={{ background: role === "poster" ? "green" : "",width:"150px",height:"38px",borderRadius:"10px" }}
        >
          POSTER
        </button>

        <button
          onClick={() => setRole("freelancer")}
          style={{ background: role === "freelancer" ? "green" : "" ,width:"150px",height:"38px",borderRadius:"10px" }}
        >
          FREELANCER
        </button>
      </div>

      <form>
       
        {role === "poster" && (
          <div>
            <input
              type="text"
              className="datas"
              placeholder="Name"
              value={posterData.name}
              onChange={(e) =>
                setPosterData({ ...posterData, name: e.target.value })
              }
            />
            <br /><br />

            <input
              type="email"
               className="datas"
              placeholder="Email"
              value={posterData.email}
              onChange={(e) =>
                setPosterData({ ...posterData, email: e.target.value })
              }
            />
            <br /><br />

            <input
              type="password"
               className="datas"
              placeholder="Password"
              value={posterData.password}
              onChange={(e) =>
                setPosterData({ ...posterData, password: e.target.value })
              }
            />
          </div>
        )}

       
        {role === "freelancer" && (
          <div>
            <input
              type="text"
               className="datas"
              placeholder="Name"
              value={freelancerData.name}
              onChange={(e) =>
                setFreelancerData({
                  ...freelancerData,
                  name: e.target.value
                })
              }
            />
            <br /><br />

            <input
              type="email"
               className="datas"
              placeholder="Email"
              value={freelancerData.email}
              onChange={(e) =>
                setFreelancerData({
                  ...freelancerData,
                  email: e.target.value
                })
              }
            />
            <br /><br />

            <input
              type="password"
               className="datas"
              placeholder="Password"
              value={freelancerData.password}
              onChange={(e) =>
                setFreelancerData({
                  ...freelancerData,
                  password: e.target.value
                })
              }
            />
            <br /><br />

            <input
              type="text"
               className="datas"
              placeholder="Skill"
              value={freelancerData.skill}
              onChange={(e) =>
                setFreelancerData({
                  ...freelancerData,
                  skill: e.target.value
                })
              }
            />
            <br /><br />

            <input
              type="number"
               className="datas"
              placeholder="Rating"
              value={freelancerData.rating}
              onChange={(e) =>
                setFreelancerData({
                  ...freelancerData,
                  rating: e.target.value
                })
              }
            />
          </div>
        )}

        <br />

       
        <button id="bt1"   onClick={handleLogin}>LOGIN</button>
        <button id="bt2"    onClick={handleRegister}>REGISTER</button>
      </form>
      </div>
    </div>
    </div>
  );
}

export default Authentication;