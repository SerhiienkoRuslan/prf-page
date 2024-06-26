import React, { useState } from 'react'

import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'

import Marker_light from '@/../assets/marker-light.svg'
import Marker_dark from '@/../assets/marker-dark.svg'

import styles from './DropdownBox.module.scss'

interface PropsType {
  children: React.ReactNode
  number: string
  name: string
}

const DropdownBox = ({ children, number, name }: PropsType) => {
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  const [open, setOpen] = useState(false)

  return (
    <div className={addTheme(styles.details)}>
      <div
        className={addTheme(open ? `${styles.summary} ${styles.active}` : styles.summary)}
        data-atr='summary'
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div className={styles.contentItem}>
          <p className={addTheme(styles.number)}>{number}</p>
          <h3 className={addTheme(styles.name)}>{name}</h3>
        </div>

        <img
          className={open ? `${styles.marker} ${styles.active}` : styles.marker}
          src={theme ? Marker_light : Marker_dark}
          alt='marker'
        />
      </div>

      <div className={addTheme(open ? `${styles.content} ${styles.active}` : styles.content)}>{open && children}</div>
    </div>
  )
}

export default DropdownBox
