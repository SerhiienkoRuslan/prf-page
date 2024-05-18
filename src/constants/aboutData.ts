import { TFunction } from 'i18next'

type AboutData = {
  key: 'skills' | 'education' | 'languages'
  name: string
}

export const useAboutData = (t: TFunction<'translation', undefined, 'translation'>): AboutData[] => {
  return [
    { key: 'skills', name: t('home.skills') },
    {
      key: 'education',
      name: t('home.education'),
    },
    {
      key: 'languages',
      name: t('home.language'),
    },
  ]
}
