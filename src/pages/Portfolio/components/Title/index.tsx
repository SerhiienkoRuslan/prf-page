import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import Download from '@/../assets/download.svg'

import styles from './Title.module.scss'

const divVariants = {
  hidden: {
    y: 500,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Title = () => {
  const { t } = useTranslation()
  const { theme, content } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      transition={{ delay: 0.1 }}
      variants={divVariants}
      className={addTheme(styles.title)}
    >
      <div className={styles.desc}>
        <div className={addTheme(styles.avatarWrapper)}>
          <img className={styles.avatar} src={content.avatar} alt='avatar' />
        </div>

        <div className={styles.name}>
          <h2 className={addTheme(styles.nameItem)}>{content.name}</h2>
          <p className={addTheme(styles.profession)}>{content.title}</p>
        </div>
      </div>

      {/* TODO: need refactor */}
      {content.cvFile && (
        <a href={content.cvFile} target='_blank' rel='noreferrer' download='resume.pdf'>
          <button className={styles.button}>
            <div className={styles.downloadButton}>
              <p>{t('home.download')}</p>
              <img src={Download} alt='download' />
            </div>
          </button>
        </a>
      )}
    </motion.div>
  )
}

export default Title
