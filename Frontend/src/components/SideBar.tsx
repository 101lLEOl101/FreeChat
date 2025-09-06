import classes from "../styles/SideBar.module.css";
import {Box, Button, Center, Collapse, Flex, Group, ScrollArea, Stack, Text, TextInput, UnstyledButton,} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import type {Chat} from "../connection/classes.ts";

interface SidebarProps {
    chats: Chat[] | null;
    selectedChat: number | null;
    onSelectChat: (id: number) => void;
    onAddChat: (nickname: string) => void;
    error_message_add?: string;
}

export default function SideBar({chats, selectedChat, onSelectChat, onAddChat, error_message_add}: SidebarProps) {
    const [opened, setOpened] = useState(false);
    const [new_chat_nickname, setValue] = useState("");
    return (
        <Flex direction="column" w="20%" className={classes.sidebar}>
            <Collapse in={opened} transitionDuration={300}>
                <Group mb="sm" p="sm" className={classes.addChat}>
                    <Text mt="sm" mr="auto" ml="auto" size="lg" fw={500}>
                        Новый чат с пользователем
                    </Text>
                    <Button size="xs" onClick={() => onAddChat(new_chat_nickname)}>
                        +
                    </Button>
                    <TextInput placeholder="Введите имя пользователя" value={new_chat_nickname} onChange={(e) => setValue(e.target.value)} />
                    <Text color={"red"}>{error_message_add}</Text>
                </Group>
            </Collapse>

            <UnstyledButton pb={"xs"} pt={"xs"} w="100%" onClick={() => setOpened((o) => !o)}>
                <Center>
                    {opened ? (
                        <IconChevronUp size={18} stroke={1.5} />
                    ) : (
                        <IconChevronDown size={18} stroke={1.5} />
                    )}
                </Center>
            </UnstyledButton>

            <ScrollArea style={{ flex: 1 }}>
                <Stack>
                    {chats?.map((chat) => (
                        <UnstyledButton
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`${classes.chatItem} ${
                                selectedChat === chat.id ? classes.chatItemActive : ""
                            }`}
                        >
                            <Box>
                                <Text size="sm" fw={500}>
                                    {chat.title}
                                </Text>
                                <Text size="xs" c="dimmed" lineClamp={1}>
                                    {chat.last_message_content || "Нет сообщений"}
                                </Text>
                            </Box>
                        </UnstyledButton>
                    ))}
                </Stack>
            </ScrollArea>
        </Flex>
    );
}