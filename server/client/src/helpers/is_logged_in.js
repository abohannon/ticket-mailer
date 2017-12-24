
export const isLoggedIn = (payload) => {
  if (payload === null) {
    return false;
  }
  return true;
};

// TODO: NEED TO FIX. NO LONGER USING WINDOW SESSION, USING LOCAL STORAGE

// export const expireUser = (user) => {
//   const today = new Date()
//
//   if ()
// }

export { isLoggedIn as default };
