import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Todo from './Todo/Todo';
import RouterCom from './Todo/Pages/Router';

// even empty theme fixes the error

const App = () => {
  return (
      <RouterCom />
  );
};

export default App;
