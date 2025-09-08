import { Card, Flex, Text } from "@mantine/core";

interface MessageProps {
    text: string;
    time: string; // приходит в формате 2025-09-08T11:41:54.928019
    isOwn?: boolean;
}

function formatTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Message({text, time, isOwn = false }: MessageProps) {
    return (
        <Flex
            justify={isOwn ? "flex-end" : "flex-start"}
            w="100%"
            my="xs"
        >
            <Card
                padding="sm"
                radius="lg"
                style={{
                    maxWidth: "70%",
                    backgroundColor: isOwn
                        ? "light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-8))"
                        : "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
                    color: "light-dark(var(--mantine-color-black), var(--mantine-color-dark-0))",
                }}
            >
                <Flex direction="column" gap={4}>
                    <Text size="sm">{text}</Text>
                    <Text
                        size="xs"
                        style={{
                            alignSelf: isOwn ? "flex-end" : "flex-start",
                            opacity: 0.7,
                        }}
                    >
                        {formatTime(time)}
                    </Text>
                </Flex>
            </Card>
        </Flex>
    );
}