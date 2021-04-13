import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import en from '@@/assets/locale/ru.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    en,
  },
});

const loadedLanguages = ['ru'];

function setI18nLanguage(lang: string) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  const htmlEl = document.querySelector('html');
  if (htmlEl) htmlEl.setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang: string) {
  // If the language was already loaded
  if (i18n.locale === lang || loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(`@@/assets/locale/${lang}.json`).then(messages => {
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}
