import React from "react"

type C = {
    children: React.ReactNode
}

export function H1({children}: C) {
  return (
    <h1 className="text-2xl font-bold text-text-strong mb-5">{children}</h1>
  )
}
export function H2({children}: C) {
  return (
    <h1 className="text-xl font-bold text-text-strong mb-5">{children}</h1>

  )
}
export function H3({children}: C) {
  return (
    <h3>titles</h3>
  )
}