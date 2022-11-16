import AppContainer from '../components/AppContainer'
import words from '../config/words'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../client-store'
import links from '../config/links'
import useRedirect from '../hooks/useRedirect'

const delta = 800
const startTimer = delta * 3

const LogoutPage: React.FC = () => {
  const gotoHome = useRedirect(links.home)
  const [btnTxt, setBtnTxt] = useState<string>(`wait ${startTimer / delta}s`)

  const dispatch = useAppDispatch()

  dispatch({ type: 'token/delete' })

  useEffect(() => {
    let i = startTimer
    const d = delta
    const timer = setInterval(() => {
      setBtnTxt(`wait ${Math.max(i / d, 0)}s`)
      if (i <= 0) {
        gotoHome()
      }
      i -= d
    }, d)
    return () => clearInterval(timer)
  }, [])

  return (
    <AppContainer
      title={words.site.titles.logout}
      subtitle='logout in progress'
      buttonLink={links.home}
      buttonText={btnTxt}
      displayHero
    ></AppContainer>
  )
}

export default LogoutPage
