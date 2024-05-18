import { TFunction } from 'i18next'

export const CONTENT_TECHNOLOGIES = [
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'MobX',
  'Redux',
  'Next.js',
  'Node.js',
  'Express',
  'Nest.js',
  'MySQL2',
  'Sequelize / Prisma',
  'Flow.js',
  'HTML',
  'CSS',
  'jQuery',
  'Sass / Less / Scss',
  'Material UI',
  'TailwindCSS',
  'Bootstrap',
  'Git',
  'Apollo Client',
]

export const useAboutData = (t: TFunction<'translation', undefined, 'translation'>) => {
  const ABOUT_DATA = [
    { content: CONTENT_TECHNOLOGIES, name: t('home.skills') },
    {
      content: [t('home.univ')],
      name: t('home.edu'),
    },
    {
      content: [t('home.uk'), t('home.en')],
      name: t('home.lang'),
    },
  ]

  return ABOUT_DATA
}
