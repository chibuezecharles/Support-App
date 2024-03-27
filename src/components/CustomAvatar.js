import React from 'react';
import { Box, Flex, Text, AvatarGroup, Avatar, Menu, MenuButton, MenuList, MenuItem, Divider } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { CgChevronUp } from 'react-icons/cg';

const CustomAvatar = ({ avatars, contributor }) => {
  const [showArrow, setShowArrow] = React.useState(false);
  const handleShowArrow = () => {
    setShowArrow(!showArrow);
  };

  // Extract the first names of the avatars (up to a maximum of 2)
  const firstNames = avatars.slice(0, 2).map(avatar => avatar.fullname.split(' ')[0]);
  // Calculate the number of remaining contributors
  const remainingCount = Math.max(avatars.length - 2, 0);

  return (
    <Box mt={'50px'}>
      <Menu>
        <MenuButton
          as={AvatarGroup}
          size="md"
          max={2}
          border={'1px solid #EDEDED'}
          width={['263px', '300px', '400px']}
          style={{ borderRadius: '4px', padding: '5px ' }}
          boxShadow={'lg'}
          onClick={handleShowArrow}
        >
          <Flex alignItems={'center'} gap={'10px'}>
            {avatars?.slice(0, 2).map((avatar, index) => (
              <Avatar key={index} name={avatar.fullname} src={avatar.src} />
            ))}
            <Flex flexDirection={'column'} fontWeight={'500'} lineHeight={'23px'}>
              <Text color={'#121212'} fontSize={'18px'}>
                {contributor}
              </Text>
              <Text color={'#8A8C8E'} fontSize={'14px'}>
                {firstNames.join(', ')}
                {remainingCount > 0 && `, ${remainingCount} others`}
              </Text>
            </Flex>
            {showArrow ? (
              <FiChevronDown style={{ width: '30px', height: '30px' }} />
            ) : (
              <CgChevronUp style={{ width: '30px', height: '30px' }} />
            )}
          </Flex>
        </MenuButton>
        <MenuList
          style={{ position: 'relative', left: 0, top: '100%', overflow: 'auto', maxHeight: '200px' }}
          css={{
            '&::-webkit-scrollbar': {
              width: '0',
              display: 'none',
            },
            scrollbarWidth: 'none',
            overflow: 'hidden',
            maxHeight: '200px',
            msOverflowStyle: 'none',
          }}
          width={['263px', '300px', '400px']}
        >
          {avatars.map((avatar, index) => (
            <>
              <MenuItem key={index}>
                <span style={{ color: '#121212', fontWeight: '500' }}>{avatar.fullname}</span>
                {/* -{' '}<span style={{ color: '#8A8C8E' }}>{avatar.title}</span> */}
              </MenuItem>
              {index < avatars.length - 1 && <Divider />}
            </>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CustomAvatar;
