import { en } from './en';
import { jp } from './jp';

export const translations = {
    en,
    jp
};

export const getTranslation = (language, key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if translation not found
            value = translations.en;
            for (const fallbackKey of keys) {
                if (value && typeof value === 'object' && fallbackKey in value) {
                    value = value[fallbackKey];
                } else {
                    return key; // Return the key if no translation found
                }
            }
            break;
        }
    }
    
    // If the value is an empty string and we're not using English, fall back to English
    if (value === "" && language !== 'en') {
        let englishValue = translations.en;
        for (const k of keys) {
            if (englishValue && typeof englishValue === 'object' && k in englishValue) {
                englishValue = englishValue[k];
            } else {
                return key; // Return the key if no English translation found
            }
        }
        return englishValue;
    }
    
    return value;
};
