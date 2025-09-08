import classes from "../styles/SideBar.module.css";
import { Button, Flex, Text, TextInput, Box, Loader } from "@mantine/core";
import { IconArrowRightBar } from "@tabler/icons-react";
import { Message } from "./Message";
import type { MessageType, Chat } from "../connection/classes.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store.ts";
import {useEffect, useRef, useState} from "react";
import {CreateMessage, GetMessagesInChat} from "../connection/Thunks.ts";

interface SelectedChatProps {
    chat: Chat | null;
}

export default function SelectedChat({ chat }: SelectedChatProps) {
    const dispatch = useDispatch<AppDispatch>();
    const currentUserId = useSelector((state: RootState) => state.chat.user?.id);
    const { messages, loading, error } = useSelector((state: RootState) => state.messages);
    const [newMessage, setMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chat) {
            dispatch(GetMessagesInChat(chat.id));
        }
    }, [chat, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleMessage = async () => {
        if (chat) {
            const resultAction = await dispatch(CreateMessage({chat_id: chat.id, content: newMessage}));
            if (CreateMessage.fulfilled.match(resultAction)) {
                dispatch(GetMessagesInChat(chat.id))
            }
        }
    }

    return (
        <Flex
            w="80%"
            className={classes.chat}
            p="md"
            direction="column"
            style={{ position: "relative" }}
        >
            {chat ? (
                <>
                    {loading && (
                        <Box
                            pt={10}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <Loader size="lg" />
                        </Box>
                    )}
                    {error && <Text color="red">{error}</Text>}

                    {!loading && !error && (
                        <Flex direction="column" gap="xs" style={{ flexGrow: 1, overflowY: "auto" }}>
                            {messages?.map((msg: MessageType) => (
                                <Message
                                    key={msg.id}
                                    text={msg.content}
                                    time={msg.created_at}
                                    isOwn={msg.user_id === currentUserId}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </Flex>
                    )}

                    <Flex mt="auto" w="100%">
                        <TextInput
                            placeholder="Message..."
                            w="100%"
                            styles={{ input: { borderRadius: "1em 0 0 1em" } }}
                            value={newMessage}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleMessage();
                                }
                            }}
                        />
                        <Button styles={{ root: { borderRadius: "0 1em 1em 0" } }} onClick={() => handleMessage()}>
                            <IconArrowRightBar />
                        </Button>
                    </Flex>
                </>
            ) : (
                <Text ta="center" color="dimmed">
                    Выберите чат
                </Text>
            )}
        </Flex>
    );
}