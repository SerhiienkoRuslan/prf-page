import React from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import styles from './Projects.module.scss'
import ProjectDropdown from './ProjectDropdown'

const Projects = () => {
  const { theme, content } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)
  const { t } = useTranslation()

  return (
    <div className={addTheme(styles.project)}>
      <h3 className={addTheme(styles.title)}>{t('home.project')}</h3>

      <div className={styles.container}>
        {content.projects.map((data, index) => (
          <ProjectDropdown key={data.name} projectInfo={data} number={`${String(index + 1).padStart(2, '0')}.`} />
        ))}
      </div>
    </div>
  )
}

export default Projects
