import {
  Input,
  Flex,
  Text,
  Button,
  Box,
  useToast,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleButtonClick = async () => {
    if (!userName || !userEmail || !userPassword) {
      toast({
        title: 'All fields are required',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://todolist-1-b67m.onrender.com/api/user', {
        userName,
        userEmail,
        userPassword,
      });

      if (res.status === 201 || res.statusText === 'Created') {
        toast({
          title: 'Signup successful',
          description: 'You can now log in',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/');
      }
    } catch (error) {
      if (error?.response?.data?.message === 'user with Email id already exist') {
        toast({
          title: 'Signup failed',
          description: 'User with this email already exists',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Signup failed',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.50">
      <Box
        width={['90%', '60%', '30%']}
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid blue"
        bg="white"
      >
        <Flex flexDirection="column" gap="16px">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.500">
            Sign Up
          </Text>

          <FormControl isInvalid={!userName && userName !== ''}>
            <Input
              placeholder="Enter Name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>

          <FormControl isInvalid={!userEmail && userEmail !== ''}>
            <Input
              placeholder="Enter Email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isInvalid={!userPassword && userPassword !== ''}>
            <InputGroup>
              <Input
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            onClick={handleButtonClick}
            colorScheme="blue"
            isLoading={loading}
            loadingText="Signing Up"
          >
            Sign Up
          </Button>

          <Text textAlign="center" fontSize="sm">
            Already have an account?{' '}
            <Text
              as="span"
              color="blue.500"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate('/')}
            >
              Login
            </Text>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignUp;
