import React, { useContext } from 'react'
import { motion } from 'framer-motion'

import { GlobalContext } from '../../context/GlobalContext'
import useTheme from '../../hooks/useTheme'

import styles from './AboutProjectBox.module.scss'

interface PropsType {
  children: React.ReactNode
  title: string
}

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

const AboutProjectBox = ({ children, title }: PropsType) => {
  const { theme } = useContext(GlobalContext)
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      transition={{ delay: 0.3 }}
      variants={divVariants}
      className={addTheme(styles.projects)}
    >
      <h3 className={addTheme(styles.title)}>{title}</h3>
      <div className={styles.container}>{children}</div>
    </motion.div>
  )
}

export default AboutProjectBox
