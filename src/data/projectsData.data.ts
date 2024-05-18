import { TFunction } from 'i18next'

export const useProjectData = (t: TFunction<'translation', undefined, 'translation'>) => {
  const PROJECTS_DATA = [
    {
      name: 'Exchange rate',
      technologies: [
        'React',
        'React hooks',
        'TypeScript',
        'Next JS',
        'MobX',
        'Material UI',
        'AntDesignCharts',
        'Toaster',
        'REST API',
      ],
      desc: t('project.description_exchange_rate'),
      codeLink: 'https://github.com/SerhiienkoRuslan/exchange_rate',
      demoLink: 'https://exchange-rate-sigma.vercel.app/',
      gallery: ['ExchangeRate/ER1.png', 'ExchangeRate/ER2.png', 'ExchangeRate/ER3.png', 'ExchangeRate/ER4.png'],
      // video: "#",
    },
    {
      name: 'Weather widget',
      technologies: ['React', 'React hooks', 'TypeScript', 'Redux Toolkit', 'Redux Thunk', 'REST API', 'Toaster'],
      desc: t('project.description_weather_widget'),
      codeLink: 'https://github.com/SerhiienkoRuslan/weather_widget',
      demoLink: 'https://weather-widget-beta-peach.vercel.app/',
      gallery: ['WeatherWidget/WW1.png', 'WeatherWidget/WW2.png', 'WeatherWidget/WW3.png'],
      // video: "#",
    },
  ]

  return PROJECTS_DATA
}
