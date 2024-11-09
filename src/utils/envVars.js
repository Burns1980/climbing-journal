// This is so we can mock the import.meta module since Jest cannot work with it.
export const apiUrl = import.meta.env.VITE_API_URL;
