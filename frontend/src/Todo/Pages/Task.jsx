import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Flex,
  Stack,
  Text,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

const Task = () => {
  const token = localStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      toast({
        title: 'Error Fetching Tasks',
        description: error.response?.data?.message || 'An error occurred while fetching tasks.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:8080/api/tasks',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Task Added',
        description: 'The task has been added successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      handleClose();
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error Adding Task',
        description: error.response?.data?.message || 'An error occurred while adding the task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${editingTask._id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Task Updated',
        description: 'The task has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      handleClose();
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error Updating Task',
        description: error.response?.data?.message || 'An error occurred while updating the task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Task Deleted',
        description: 'The task has been deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error Deleting Task',
        description: error.response?.data?.message || 'An error occurred while deleting the task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setEditingTask(null);
    setViewingTask(null);
    setIsViewing(false);
    onClose();
  };

  return (
    <Box p={5}>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        Add Task
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isViewing ? 'View Task' : editingTask ? 'Edit Task' : 'Add Task'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isViewing ? (
              <Stack spacing={3}>
                <Box>
                  <Text fontWeight="bold">Title:</Text>
                  <Text>{title}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Description:</Text>
                  <Text>{description}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Created At:</Text>
                  <Text>{new Date(viewingTask?.createdAt).toLocaleString()}</Text>
                </Box>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Box>
                  <Text>Title</Text>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </Box>
                <Box>
                  <Text>Description</Text>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                  />
                </Box>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            {!isViewing && (
              <Button
                colorScheme="teal"
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                isLoading={loading}
                loadingText={editingTask ? 'Updating' : 'Adding'}
              >
                Save
              </Button>
            )}
            <Button variant="ghost" onClick={handleClose} ml={3}>
              {isViewing ? 'Close' : 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {loading && (
        <Flex justify="center" align="center" my={4}>
          <Spinner size="xl" />
        </Flex>
      )}

      <Flex wrap="wrap" gap={4}>
        {tasks.map((task) => (
          <Box
            key={task._id}
            bg="white"
            p={5}
            boxShadow="md"
            borderRadius="xl"
            width="300px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Stack spacing={3}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                  {task.title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {task.description}
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.500">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </Text>
              <Flex justify="flex-end" gap={2}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    setIsViewing(true);
                    setViewingTask(task);
                    setTitle(task.title);
                    setDescription(task.description);
                    onOpen();
                  }}
                >
                  View
                </Button>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => {
                    setEditingTask(task);
                    setTitle(task.title);
                    setDescription(task.description);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Stack>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Task;
