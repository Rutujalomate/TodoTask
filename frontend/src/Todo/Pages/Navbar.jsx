import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({isAuthenticated,setIsAuthenticated}) => {
  const navigate = useNavigate();
  

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsAuthenticated(false); // Update authentication state
    navigate('/'); // Redirect to the login page
  };

  return (
    <Box bg="teal.500" px={6} py={4} boxShadow="md" color="white">
      <Flex justify="space-between" align="center" maxW="80%" mx="auto">
        <Text fontSize="xl" fontWeight="bold">
          Task Manager
        </Text>

        <Flex gap={4}>
          {!isAuthenticated ? (
            <>
              <Button
                size="sm"
                colorScheme="whiteAlpha"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Login
              </Button>
              <Button
                size="sm"
                colorScheme="whiteAlpha"
                variant="outline"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              colorScheme="whiteAlpha"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
