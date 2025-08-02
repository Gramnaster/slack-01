import { Button } from "@mui/material"
import { redirect } from "next/navigation"

export default function LoginButton() {
  return (
    <Button variant='contained' sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1}}>
      <img src='/assets/images/button-login-01.png'/> LOG_IN
    </Button>
  )
}

export function SignUpButton() {
  return (
    <Button variant='contained' sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1}}>
      <img src='/assets/images/button-signup-01.png'/> SIGN_UP
    </Button>
  )
}

export function SignMeUpButton() {
  const handleRedirect = () => {
    redirect('/login');
  }
  return (
    <Button variant='contained' type='submit' sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1}} onClick={handleRedirect}>
      <img src='/assets/images/button-signup-01.png'/> SIGN_ME_UP
    </Button>
  )
}