import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import styles from './Generally.module.scss'

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

const Generally = () => {
  const { t } = useTranslation()
  const { theme, content } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      transition={{ delay: 0.2 }}
      variants={divVariants}
      className={addTheme(styles.generally)}
    >
      <h3 className={addTheme(styles.generallyTitle)}>{t('home.generally')}</h3>
      <p className={addTheme(styles.generallyContent)}>{content.description}</p>
    </motion.div>
  )
}

export default Generally
