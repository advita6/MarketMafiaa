"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"
export default function LoginPage(){
  const router = useRouter()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [err,setErr]=useState("")
  async function submit(e){
    e.preventDefault()
    setErr("")
    try{
      const res = await fetch("http://localhost:3001/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})})
      const j = await res.json()
      if(!res.ok) throw new Error(j.message||"Login failed")
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
        <p className="subtitle">Sign in to continue</p>
        <form onSubmit={submit} className="form">
          <label className="field"><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/></label>
          <label className="field"><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/></label>
          <button className="btn primary" type="submit">Sign in</button>
          {err && <div className="error">{err}</div>}
        </form>
        <div className="row"><a href="/register" className="link">Create account</a></div>
      </div>
    </main>
  )
}
