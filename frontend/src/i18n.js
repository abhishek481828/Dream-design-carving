import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ne'],
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['localStorage', 'cookie'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            checkWhitelist: true,
        },
        load: 'languageOnly', // Load 'en' instead of 'en-US'
    });

export default i18n;
