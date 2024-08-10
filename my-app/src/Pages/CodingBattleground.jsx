import React from 'react';
import { Box, Flex, Text, VStack, HStack, Badge, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import ProblemBox from '../Components/CodingArenaComponents/ProblemBox';

const dummyProblems = [
  { id: 1, Title: "Two Sum", Diff: "Easy", constraints: "<li>1 ≤ nums.length ≤ 10⁴</li><li>-10⁹ ≤ nums[i] ≤ 10⁹</li><li>-10⁹ ≤ target ≤ 10⁹</li>" },
  { id: 2, Title: "Three Sum", Diff: "Medium", constraints: "<li>0 ≤ nums.length ≤ 3000</li><li>-10⁵ ≤ nums[i] ≤ 10⁵</li>" },
  { id: 3, Title: "Four Sum", Diff: "Hard", constraints: "<li>1 ≤ nums.length ≤ 200</li><li>-10⁸ ≤ nums[i] ≤ 10⁸</li>" },
];

const dummyLeaderboard = [
  { rank: 1, username: "Alice", score: 100 },
  { rank: 2, username: "Bob", score: 90 },
  { rank: 3, username: "Charlie", score: 80 },
];

const CodingBattleground= () => {
  return (
    <Flex direction="column" alignItems="center" bg="gray.800" color="white" p={8}>
      <Text fontSize="2xl" mb={6}>Coding Contest</Text>

      {/* Problems Section */}
      <Box w="full" mb={8}>
        <Text fontSize="xl" mb={4}>Problems</Text>
        {/* {dummyProblems.map((problem) => (
          <Box key={problem.id} mb={4}>
            <ProblemBox {...problem} />
          </Box>
        ))} */}
      </Box>

      {/* Leaderboard Section */}
      <Box w="full">
        <Text fontSize="xl" mb={4}>Leaderboard</Text>
        <Table variant="simple" bg="gray.700" borderRadius="md">
          <Thead>
            <Tr>
              <Th color="white">Rank</Th>
              <Th color="white">User</Th>
              <Th color="white">Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyLeaderboard.map(({ rank, username, score }) => (
              <Tr key={rank}>
                <Td>{rank}</Td>
                <Td>{username}</Td>
                <Td>{score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default CodingBattleground;
