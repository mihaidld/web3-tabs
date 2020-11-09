import React, { useEffect, useContext } from "react";
import {
  Heading,
  Text,
  Box,
  HStack,
  VStack,
  Button,
  Input,
} from "@chakra-ui/core";
import { ethers } from "ethers";
import { calculator_address, calculator_abi } from "../contracts/Calculator.js";
import { Web3Context } from "../context/Web3Context";

function CalculatorTab() {
  const { web3State, web3Dispatch, dappState, dappDispatch } = useContext(
    Web3Context
  );

  const handleOnClickAdd = async (nb1, nb2) => {
    const res = await web3State.calculator.add(nb1, nb2);
    dappDispatch({ type: "SET_resultCalc", resultCalc: res.toString() });
  };

  const handleOnClickSub = async (nb1, nb2) => {
    try {
      const res = await web3State.calculator.sub(nb1, nb2);
      dappDispatch({ type: "SET_resultCalc", resultCalc: res.toString() });
    } catch (e) {
      alert(`${e.reason} : Second number must be smaller than the first one`);
    }
  };

  const handleOnClickMul = async (nb1, nb2) => {
    const res = await web3State.calculator.mul(nb1, nb2);
    dappDispatch({ type: "SET_resultCalc", resultCalc: res.toString() });
  };

  const handleOnClickDiv = async (nb1, nb2) => {
    try {
      const res = await web3State.calculator.div(nb1, nb2);
      dappDispatch({ type: "SET_resultCalc", resultCalc: res.toString() });
    } catch (e) {
      alert(e.reason);
    }
  };

  useEffect(() => {
    //If we are on the rinkeby network and signer is set, connect to contract SimpleStorage
    if (
      web3State.isEnabled &&
      web3State.network &&
      web3State.network.chainId === 4 &&
      web3State.signer
    ) {
      web3Dispatch({
        type: "SET_CONTRACT_calculator",
        calculator: new ethers.Contract(
          calculator_address,
          calculator_abi,
          web3State.signer
        ),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3State.signer, web3State.network, web3State.isEnabled]);

  return (
    <>
      <VStack>
        <Heading mb={5}>Calculator</Heading>
        <Text mb={10}>Enter 2 numbers and use the 4 operations available</Text>
        <HStack>
          <Input
            value={dappState.inputCalc1}
            onChange={(e) => {
              dappDispatch({
                type: "SET_inputCalc1",
                inputCalc1: e.currentTarget.value,
              });
            }}
          />
          <Input
            value={dappState.inputCalc2}
            onChange={(e) => {
              dappDispatch({
                type: "SET_inputCalc2",
                inputCalc2: e.currentTarget.value,
              });
            }}
          />
        </HStack>
        <Button
          onClick={async () =>
            handleOnClickAdd(dappState.inputCalc1, dappState.inputCalc2)
          }
        >
          Add
        </Button>
        <Button
          onClick={async () =>
            handleOnClickSub(dappState.inputCalc1, dappState.inputCalc2)
          }
        >
          Sub
        </Button>
        <Button
          onClick={async () =>
            handleOnClickMul(dappState.inputCalc1, dappState.inputCalc2)
          }
        >
          Mul
        </Button>
        <Button
          mb={10}
          onClick={async () =>
            handleOnClickDiv(dappState.inputCalc1, dappState.inputCalc2)
          }
        >
          Div
        </Button>
        <Box bg="tomato" p={4} color="white">
          Result : {dappState.resultCalc}
        </Box>
      </VStack>
    </>
  );
}

export default CalculatorTab;
