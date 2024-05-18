import React, { createContext, useContext, useState, ReactNode, FC } from 'react'

export type Project = {
  technologies: string[]
  name: string
  desc: string
  codeLink?: string
  demoLink?: string
  gallery?: string[]
  video?: string
}

export type AppContent = {
  name: string
  description: string
  title: string
  cvFile: string
  email: string
  phone?: string
  social: {
    linkedin?: string
    github?: string
    telegram?: string
  }
  about: {
    skills: string[]
    education: string[]
    languages: string[]
  }
  projects: Project[]
}

type GlobalContextProps = {
  changeTheme: () => void
  theme: boolean
  setContent: React.Dispatch<React.SetStateAction<AppContent>>
  content: AppContent
}

const initialContent: AppContent = {
  name: '',
  description: '',
  title: '',
  cvFile: '',
  email: '',
  phone: '',
  social: {
    linkedin: '',
    github: '',
    telegram: '',
  },
  about: {
    skills: [],
    education: [],
    languages: [],
  },
  projects: [],
}
const initialTheme = false

export const GlobalContext = createContext<GlobalContextProps>({
  changeTheme: () => {},
  theme: initialTheme,
  setContent: () => {},
  content: initialContent,
})

interface Props {
  children?: ReactNode
}

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(initialTheme)
  const [content, setContent] = useState<AppContent>(initialContent)

  const changeTheme = () => {
    setTheme((prev) => !prev)
  }

  return <GlobalContext.Provider value={{ changeTheme, theme, setContent, content }}>{children}</GlobalContext.Provider>
}

export const useGlobal = (): GlobalContextProps => useContext(GlobalContext)
