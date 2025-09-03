import {Button, Flex, Group, ScrollArea, Stack, Text, TextInput} from "@mantine/core";
import Header from "../components/Header";
import classes from "../styles/MainPage.module.css"
import {useState} from "react";

export default function MainPage() {
    const [chats, setChats] = useState([
        { id: 1, name: "Общий чат" },
        { id: 2, name: "Рабочая группа" },
        { id: 3, name: "Друзья" },
    ]);
    const [selectedChat, setSelectedChat] = useState<number | null>(1);

    const handleAddChat = () => {
        const newId = chats.length + 1;
        setChats([...chats, { id: newId, name: `Новый чат ${newId}` }]);
    };
 return(<>
         <Header/>
         <Flex className={classes.main}>
             <Flex
                 direction="column"
                 w="20%"
                 className={classes.sidebar}
             >
                 <Group mb="sm" p="sm">
                     <Text fw={600}>Чаты</Text>
                     <TextInput></TextInput>
                     <Button size="xs" onClick={handleAddChat}>+</Button>
                 </Group>

                 <ScrollArea>
                     <Stack p="sm">
                         {chats.map((chat) => (
                             <Button
                                 key={chat.id}
                                 variant={selectedChat === chat.id ? "light" : "subtle"}
                                 fullWidth
                                 onClick={() => setSelectedChat(chat.id)}
                             >
                                 {chat.name}
                             </Button>
                         ))}
                     </Stack>
                 </ScrollArea>
             </Flex>
             <Flex
                 w="80%"
                 className={classes.chat}
                 p="md"
                 direction="column"
             >
                 {selectedChat ? (
                     <Text size="lg" fw={500}>
                         Чат: {chats.find((c) => c.id === selectedChat)?.name}
                     </Text>
                 ) : (
                     <Text color="dimmed">Выберите чат</Text>
                 )}
             </Flex>
         </Flex>
     </>
 )
}