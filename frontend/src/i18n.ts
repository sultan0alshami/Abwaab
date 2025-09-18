import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    lng: 'ar', // Set Arabic as default language
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ar: {
        translation: {
          "dashboard_title": "لوحة التحكم أبواب",
          "previous_day": "اليوم السابق",
          "next_day": "اليوم التالي",
          "date": "التاريخ",
          "enter_daily_metrics": "إدخال المقاييس اليومية",
          "website_visits": "زيارات الموقع",
          "app_downloads": "تنزيلات التطبيق",
          "finished_operations": "العمليات المكتملة",
          "liquidity": "السيولة",
          "add_metric": "إضافة مقياس",
          "metrics_for": "مقاييس لـ",
          "no_data_for_this_date": "لا توجد بيانات لهذا التاريخ.",
          "created_at": "تاريخ الإنشاء",
          "website_visits_header": "زيارات الموقع",
          "app_downloads_header": "تنزيلات التطبيق",
          "finished_operations_header": "العمليات المكتملة",
          "liquidity_header": "السيولة",
          "actions": "الإجراءات",
          "edit": "تعديل",
          "delete": "حذف",
          "save": "حفظ",
          "cancel": "إلغاء",
          "confirm_delete": "هل أنت متأكد أنك تريد حذف هذا السجل؟"
        },
      },
    },
  });

export default i18n;
