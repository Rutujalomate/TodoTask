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
  Spinner,
  Checkbox,
  useColorMode,
  useColorModeValue,
  Divider,
  Stack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { toggleColorMode, colorMode } = useColorMode();

  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setUserEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const isEmailError = userEmail.trim() === '';
  const isPasswordError = userPassword.trim() === '';

  const handleLogin = async () => {
    if (isEmailError || isPasswordError) {
      toast({
        title: 'Validation Error',
        description: 'Email and Password are required.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://todolist-1-b67m.onrender.com/api/user/login', {
        userEmail,
        userPassword,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', userEmail);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        toast({
          title: 'Login successful',
          description: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/task');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error?.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        w={['90%', '60%', '30%']}
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        bg={bg}
        border={`1px solid ${borderColor}`}
        position="relative"
      >
        <Text
          position="absolute"
          top={4}
          right={4}
          fontSize="sm"
          color="blue.500"
          cursor="pointer"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>

        <Flex direction="column" gap={4}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.500">
            Login
          </Text>

          <FormControl isInvalid={isEmailError}>
            <Input
              placeholder="Enter Email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={isPasswordError}>
            <InputGroup>
              <Input
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button size="sm" onClick={() => setShowPassword(!showPassword)} variant="ghost">
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
          </FormControl>

          <Checkbox
            isChecked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            colorScheme="blue"
          >
            Remember Me
          </Checkbox>

          <Button
            colorScheme="blue"
            onClick={handleLogin}
            isDisabled={loading}
            leftIcon={loading && <Spinner size="sm" />}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>


          <Text textAlign="center" fontSize="sm" mt={2}>
            Don’t have an account?{' '}
            <Text
              as="span"
              color="blue.500"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Text>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
