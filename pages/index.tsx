import AppContainer from '../components/AppContainer'
import links from '../config/links'
import words from '../config/words'
import { useAppSelector } from '../hooks/useAppSelector'
import useRedirect from '../hooks/useRedirect'

const HomePage: React.FC = () => {
  const token = useAppSelector((s) => s.token.value)
  const gotoEmployees = useRedirect(links.employees)

  if (token !== null) {
    gotoEmployees()
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
