import React, { useEffect, useState } from "react";
import { IconButton, Flex, Text, Box } from "@chakra-ui/react";
import { FiPlay, FiRefreshCcw } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";

const Timer = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId;

    if (showTimer) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showTimer]);

  return (
    <Box>
      {showTimer ? (
        <Flex alignItems="center" p={1.5} cursor="pointer">
        <IconButton
            aria-label="Reset Timer"
            icon={<FiPlay />}
            onClick={() => {
              setShowTimer(false);
              setTime(0);
            }}
            ml={2}
            variant="outlined"
            size="sm"
            color="gray.600"
            _hover={{ color: "gray.800" }}
          />
          <Text>{formatTime(time)}</Text>
          <IconButton
            aria-label="Reset Timer"
            icon={<FiRefreshCcw />}
            onClick={() => {
              setShowTimer(false);
              setTime(0);
            }}
            ml={2}
            variant="outlined"
            size="sm"
            color="gray.600"
            _hover={{ color: "gray.800" }}
          />
        </Flex>
      ) : (
        <Flex alignItems="center" p={1} h={8} cursor="pointer"  onClick={() => setShowTimer(true)}>
          <MdOutlineTimer size="sm" color="gray.600" />
        </Flex>
      )}
    </Box>
  );
};

export default Timer;
