"use client"
import {useEffect,useState} from "react"
import Header from "../../components/Header"
export default function Dashboard(){
  const [me,setMe]=useState(null)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token) return
    fetch("http://localhost:3001/api/auth/me",{headers:{"Authorization":"Bearer "+token}}).then(r=>r.json()).then(setMe).catch(()=>setMe(null))
  },[])
  return (
    <>
      <Header/>
      <main className="container">
        <div className="gridTwo">
          <div className="card neonLarge">
            <h3>Welcome</h3>
            <p>{me?me.name:"Guest"}</p>
          </div>
          <div className="card neonLarge">
            <h3>Your quick actions</h3>
            <div className="col">
              <a className="btn ghost" href="/competitions">Browse competitions</a>
              <a className="btn ghost" href="/profile">Profile</a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
