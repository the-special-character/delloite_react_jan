const initialState = [];

export default (state = initialState, { type, payload, meta }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'REQUEST') {
    return [
      ...state,
      {
        id: meta.loadingId || -1,
        actionName,
        actionType,
      },
    ];
  }
  return state.filter(
    (x) => !(x.id === meta.loadingId && x.actionName === actionName),
  );
};
