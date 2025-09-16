import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const location = useLocation();

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Handle route-based language detection
    useEffect(() => {
        if (location.pathname === '/jp') {
            setLanguage('jp');
            localStorage.setItem('selectedLanguage', 'jp');
        } else if (location.pathname !== '/jp' && !localStorage.getItem('selectedLanguage')) {
            // Only set to English if no language preference is saved
            setLanguage('en');
        }
    }, [location.pathname]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('selectedLanguage', newLanguage);
    };

    const value = {
        language,
        changeLanguage,
        isJapanese: language === 'jp',
        isEnglish: language === 'en'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
