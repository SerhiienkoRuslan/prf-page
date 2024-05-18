import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import Title from './components/Title'
import Generally from './components/Generally'
import Contacts from './components/Contacts'
import About from './components/About'
import Projects from './components/Projects'

import styles from './Portfolio.module.scss'

const Portfolio = () => {
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <div className={addTheme(styles.main)}>
      <Title />

      <div className={styles.info}>
        <Generally />
        <Contacts />
      </div>

      <div className={styles.content}>
        <About />
        <Projects />
      </div>
    </div>
  )
}

export default Portfolio
