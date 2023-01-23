const initialState = [];

export default (state = initialState, { type, payload }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'FAIL') {
    return [
      ...state,
      {
        id: meta.loadingId || -1,
        actionName,
        actionType,
        error: payload,
      },
    ];
  }
  return state.filter(
    (x) => !(x.id === meta.loadingId && x.actionName === actionName),
  );
};
