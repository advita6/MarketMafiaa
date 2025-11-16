"use client"
export default function Modal({open,children,onClose}){
  if(!open) return null
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modalCard neon" onClick={e=>e.stopPropagation()}>
        <button className="modalClose" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}
