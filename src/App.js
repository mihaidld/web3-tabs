import React from "react";
//import { Heading, Text, HStack, VStack, Button, Input } from "@chakra-ui/core";
// https://docs.ethers.io/v5/
import CalculatorTab from "./layouts/CalculatorTab";
import SimpleStorageTab from "./layouts/SimpleStorageTab";
import NewTokenTab from "./layouts/NewTokenTab"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

function App() {
  return (
    <>
      <Tabs colorScheme="purple" size="lg" isFitted={true}>
        <TabList>
          <Tab>Calculator</Tab>
          <Tab>Simple Storage</Tab>
          <Tab>ERC20</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CalculatorTab />
          </TabPanel>
          <TabPanel>
            <SimpleStorageTab />
          </TabPanel>
          <TabPanel>
            <NewTokenTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;
