"use client"
import {useEffect,useState} from "react"
import Header from "../../components/Header"
export default function Profile(){
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
        <div className="card neonLarge">
          <h2>Profile</h2>
          <div className="meta"><strong>Name:</strong> {me?.name}</div>
          <div className="meta"><strong>Email:</strong> {me?.email}</div>
          <div className="meta"><strong>Role:</strong> {me?.role}</div>
          <div className="row">
            <button className="btn accent" onClick={()=>{localStorage.removeItem("token");location.href="/login"}}>Log out</button>
          </div>
        </div>
      </main>
    </>
  )
}
