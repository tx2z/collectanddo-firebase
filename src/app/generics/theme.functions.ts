import { Theme } from 'src/app/models/user.model';

// Add or remove the dark theme class in body
export const toggleDarkTheme = (shouldAdd: boolean) => {
  document.body.classList.toggle('dark', shouldAdd);
};

export const setTheme = (chosenTheme: Theme): void => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Check preferred mode
  switch (chosenTheme) {
    case('dark'): {
      toggleDarkTheme(true);
      break;
    }
    case('light'): {
      toggleDarkTheme(false);
      break;
    }
    case('system'): {
      toggleDarkTheme(prefersDark.matches);
      // Listen for changes to the prefers-color-scheme media query
      prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
    }
  }
};
