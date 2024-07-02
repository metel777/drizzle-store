'use client'

import React from "react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

type Props = {
  toastTitle: string
  toastDescription: string
  toastVariant?: "destructive" | "default" | "success" 
  btnVariant?:
    | "link"
    | "primary"
    | "primary-black"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined
  type?: "button" | "submit" | "reset" 
  size?: "default" | "sm" | "lg" | "icon" 
  children: React.ReactNode
}
export default function SubmitBtnWithToast({
  toastTitle,
  toastDescription,
  size = "default",
  type,
  btnVariant = "primary",
  toastVariant = 'default',
  children
}: Props) {
  return (
    <Button
      onClick={() => {
        toast({
          title: toastTitle,
          description: toastDescription,
          variant: toastVariant,
          duration: 1500
        })
      }}
      size={size}
      type={type}
      variant={btnVariant}
    >
     {children}
    </Button>
  )
}
