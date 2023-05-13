export const userSession = {
  setItem: (value: string, remember_me: boolean) => {
    return Promise.resolve().then(function () {
      remember_me
        ? localStorage.setItem("auth", value)
        : sessionStorage.setItem("auth", value);
    });
  },
  getItem: () => {
    return Promise.resolve().then(function () {
      return sessionStorage.getItem("auth") || localStorage.getItem("auth");
    });
  },
  removeItem: () => {
    return Promise.resolve().then(function () {
      sessionStorage.getItem("auth")
        ? sessionStorage.removeItem("auth")
        : localStorage.removeItem("auth");
    });
  },
};

export interface userAuth {
  id: number;
  email: string;
  password: string;
  type: number;
  name: string;
  profilePhoto: string;
}
