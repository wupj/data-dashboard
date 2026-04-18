import { createI18n } from 'vue-i18n';
import zhCN from '@/locales/zh-CN.json';
import enUS from '@/locales/en-US.json';

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 从localStorage获取保存的语言设置
const locale = localStorage.getItem('locale') || 'zh-CN';

const i18n = createI18n({
  locale, // 使用保存的语言或默认中文
  fallbackLocale: 'en-US', // 回退语言
  messages,
  globalInjection: true,
});

export default i18n;
