import React, { createContext } from 'react';

type LocaleContextType = {
  locale: 'en' | 'fr' | 'de';
  changeLocale?: () => void;
};

export const LocaleContext = createContext({
  locale: 'en',
});

export const LocaleProvider = ({ children }) => {
  return (
    <LocaleContext.Provider
      value={{
        locale: 'de',
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
