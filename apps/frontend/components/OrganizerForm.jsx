"use client"
import {useState} from "react"
export default function OrganizerForm({onCreate}){
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  async function submit(e){
    e.preventDefault()
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:3001/api/competitions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({title,description:desc,tags:["coding"],capacity:10,regDeadline:new Date().toISOString()})})
    if(res.ok){onCreate&&onCreate(); setTitle(""); setDesc("")}
    else alert("Failed")
  }
  return (
    <form onSubmit={submit} className="form col">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required/>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" required/>
      <button className="btn primary" type="submit">Create</button>
    </form>
  )
}
