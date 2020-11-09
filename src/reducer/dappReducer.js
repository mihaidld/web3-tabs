export const dappReducer = (state, action) => {
  switch (action.type) {
    case "SET_inputCalc1":
      return { ...state, inputCalc1: action.inputCalc1 };
    case "SET_inputCalc2":
      return { ...state, inputCalc2: action.inputCalc2 };
    case "SET_resultCalc":
      return { ...state, resultCalc: action.resultCalc };
    case "SET_getValueStorage":
      return { ...state, getValueStorage: action.getValueStorage };
    case "SET_inputStorage":
      return { ...state, inputStorage: action.inputStorage };
    case "SET_inputAddress1":
      return { ...state, inputAddress1: action.inputAddress1 };
    case "SET_inputAddress2":
      return { ...state, inputAddress2: action.inputAddress2 };
    case "SET_resultBalance":
      return { ...state, resultBalance: action.resultBalance };
    default:
      throw new Error(`Unhandled action ${action.type} in dappReducer`);
  }
};

export const initialDappState = {
  inputCalc1: 0,
  inputCalc2: 0,
  resultCalc: 0,
  getValueStorage: 0,
  inputStorage: 0,
  inputAddress1: "",
  inputAddress2: "",
  resultBalance: 0,
};
