export const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return undefined;
    }
    console.log('loadUser', JSON.parse(serializedUser));
    return JSON.parse(serializedUser);
  } catch (err) {
    return undefined;
  }
};

export const saveUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (err) {
    // Ignore write errors.
  }
};
