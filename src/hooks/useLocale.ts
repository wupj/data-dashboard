import { useI18n } from 'vue-i18n';

export function useLocale() {
  const { locale, availableLocales } = useI18n();

  const switchLanguage = (lang: string) => {
    locale.value = lang;
    localStorage.setItem('locale', lang);
  };

  const getCurrentLanguage = () => {
    return locale.value;
  };

  const savedLanguage = () => {
    return localStorage.getItem('locale') || 'zh-CN';
  };

  const initLanguage = () => {
    const savedLang = savedLanguage();
    if (availableLocales.includes(savedLang)) {
      locale.value = savedLang;
    }
  };

  return {
    switchLanguage,
    getCurrentLanguage,
    savedLanguage,
    initLanguage,
    availableLocales,
    currentLocale: locale,
  };
}
