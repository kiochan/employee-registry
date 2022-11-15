import { useRouter } from 'next/router'
import AppContainer from '../components/AppContainer'
import links from '../config/links'
import words from '../config/words'
import { useAppSelector } from '../hooks/useAppSelector'

const HomePage: React.FC = () => {
  const token = useAppSelector((s) => s.token.value)
  const router = useRouter()

  if (token !== null) {
    router.push(links.employees).catch(console.error)
  }

  return (
    <AppContainer
      title={words.site.name}
      buttonLink={links.login}
      buttonText={words.site.titles.login}
      subtitle={words.text.loginRequired}
    ></AppContainer>
  )
}

export default HomePage
