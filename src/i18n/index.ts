import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import bnDashboardStat from "./Locales/bn/dashboardStat.json";
import bnNavbar from "./Locales/bn/navbar.json";
import bnProjectOverview from "./Locales/bn/projectsOverview.json";
import bnReminder from "./Locales/bn/reminder.json";
import bnTimesheet from "./Locales/bn/timesheet.json";
import enDashboardStat from "./Locales/en/dashboardStat.json";
import enNavbar from "./Locales/en/navbar.json";
import enProjectOverview from "./Locales/en/projectsOverview.json";
import enReminder from "./Locales/en/reminder.json";
import enTimesheet from "./Locales/en/timesheet.json";
import fiDashboardStat from "./Locales/fi/dashboardStat.json";
import fiNavbar from "./Locales/fi/navbar.json";
import fiProjectOverview from "./Locales/fi/projectsOverview.json";
import fiReminder from "./Locales/fi/reminder.json";
import fiTimesheet from "./Locales/fi/timesheet.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: [
      "navbar",
      "dashboardStat",
      "projectsOverview",
      "reminder",
      "timesheet",
    ],
    defaultNS: "navbar",
    resources: {
      en: {
        navbar: enNavbar,
        dashboardStat: enDashboardStat,
        projectsOverview: enProjectOverview,
        reminder: enReminder,
        timesheet: enTimesheet,
      },
      bn: {
        navbar: bnNavbar,
        dashboardStat: bnDashboardStat,
        projectsOverview: bnProjectOverview,
        reminder: bnReminder,
        timesheet: bnTimesheet,
      },
      fi: {
        navbar: fiNavbar,
        dashboardStat: fiDashboardStat,
        projectsOverview: fiProjectOverview,
        reminder: fiReminder,
        timesheet: fiTimesheet,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
