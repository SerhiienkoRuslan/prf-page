import i18next from 'i18next'

import en from './locales/en/translation.json'
import uk from './locales/uk/translation.json'

i18next
  .cloneInstance({
    lng: 'en',
    fallbackLng: 'en',
  })
  .addResourceBundle('en', 'translation', en)
  .cloneInstance({
    lng: 'uk',
    fallbackLng: 'uk',
  })
  .addResourceBundle('uk', 'translation', uk)

export default i18next
