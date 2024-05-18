import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'
import { selectLanguages } from '@/constants/selectData'

import USA from '@/../assets/Flag_of_the_United_States 1.svg'
import UA from '@/../assets/Ukraine.svg'
import marker_dark from '@/../assets/marker-dark.svg'
import marker_light from '@/../assets/marker-light.svg'
import select_dark from '@/../assets/select-dark.svg'
import select_light from '@/../assets/select-light.svg'

import Popper from '../../Popper'
import styles from './LanguagesSelector.module.scss'

const LanguagesSelector = () => {
  const { i18n } = useTranslation()
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  const [openSelector, setOpenSelector] = useState(false)

  const handleChange = (language: 'en' | 'uk') => {
    i18n.changeLanguage(language).then(() => {
      setOpenSelector(false)
    })
  }

  return (
    <div className={styles.languageSelector}>
      <button
        className={addTheme(openSelector ? `${styles.select} ${styles.active}` : styles.select)}
        onClick={() => {
          setOpenSelector(!openSelector)
        }}
      >
        <img className={styles.logo} src={i18n.language === 'en' ? USA : UA} alt='usa' />
        {i18n.language === 'en' ? 'ENG' : 'UA'}
        <img
          className={openSelector ? `${styles.marker} ${styles.active}` : styles.marker}
          src={theme ? marker_light : marker_dark}
          alt='marker'
        />
      </button>

      {openSelector && (
        <Popper open={openSelector} onClickOutside={() => setOpenSelector(false)}>
          {selectLanguages.map((lng) => (
            <button
              className={addTheme(styles.menuItem)}
              onClick={() => handleChange(lng.selectLang as 'en' | 'uk')}
              key={lng.selectLang}
            >
              <div className={addTheme(styles.item)}>
                <img className={styles.logo} src={lng.src} alt={lng.selectLang} />
                {lng.viewLang}
              </div>

              {i18n.language === lng.selectLang && (
                <img className={styles.selectArrow} src={theme ? select_light : select_dark} alt='select' />
              )}
            </button>
          ))}
        </Popper>
      )}
    </div>
  )
}

export default LanguagesSelector
