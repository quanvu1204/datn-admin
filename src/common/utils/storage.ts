export const storageKey = {
    TOKEN: `token`,
};

export const storage = {
    setToken: (token: string, key: string) => localStorage.setItem(key, token),

    getToken: (key: string) => localStorage.getItem(key),

    removeToken: (key: string) => localStorage.removeItem(key),
};
