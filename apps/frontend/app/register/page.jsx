"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
export default function RegisterPage(){
  const router = useRouter()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [role,setRole]=useState("participant")
  const [err,setErr]=useState("")
  async function submit(e){
    e.preventDefault()
    setErr("")
    try{
      const res = await fetch("http://localhost:3001/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password,role})})
      const j = await res.json()
      if(!res.ok) throw new Error(j.message||"Signup failed")
      localStorage.setItem("token",j.token)
      router.push("/competitions")
    }catch(e){
      setErr(String(e.message))
    }
  }
  return (
    <main className="pageWrap">
      <div className="panel neon">
        <h1 className="brand">Mini Compete</h1>
        <p className="subtitle">Create an account</p>
        <form onSubmit={submit} className="form">
          <label className="field"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required/></label>
          <label className="field"><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/></label>
          <label className="field"><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/></label>
          <label className="field">
            <select value={role} onChange={e=>setRole(e.target.value)}>
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
          </label>
          <button className="btn primary" type="submit">Create account</button>
          {err && <div className="error">{err}</div>}
        </form>
        <div className="row"><a href="/login" className="link">Already have an account?</a></div>
      </div>
    </main>
  )
}
