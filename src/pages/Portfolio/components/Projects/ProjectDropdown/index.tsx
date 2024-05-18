import { useTranslation } from 'react-i18next'

import { Project, useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'
import DropdownBox from '@/components/DropdownBox'

import GitButton_light from '@/../assets/gitButton-light.svg'
import GitButton_dark from '@/../assets/gitButton-dark.svg'

import ProjectCarousel from './ProjectCarousel'
import styles from './styles.module.scss'

type PropsType = {
  projectInfo: Project
  number: string
}

const ProjectDropdown = ({ projectInfo, number }: PropsType) => {
  const { technologies, name, desc, codeLink, demoLink, gallery, video } = projectInfo
  const { t } = useTranslation()
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <DropdownBox name={name} number={number}>
      {desc && (
        <>
          <h4 className={addTheme(styles.descTitle)}>{t('project.description')}</h4>
          <p className={addTheme(styles.desc)}>{desc}</p>
        </>
      )}

      <h4 className={addTheme(styles.descTitle)}>{t('project.technology')}</h4>
      <div className={styles.technologies}>
        {technologies.map((tech) => (
          <div key={tech} className={addTheme(styles.tech)}>
            {tech}
          </div>
        ))}
      </div>

      <div className={styles.links}>
        {codeLink && (
          <a className={addTheme(styles.linkCode)} href={codeLink} target='_blank' rel='noreferrer'>
            <img src={theme ? GitButton_light : GitButton_dark} alt='git' />
            <p className={addTheme(styles.codeName)}>{t('project.code')}</p>
          </a>
        )}

        {demoLink && (
          <a className={addTheme(styles.linkDemo)} href={demoLink} target='_blank' rel='noreferrer'>
            {t('project.demo')}
          </a>
        )}
      </div>

      {gallery?.length && (
        <div className={addTheme(styles.carouselWrapper)}>
          <ProjectCarousel gallery={gallery} name={name} />
        </div>
      )}

      {video && (
        <iframe
          width='100%'
          height='315'
          src={video}
          title='Video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      )}
    </DropdownBox>
  )
}

export default ProjectDropdown
