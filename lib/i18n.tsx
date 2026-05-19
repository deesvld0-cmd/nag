'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mn' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.programs': 'Programs',
    'nav.exercises': 'Exercises',
    'nav.calculator': 'Calculator',
    'nav.trainers': 'Trainers',
    'nav.shop': 'Shop',
    'nav.blog': 'Blog',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.getStarted': 'Get Started',
    'nav.joinNow': 'Join Now',
    
    // Hero
    'hero.tag': 'World-Class Fitness Platform',
    'hero.line1': 'BUILD YOUR',
    'hero.line2': 'ULTIMATE',
    'hero.title': 'Build Your Ultimate',
    'hero.subtitle': 'Elite training programs, expert coaches, and science-backed nutrition.',
    'hero.cta': 'Start Your Journey',
    'hero.watchVideo': 'Watch Video',
    'hero.stats.members': 'Active Members',
    'hero.stats.trainers': 'Expert Trainers',
    'hero.stats.rating': 'App Rating',
    'hero.scrollDown': 'Scroll Down',
    
    // Sign In
    'signIn.title': 'Sign In',
    'signIn.subtitle': 'Sign in with your Google account',
    'signIn.button': 'Sign in with Google',
    'signIn.oauthHint.title': 'Google OAuth (redirect_uri_mismatch fix)',
    'signIn.oauthHint.redirectUri': 'Server redirect URI (copy this to Google Console):',
    'signIn.oauthHint.browser': 'Your browser:',
    'signIn.oauthHint.mismatch': 'Note: The NEXTAUTH_URL in .env must match the origin above (port, localhost vs 127.0.0.1). Fix it and restart the dev server.',
    'signIn.oauthHint.googleConsole': 'Google Cloud → Credentials → OAuth client → Authorized redirect URIs - add the above.',
    'signIn.error.oauthCallback': 'Google OAuth callback error. Check NEXTAUTH_URL and redirect URI in Google Console.',
    'signIn.error.configuration': 'Configuration error: Check GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET or NEXTAUTH_SECRET.',
    'signIn.error.accessDenied': 'Access denied.',
    'signIn.error.default': 'Sign in error:',
    
    // Footer
    'footer.cta.title': 'READY TO TRANSFORM YOUR BODY?',
    'footer.cta.subtitle': 'Join 50,000+ athletes already training smarter with NANZAD.',
    'footer.cta.startTrial': 'Start Free Trial',
    'footer.cta.browsePrograms': 'Browse Programs',
    'footer.description': 'The world\'s most advanced fitness platform. Elite programs, expert coaches, and a community built for champions.',
    'footer.email': 'support@nanzad.com',
    'footer.phone': '+1 (555) 100-NANZAD',
    'footer.location': 'Los Angeles, CA',
    'footer.programs': 'Programs',
    'footer.platform': 'Platform',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.programs.bulking': 'Bulking',
    'footer.programs.fatLoss': 'Fat Loss',
    'footer.programs.strength': 'Strength',
    'footer.programs.aesthetics': 'Aesthetics',
    'footer.programs.homeWorkouts': 'Home Workouts',
    'footer.programs.hiit': 'HIIT',
    'footer.platform.exerciseLibrary': 'Exercise Library',
    'footer.platform.bmiCalculator': 'BMI Calculator',
    'footer.platform.mealPlanner': 'Meal Planner',
    'footer.platform.progressTracker': 'Progress Tracker',
    'footer.platform.community': 'Community',
    'footer.company.aboutUs': 'About Us',
    'footer.company.careers': 'Careers',
    'footer.company.pressKit': 'Press Kit',
    'footer.company.partnerships': 'Partnerships',
    'footer.company.affiliateProgram': 'Affiliate Program',
    'footer.support.helpCenter': 'Help Center',
    'footer.support.contactUs': 'Contact Us',
    'footer.support.privacyPolicy': 'Privacy Policy',
    'footer.support.termsOfService': 'Terms of Service',
    'footer.support.refundPolicy': 'Refund Policy',
    'footer.newsletter.title': 'Subscribe to our newsletter',
    'footer.newsletter.subtitle': 'Weekly training tips, nutrition science, and exclusive offers.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.copyright': '© 2024 NANZAD Fitness. All rights reserved.',
    'footer.poweredBy': 'Powered by',
    
    // General
    'language.english': 'English',
    'language.mongolian': 'Монгол',
    'language.russian': 'Русский',
  },
  mn: {
    // Navbar
    'nav.programs': 'Программ',
    'nav.exercises': 'Дасгал',
    'nav.calculator': 'Тооцоолуур',
    'nav.trainers': 'Дасгалжуулагчид',
    'nav.shop': 'Дэлгүүр',
    'nav.blog': 'Блог',
    'nav.signIn': 'Нэвтрэх',
    'nav.signOut': 'Гарах',
    'nav.dashboard': 'Хянах самбар',
    'nav.admin': 'Админ',
    'nav.getStarted': 'Эхлэх',
    'nav.joinNow': 'Нэгдэх',
    
    // Hero
    'hero.tag': 'Дэлхийн түвшний фитнес платформ',
    'hero.line1': 'ӨӨРТӨӨ',
    'hero.line2': 'ДЭЭД',
    'hero.title': 'Өөрийн Дээд',
    'hero.subtitle': 'Дээд түвшний хөтөлбөр, мэргэжлийн дасгалжуулагч, шинжлэх ухааны үндэслэлт хооллолт.',
    'hero.cta': 'Аялалдаа эхлээрэй',
    'hero.watchVideo': 'Видео үзэх',
    'hero.stats.members': 'Идэвхтэй гишүүд',
    'hero.stats.trainers': 'Мэргэжлийн дасгалжуулагчид',
    'hero.stats.rating': 'Апп үнэлгээ',
    'hero.scrollDown': 'Доош гүйлгэх',
    
    // Sign In
    'signIn.title': 'Нэвтрэх',
    'signIn.subtitle': 'Google бүртгэлээр нэвтэрнэ үү',
    'signIn.button': 'Google-ээр нэвтрэх',
    'signIn.oauthHint.title': 'Google OAuth (redirect_uri_mismatch засах)',
    'signIn.oauthHint.redirectUri': 'Сервер redirect URI (Google Console-д хуулна уу):',
    'signIn.oauthHint.browser': 'Таны браузер:',
    'signIn.oauthHint.mismatch': 'Анхаар: .env дахь NEXTAUTH_URL нь дээрх браузерын хаягтай яг ижил үндэс (порт, localhost vs 127.0.0.1) байх ёстой. Засаад dev server дахин асаана уу.',
    'signIn.oauthHint.googleConsole': 'Google Cloud → Credentials → OAuth client → Authorized redirect URIs - дээрхийг нэмнэ.',
    'signIn.error.oauthCallback': 'Google OAuth буцаах үед алдаа гарлаа. NEXTAUTH_URL болон Google Console дахь redirect URI-г шалгана уу.',
    'signIn.error.configuration': 'Тохиргооны алдаа: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET эсвэл NEXTAUTH_SECRET шалгана уу.',
    'signIn.error.accessDenied': 'Нэвтрэх эрх татгалзсан.',
    'signIn.error.default': 'Нэвтрэх алдаа:',
    
    // Footer
    'footer.cta.title': 'БИЕНИЙНХЭЭ БҮТЭЦИЙГ ӨӨРЧИЛЬЖ ЭХЛЭХ ҮҮ?',
    'footer.cta.subtitle': 'NANZAD-тай хамт 50,000+ тамирчин ухаалгаар дасгал хийж байна.',
    'footer.cta.startTrial': 'Үнэгүй туршилт эхлэх',
    'footer.cta.browsePrograms': 'Хөтөлбөрүүд үзэх',
    'footer.description': 'Дэлхийн хамгийн дэвшилтэт фитнес платформ. Дээд түвшний хөтөлбөр, мэргэжлийн дасгалжуулагч, тэргүүнүүдийн бүлгэм.',
    'footer.email': 'support@nanzad.com',
    'footer.phone': '+1 (555) 100-NANZAD',
    'footer.location': 'Лос Анжелес, Калифорни',
    'footer.programs': 'Хөтөлбөрүүд',
    'footer.platform': 'Платформ',
    'footer.company': 'Компани',
    'footer.support': 'Тусламж',
    'footer.programs.bulking': 'Жингүүлэх',
    'footer.programs.fatLoss': 'Ялгадас хасах',
    'footer.programs.strength': 'Хүч',
    'footer.programs.aesthetics': 'Гоо зүй',
    'footer.programs.homeWorkouts': 'Гэрийн дасгал',
    'footer.programs.hiit': 'HIIT',
    'footer.platform.exerciseLibrary': 'Дасгалын санг',
    'footer.platform.bmiCalculator': 'BMI тооцоолуур',
    'footer.platform.mealPlanner': 'Хоолны төлөвлөгөө',
    'footer.platform.progressTracker': 'Ахиц хөтлөгч',
    'footer.platform.community': 'Бүлгэм',
    'footer.company.aboutUs': 'Бидний тухай',
    'footer.company.careers': 'Ажлын байр',
    'footer.company.pressKit': 'Мэдээллийн багц',
    'footer.company.partnerships': 'Түншлэл',
    'footer.company.affiliateProgram': 'Хариуцлагатай хөтөлбөр',
    'footer.support.helpCenter': 'Тусламжийн төв',
    'footer.support.contactUs': 'Холбоо барих',
    'footer.support.privacyPolicy': 'Нууцлалын бодлого',
    'footer.support.termsOfService': 'Үйлчилгээний нөхцөл',
    'footer.support.refundPolicy': 'Буцаалтын бодлого',
    'footer.newsletter.title': 'Мэдээллийн сувагт бүртгүүлэх',
    'footer.newsletter.subtitle': 'Долоо хоног бүрийн дасгалын зөвлөмж, хоолны шинжлэх ухаан, тусгай саналууд.',
    'footer.newsletter.placeholder': 'И-мэйл хаягаа оруулна уу',
    'footer.newsletter.subscribe': 'Бүртгүүлэх',
    'footer.copyright': '© 2024 NANZAD Fitness. Бүх эрх хуулиар хамгаалагдсан.',
    'footer.poweredBy': 'Ажиллуулсан',
    
    // General
    'language.english': 'English',
    'language.mongolian': 'Монгол',
    'language.russian': 'Русский',
  },
  ru: {
    // Navbar
    'nav.programs': 'Программы',
    'nav.exercises': 'Упражнения',
    'nav.calculator': 'Калькулятор',
    'nav.trainers': 'Тренеры',
    'nav.shop': 'Магазин',
    'nav.blog': 'Блог',
    'nav.signIn': 'Войти',
    'nav.signOut': 'Выйти',
    'nav.dashboard': 'Панель',
    'nav.admin': 'Админ',
    'nav.getStarted': 'Начать',
    'nav.joinNow': 'Присоединиться',
    
    // Hero
    'hero.tag': 'Платформа мирового класса',
    'hero.line1': 'ПОСТРОЙ',
    'hero.line2': 'ИДЕАЛЬНОЕ',
    'hero.title': 'Построй Идеальное',
    'hero.subtitle': 'Элитные программы, профессиональные тренеры и научно обоснованное питание.',
    'hero.cta': 'Начните свой путь',
    'hero.watchVideo': 'Смотреть видео',
    'hero.stats.members': 'Активные участники',
    'hero.stats.trainers': 'Профессиональные тренеры',
    'hero.stats.rating': 'Рейтинг приложения',
    'hero.scrollDown': 'Прокрутить вниз',
    
    // Sign In
    'signIn.title': 'Войти',
    'signIn.subtitle': 'Войдите с помощью Google',
    'signIn.button': 'Войти через Google',
    'signIn.oauthHint.title': 'Google OAuth (исправление redirect_uri_mismatch)',
    'signIn.oauthHint.redirectUri': 'Redirect URI сервера (скопируйте это в Google Console):',
    'signIn.oauthHint.browser': 'Ваш браузер:',
    'signIn.oauthHint.mismatch': 'Примечание: NEXTAUTH_URL в .env должен соответствовать указанному выше источнику (порт, localhost vs 127.0.0.1). Исправьте это и перезапустите dev server.',
    'signIn.oauthHint.googleConsole': 'Google Cloud → Credentials → OAuth client → Authorized redirect URIs - добавьте указанное выше.',
    'signIn.error.oauthCallback': 'Ошибка обратного вызова Google OAuth. Проверьте NEXTAUTH_URL и redirect URI в Google Console.',
    'signIn.error.configuration': 'Ошибка конфигурации: Проверьте GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET или NEXTAUTH_SECRET.',
    'signIn.error.accessDenied': 'Доступ запрещен.',
    'signIn.error.default': 'Ошибка входа:',
    
    // Footer
    'footer.cta.title': 'ГОТОВЫ ПРЕОБРАЗИТЬ СВОЕ ТЕЛО?',
    'footer.cta.subtitle': 'Присоединяйтесь к 50,000+ атлетам, которые уже тренируются умнее с NANZAD.',
    'footer.cta.startTrial': 'Начать бесплатно',
    'footer.cta.browsePrograms': 'Смотреть программы',
    'footer.description': 'Самая продвинутая фитнес-платформа в мире. Элитные программы, профессиональные тренеры и сообщество для чемпионов.',
    'footer.email': 'support@nanzad.com',
    'footer.phone': '+1 (555) 100-NANZAD',
    'footer.location': 'Лос-Анджелес, Калифорния',
    'footer.programs': 'Программы',
    'footer.platform': 'Платформа',
    'footer.company': 'Компания',
    'footer.support': 'Поддержка',
    'footer.programs.bulking': 'Набор массы',
    'footer.programs.fatLoss': 'Похудение',
    'footer.programs.strength': 'Сила',
    'footer.programs.aesthetics': 'Эстетика',
    'footer.programs.homeWorkouts': 'Домашние тренировки',
    'footer.programs.hiit': 'HIIT',
    'footer.platform.exerciseLibrary': 'Библиотека упражнений',
    'footer.platform.bmiCalculator': 'Калькулятор ИМТ',
    'footer.platform.mealPlanner': 'Планировщик питания',
    'footer.platform.progressTracker': 'Трекер прогресса',
    'footer.platform.community': 'Сообщество',
    'footer.company.aboutUs': 'О нас',
    'footer.company.careers': 'Карьера',
    'footer.company.pressKit': 'Пресс-кит',
    'footer.company.partnerships': 'Партнерство',
    'footer.company.affiliateProgram': 'Партнерская программа',
    'footer.support.helpCenter': 'Центр помощи',
    'footer.support.contactUs': 'Связаться с нами',
    'footer.support.privacyPolicy': 'Политика конфиденциальности',
    'footer.support.termsOfService': 'Условия использования',
    'footer.support.refundPolicy': 'Политика возврата',
    'footer.newsletter.title': 'Подпишитесь на нашу рассылку',
    'footer.newsletter.subtitle': 'Еженедельные советы по тренировкам, наука о питании и эксклюзивные предложения.',
    'footer.newsletter.placeholder': 'Введите ваш email',
    'footer.newsletter.subscribe': 'Подписаться',
    'footer.copyright': '© 2024 NANZAD Fitness. Все права защищены.',
    'footer.poweredBy': 'Работает на',
    
    // General
    'language.english': 'English',
    'language.mongolian': 'Монгол',
    'language.russian': 'Русский',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'mn', 'ru'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
