
export const isLoggedIn = (userAuthReducerPayload) => {
  console.log('window session', window.sessionStorage.userId);
  console.log('reducer payload', userAuthReducerPayload);
  if (window.sessionStorage.userId === userAuthReducerPayload) {
    return true;
  }
  return false;
};

// TODO: NEED TO FIX. NO LONGER USING WINDOW SESSION, USING LOCAL STORAGE

// export const expireUser = (user) => {
//   const today = new Date()
//
//   if ()
// }

export { isLoggedIn as default };
