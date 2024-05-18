import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import Theme_light from '../../../../assets/theme-light.svg'
import Theme_dark from '../../../../assets/theme-dark.svg'

import styles from './ThemeButton.module.scss'

const ThemeButton = () => {
  const { changeTheme, theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <button className={addTheme(styles.themeButton)} onClick={changeTheme}>
      <img className={addTheme(styles.themeImg)} src={theme ? Theme_light : Theme_dark} alt='theme' />
    </button>
  )
}

export default ThemeButton
