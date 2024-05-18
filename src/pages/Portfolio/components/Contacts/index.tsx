import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import Email_light from '../../../../assets/email-light.svg'
import Email_dark from '../../../../assets/email-dark.svg'
// import Phone_light from "../../../../assets/phone-light.svg";
// import Phone_dark from "../../../../assets/phone-dark.svg";
import Linkedin_dark from '../../../../assets/linkedin-dark.svg'
import Linkedin_light from '../../../../assets/linkedin-light.svg'
import Telegram_dark from '../../../../assets/telegram-dark.svg'
import Telegram_light from '../../../../assets/telegram-light.svg'
import Git_dark from '../../../../assets/git-dark.svg'
import Git_light from '../../../../assets/git-light.svg'

import { GlobalContext } from '../../../../context/GlobalContext'
import useTheme from '../../../../hooks/useTheme'
import ContactLink from '../ContactLink/ContactLink'
import styles from './Contacts.module.scss'

const Contacts = () => {
  const { t } = useTranslation()
  const { theme } = useContext(GlobalContext)
  const { addTheme } = useTheme(theme, styles.light)
  const [isCopy, setIsCopy] = useState(false)

  // TODO: need to fix that
  if (isCopy) {
    setTimeout(() => setIsCopy(false), 10000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('rserhiienko93@gmail.com')
    setIsCopy(true)
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
          <p className={addTheme(styles.emailContent)}>rserhiienko93@gmail.com</p>
        </div>
        <button className={addTheme(styles.copyButton)} onClick={handleCopy}>
          {isCopy ? t('home.copied') : t('home.copy')}
        </button>
      </div>

      {/* <div className={styles.phone}> */}
      {/*  <img */}
      {/*    className={styles.logo} */}
      {/*    src={theme ? Phone_light : Phone_dark} */}
      {/*    alt="phone" */}
      {/*  /> */}
      {/*  <p className={addTheme(styles.phoneContent)}>+38 (000) 000 00 00</p> */}
      {/* </div> */}

      <div className={styles.link}>
        <ContactLink
          link='https://www.linkedin.com/in/ruslan-serhiienko-b62007177/'
          logo={theme ? Linkedin_light : Linkedin_dark}
          alt='linkedin'
        />
        <ContactLink link='https://t.me/rserhiienko' logo={theme ? Telegram_light : Telegram_dark} alt='telegram' />
        <ContactLink link='https://github.com/SerhiienkoRuslan' logo={theme ? Git_light : Git_dark} alt='git' />
      </div>
    </motion.div>
  )
}

export default Contacts
