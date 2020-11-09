import React, { useEffect, useContext } from "react";
import { Heading, Text, HStack, VStack, Button, Input } from "@chakra-ui/core";
import { ethers } from "ethers";
import {
  simpleStorage_address,
  simpleStorage_abi,
} from "../contracts/SimpleStorage.js";
import { Web3Context } from "../context/Web3Context";

function SimpleStorageTab() {
  const { web3State, web3Dispatch, dappState, dappDispatch } = useContext(
    Web3Context
  );

  const handleOnClickGet = async () => {
    const res = await web3State.simpleStorage.get();
    dappDispatch({
      type: "SET_getValueStorage",
      getValueStorage: res.toString(),
    });
  };

  const handleOnClickSet = async () => {
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
        type: "SET_CONTRACT_simpleStorage",
        simpleStorage: new ethers.Contract(
          simpleStorage_address,
          simpleStorage_abi,
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
      <Heading mb={5}>Simple Storage on Ethereum</Heading>
      <Text mb={10}>Get the storage value and set a new value in storage</Text>
      <HStack>
        <Button onClick={handleOnClickGet}>GET</Button>
        <Text>{dappState.getValueStorage}</Text>
      </HStack>
      <HStack>
        <Button onClick={handleOnClickSet}>SET</Button>
        <Input
          value={dappState.inputStorage}
          onChange={(e) => {
            dappDispatch({
              type: "SET_inputStorage",
              inputStorage: e.currentTarget.value,
            });
          }}
        />
      </HStack>
    </VStack>
  );
}

export default SimpleStorageTab;
