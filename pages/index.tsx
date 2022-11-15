import AppContainer from '../components/AppContainer'
import words from '../config/words'

const HomePage: React.FC = () => {
  return <AppContainer title={words.site.titles.home} buttonLink='/login'></AppContainer>
}

export default HomePage
