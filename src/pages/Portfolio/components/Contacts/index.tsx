import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import Email_light from '@/../assets/email-light.svg'
import Email_dark from '@/../assets/email-dark.svg'
import Phone_light from '@/../assets/phone-light.svg'
import Phone_dark from '@/../assets/phone-dark.svg'
import Linkedin_dark from '@/../assets/linkedin-dark.svg'
import Linkedin_light from '@/../assets/linkedin-light.svg'
import Telegram_dark from '@/../assets/telegram-dark.svg'
import Telegram_light from '@/../assets/telegram-light.svg'
import Git_dark from '@/../assets/git-dark.svg'
import Git_light from '@/../assets/git-light.svg'

import ContactLink from './ContactLink'
import styles from './Contacts.module.scss'

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

const Contacts = () => {
  const { t } = useTranslation()
  const { theme, content } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)
  const [isCopy, setIsCopy] = useState(false)

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => setIsCopy(false), 10000)
    }
  }, [isCopy])

  const handleCopy = () => {
    navigator.clipboard.writeText(content.email).then(() => setIsCopy(true))
  }

  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      transition={{ delay: 0.2 }}
      variants={divVariants}
      className={addTheme(styles.contacts)}
    >
      <h3 className={addTheme(styles.title)}>{t('home.contact')}</h3>

      <div className={addTheme(styles.email)}>
        <div className={styles.emailItem}>
          <img className={styles.logo} src={theme ? Email_light : Email_dark} alt='email' />
          <p className={addTheme(styles.emailContent)}>{content.email}</p>
        </div>

        <button className={addTheme(styles.copyButton)} onClick={handleCopy}>
          {isCopy ? t('home.copied') : t('home.copy')}
        </button>
      </div>

      {content.phone && (
        <div className={styles.phone}>
          <img className={styles.logo} src={theme ? Phone_light : Phone_dark} alt='phone' />
          <p className={addTheme(styles.phoneContent)}>{content.phone}</p>
        </div>
      )}

      <div className={styles.link}>
        {content.social.linkedin && (
          <ContactLink link={content.social.linkedin} logo={theme ? Linkedin_light : Linkedin_dark} alt='linkedin' />
        )}

        {content.social.telegram && (
          <ContactLink link={content.social.telegram} logo={theme ? Telegram_light : Telegram_dark} alt='telegram' />
        )}

        {content.social.github && (
          <ContactLink link={content.social.github} logo={theme ? Git_light : Git_dark} alt='git' />
        )}
      </div>
    </motion.div>
  )
}

export default Contacts
