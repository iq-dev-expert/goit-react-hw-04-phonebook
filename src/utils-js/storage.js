const save = (key, value) => {
  const serializedState = JSON.stringify(value);
  localStorage.setItem(key, serializedState);
};

const load = (key, initialState = []) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : initialState;
  } catch (error) {
    console.error('Get state error: ', error.message);
    return initialState;
  }
};

export { save, load };
