import React, { useState } from 'react';
import { Box, VStack, Button } from '@chakra-ui/react';
import { ChannelList } from './ChannelList';
import { CreateChannelModal } from './CreateChannelModal';

export const Sidebar: React.FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingChannelId, setEditingChannelId] = useState<string | null>(null);

    const handleEditChannel = (channelId: string) => {
        setEditingChannelId(channelId);
    };

    const handleFinishEdit = () => {
        setEditingChannelId(null);
    };

    return (
        <Box bg="gray.100" w="250px" h="100vh" p={4}>
            <VStack spacing={4} align="stretch">
                <Button onClick={() => setIsCreateModalOpen(true)}>Create Channel</Button>
                <ChannelList
                    editingChannelId={editingChannelId}
                    onEditChannel={handleEditChannel}
                    onFinishEdit={handleFinishEdit}
                />
            </VStack>
            <CreateChannelModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </Box>
    );
};
