import { Globe } from "lucide-react";
import { useReducer } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { lang: "en", label: "English" },
  { lang: "bn", label: "বাংলা" },
  { lang: "fi", label: "Finish" },
];

export default function LanguageSwitcher() {
  const initialState = { isDropdownOpen: false, index: null };
  const reducer = (state, action) => {
    switch (action.type) {
      case "dropdown": {
        return {
          ...state,
          isDropdownOpen: !state.isDropdownOpen,
        };
      }
      case "setIndex": {
        return {
          ...state,
          index: action.payload,
        };
      }

      default:
        return state;
    }
  };

  const [dropdownOpen, dispatch] = useReducer(reducer, initialState);

  const { i18n } = useTranslation();

  const chageLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <div onClick={() => dispatch({ type: "dropdown" })}>
        <Globe size={20} stroke="#0000008c" />
      </div>

      {dropdownOpen.isDropdownOpen && (
        <div className="absolute top-full bg-white shadow-md rounded-lg  min-w-[150px] py-4 mt-4">
          <ul className="flex flex-col justify-start items-start space-y-2">
            {languages.map((language, index) => (
              <li
                className={`text-sm px-4 py-1 text-gray-800 hover:bg-primary/80 hover:text-white w-full text-left ${dropdownOpen.index === index && "bg-primary text-white"}`}
                key={index}
                onClick={() => {
                  chageLanguage(language.lang);
                  dispatch({ type: "setIndex", payload: index });
                }}
              >
                {language.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
