import { ethers } from "ethers";

export const web3Reducer = (state, action) => {
  switch (action.type) {
    case "SET_isWeb3":
      return { ...state, isWeb3: action.isWeb3 };
    case "SET_isEnabled":
      return { ...state, isEnabled: action.isEnabled };
    case "SET_account":
      return { ...state, account: action.account };
    case "SET_provider":
      return { ...state, provider: action.provider };
    case "SET_network":
      return { ...state, network: action.network };
    case "SET_signer":
      return { ...state, signer: action.signer };
    case "SET_balance":
      return { ...state, balance: action.balance };
    case "SET_CONTRACT_calculator":
      return { ...state, calculator: action.calculator };
    case "SET_CONTRACT_simpleStorage":
      return { ...state, simpleStorage: action.simpleStorage };
    case "SET_CONTRACT_newToken":
      return { ...state, newToken: action.newToken };
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`);
  }
};

export const initialWeb3State = {
  isWeb3: false,
  isEnabled: false,
  account: ethers.constants.AddressZero,
  provider: null,
  signer: null,
  network: null,
  balance: "0",
  calculator: null,
  simpleStorage: null,
  newToken: null,
};
