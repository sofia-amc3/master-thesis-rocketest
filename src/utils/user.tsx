// This code is used in Sign In, Sign Up and Sign Out to store the user's authentication data, as well as deleting it
export const userSession = {
  setItem: (value: string, remember_me: boolean) => {
    // Note: "Promise.resolve()" is used in this code to introduce an asynchronous context and ensure that the session operations (setItem, getItem, removeItem)
    // are executed asynchronously, allowing other code to continue running while waiting for the promises to resolve.
    return Promise.resolve().then(function () {
      remember_me
        ? localStorage.setItem("auth", value) // if 'remember me' is checked, save the authentication values in local storage (persistent storage, all tabs)
        : sessionStorage.setItem("auth", value); // if not, save them in session storage (when opening a new tab, values are not saved anymore)
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
