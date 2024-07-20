import React, { useState } from 'react';

import { Box, Button, VStack } from '@chakra-ui/react';

import { ChannelList } from './ChannelList';
import { CreateChannelModal } from './CreateChannelModal';

export const Sidebar: React.FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <Box bg="gray.100" w="250px" h="100vh" p={4}>
            <VStack spacing={4} align="stretch">
                <Button onClick={() => setIsCreateModalOpen(true)}>Create Channel</Button>
                <ChannelList />
            </VStack>
            <CreateChannelModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </Box>
    );
};
