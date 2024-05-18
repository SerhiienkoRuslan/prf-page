import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAboutData } from '@/constants/aboutData'
import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import AboutDropdown from './AboutDropdown'
import styles from './About.module.scss'

const About = () => {
  const { theme, content } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)
  const { t } = useTranslation()
  const aboutData = useAboutData(t)

  return (
    <div className={addTheme(styles.about)}>
      <h3 className={addTheme(styles.title)}>{t('about')}</h3>

      <div className={styles.container}>
        {aboutData.map((data, index) => (
          <AboutDropdown
            key={data.key}
            content={content.about[data.key]}
            number={`${String(index + 1).padStart(2, '0')}.`}
            name={data.name}
          />
        ))}
      </div>
    </div>
  )
}

export default About
