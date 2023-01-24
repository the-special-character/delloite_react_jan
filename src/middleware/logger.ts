export default (store) => (next) => (action) => {
  const match = /(.*)_(FAIL)/.exec(action.type);

  if (match) {
    // server call and send data to server
    console.log('Error From Middleware', action.payload);
  }

  next(action);
};
