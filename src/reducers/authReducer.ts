const initialState = {
  user: null,
};

export default (state = initialState, { type, payload }) => {
  console.log('AuthReducer');
  switch (type) {
    default:
      return state;
  }
};
