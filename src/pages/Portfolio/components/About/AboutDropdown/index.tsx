import { useGlobal } from '@/context/GlobalContext'
import useTheme from '@/hooks/useTheme'
import DropdownBox from '@/components/DropdownBox'

import styles from './AboutDropdown.module.scss'

interface PropsType {
  number: string
  name: string
  content: string[]
}

const AboutDropdown = ({ number, name, content }: PropsType) => {
  const { theme } = useGlobal()
  const { addTheme } = useTheme(theme, styles.light)

  return (
    <DropdownBox name={name} number={number}>
      <div className={styles.aboutItem}>
        {content.map((tech) => (
          <div key={tech} className={addTheme(styles.contentItem)}>
            {tech}
          </div>
        ))}
      </div>
    </DropdownBox>
  )
}

export default AboutDropdown
