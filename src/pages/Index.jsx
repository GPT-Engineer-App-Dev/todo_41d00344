import { Box, VStack, Heading, Input, IconButton, useToast, StackDivider, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack p={4} bg={bgColor} minH="100vh" spacing={4} align="stretch">
      <Heading mb="8" textAlign="center">
        Todo App
      </Heading>

      <HStack>
        <Input value={input} onChange={handleInputChange} placeholder="Add your new todo" />
        <IconButton icon={<FaPlus />} onClick={handleAddTodo} aria-label="Add todo" />
      </HStack>

      <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} borderRadius="md" w="100%" maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }} alignItems="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text p={4} flexGrow={1}>
              {todo.text}
            </Text>
            <IconButton icon={<FaTrashAlt />} onClick={() => handleDeleteTodo(todo.id)} aria-label="Delete todo" />
          </HStack>
        ))}
        {todos.length === 0 && (
          <Box textAlign="center" p={4}>
            No todos yet. Start adding some!
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default Index;
