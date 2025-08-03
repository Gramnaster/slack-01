import { Button } from "@mui/material"
// import { redirect } from "next/navigation"

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

export function SignMeUpButton({isLoading, disabled}) {
  return (
    <Button variant='contained' type='submit' aria-disabled={disabled} sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1}}>
      <img src='/assets/images/button-signup-01.png'/> {isLoading ? 'SIGNING...' : 'SIGN_ME_UP'}
    </Button>
  )
}

export function HomeButton() {
  return (
    <Button variant='contained' sx={{w:'120px', h:'42px', borderRadius: 0, gap: 1}}>
      <img src='/assets/images/button-signup-01.png'/>  (HOME_PAGE)
    </Button>
  )
}