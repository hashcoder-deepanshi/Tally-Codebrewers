import React, { useState } from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Flex, IconButton } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from './language';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import Timer from './Timer';

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari & Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen); // Toggle fullscreen state
  };

  return (
    <Box ml={2} display="flex" alignItems="center" justifyContent="space-between" height="44px" width="100%">
      <Menu isLazy>
        <MenuButton px={4} py={2} as={Button}>
          {language}
        </MenuButton>
        <MenuList bg="gray.200">
          {languages.map(([lang, version]) => (
            <MenuItem
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.200" : "transparent"}
              _hover={{ color: ACTIVE_COLOR, bg: "gray.900" }}
              key={lang}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">({version})</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Flex alignItems="center" m={2}>
        <IconButton
          aria-label="Settings"
          icon={<AiOutlineSetting />}
          size="lg"
          variant="ghost"
          color="gray.600"
          _hover={{ color: "gray.800" }}
        />
        <IconButton
          aria-label="Fullscreen"
          icon={isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
          size="lg"
          variant="outlined"
          color="gray.600"
          _hover={{ color: "gray.800" }}
          onClick={handleFullscreenToggle}
        />
        <Timer />
      </Flex>
    </Box>
  );
};

export default LanguageSelector;
