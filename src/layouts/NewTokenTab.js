import React, { useEffect, useContext } from "react";
import {
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Input,
  Box,
} from "@chakra-ui/core";
import { ethers } from "ethers";
import { newToken_address, newToken_abi } from "../contracts/NewToken.js";
import { Web3Context } from "../context/Web3Context";

function NewTokenTab() {
  const { web3State, web3Dispatch, dappState, dappDispatch } = useContext(
    Web3Context
  );

  const handleOnClickBalanceOf = async (address) => {
    const res = await web3State.newToken.balanceOf(address);
    const dec = await web3State.newToken.decimals();
    dappDispatch({
      type: "SET_resultBalance",
      resultBalance: res.toString(),
    });
  };

  const handleOnClickApprove = async () => {
    await web3State.simpleStorage.set(dappState.inputStorage);
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
        type: "SET_CONTRACT_newToken",
        newToken: new ethers.Contract(
          newToken_address,
          newToken_abi,
          web3State.signer
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3State.signer, web3State.network, web3State.isEnabled]);

  if (!web3State.isWeb3) {
    return <Text>INSTALL METAMASK</Text>;
  }

  return (
    <VStack>
      <Heading mb={5}>ERC20 Interface</Heading>
      <Text mb={10}>Use the interface of a deployed ERC20 contract</Text>

      <HStack>
        <Button
          colorScheme="blue"
          onClick={() => handleOnClickBalanceOf(dappState.inputAddress1)}
        >
          balanceOf
        </Button>
        <Input
          value={dappState.inputAddress1}
          placeholder="address"
          onChange={(e) => {
            dappDispatch({
              type: "SET_inputAddress1",
              inputAddress1: e.currentTarget.value,
            });
          }}
        />
      </HStack>
      {dappState.resultBalance && (
        <Box w="30%" bg="tomato" p={4} color="white">
          Result : {dappState.resultBalance}
        </Box>
      )}
    </VStack>
  );
}

export default NewTokenTab;
