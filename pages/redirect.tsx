import { useRouter } from 'next/router'
import AppContainer from '../components/AppContainer'
import words from '../config/words'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

const delta = 800
const startTimer = delta * 3

const RedirectPage: React.FC = () => {
  const router = useRouter()
  const [btnTxt, setBtnTxt] = useState<string>(`wait ${startTimer / delta}s`)

  const redirect = useAppSelector((s) => s.redirect.path)

  useEffect(() => {
    let i = startTimer
    const d = delta
    const timer = setInterval(() => {
      setBtnTxt(`wait ${Math.max(i / d, 0)}s`)
      if (i <= 0) {
        if (i <= 0) {
          router.push('/').catch(console.error)
        }
      }
      i -= d
    }, d)
    return () => clearInterval(timer)
  }, [])

  return (
    <AppContainer
      title={words.site.titles.redirect}
      subtitle='rerouting'
      buttonLink={redirect}
      buttonText={btnTxt}
      displayHero
    ></AppContainer>
  )
}

export default RedirectPage
