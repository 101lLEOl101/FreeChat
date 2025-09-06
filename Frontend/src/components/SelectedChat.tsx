import classes from "../styles/SideBar.module.css";
import {Flex, Text} from "@mantine/core";

interface SelectedChatProps {
    chat: { id: number; name: string } | null;
}

export default function SideBar({ chat }: SelectedChatProps) {
    return (<Flex
            w="80%"
            className={classes.chat}
            p="md"
            direction="column"
        >
            {chat ? (
                <Text size="lg" fw={500}>
                    Чат: {chat?.name}
                </Text>
            ) : (
                <Text color="dimmed">Выберите чат</Text>
            )}
        </Flex>
    )
}