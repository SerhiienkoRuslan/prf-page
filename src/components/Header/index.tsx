import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import LanguagesSelector from './LanguagesSelector'
import ThemeButton from './ThemeButton'
import styles from './Header.module.scss'

const Header = () => {
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <div className={addTheme(styles.header)}>
      <div className={styles.item}>
        <ThemeButton />
      </div>

      <div className={styles.item}>
        <LanguagesSelector />
      </div>
    </div>
  )
}

export default Header
