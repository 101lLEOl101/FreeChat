import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Button, Center, Box, Group, Paper, PasswordInput, Text, TextInput, Tooltip, Loader } from '@mantine/core';
import { useForm } from "@mantine/form";
import type { AppDispatch, RootState } from "../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../connection/authThunk.ts";
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
    const form = useForm({
        initialValues: {
            login: '',
            password: '',
            repeatPassword: '',
            nickname: '',
            public_key: 'sha256',
            description: '',
        },
        validate: {
            password: (value) =>
                value.trim().length < 6 ? 'Password must be at least 6 characters' : null,
            repeatPassword: (value, values) =>
                value !== values.password ? 'Passwords do not match' : null,
        }
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleRegister = async () => {
        const resultAction = await dispatch(Register({
            login: form.values.login,
            password: form.values.password,
            nickname: form.values.nickname,
            public_key: form.values.public_key,
            description: form.values.description
        }));

        if (Register.fulfilled.match(resultAction)) {
            navigate("/main");
        }
    };

    const [opened, setOpened] = useState(false);
    const valid = form.values.password.trim().length >= 6;

    const rightSection = (
        <Tooltip
            label="We store your data securely"
            color={'gray'}
            position="top-end"
            withArrow
            transitionProps={{ transition: 'pop-bottom-right' }}
        >
            <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
                <Center>
                    <IconInfoCircle size={18} stroke={1.5} />
                </Center>
            </Text>
        </Tooltip>
    );

    return (
        <form onSubmit={form.onSubmit(handleRegister)}>
            <Paper shadow={"0px 8px 16px rgba(255, 255, 255, 0.2)"} withBorder p={"xl"} radius={"md"}>
                <TextInput
                    rightSection={rightSection}
                    value={form.values.login}
                    onChange={(e) => form.setFieldValue('login', e.target.value)}
                    label="Login"
                    placeholder="Your login"
                />
                <TextInput
                    value={form.values.nickname}
                    onChange={(e) => form.setFieldValue('nickname', e.target.value)}
                    label="Nickname"
                    placeholder="Your nickname"
                />
                <TextInput
                    value={form.values.description}
                    onChange={(e) => form.setFieldValue('description', e.target.value)}
                    label="Description"
                    placeholder="Your description"
                />
                <Tooltip
                    label={valid ? 'All good!' : 'Password must include at least 6 characters'}
                    position="bottom-start"
                    withArrow
                    opened={opened}
                    color={valid ? 'teal' : 'gray'}
                    withinPortal
                >
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        onFocus={() => setOpened(true)}
                        onBlur={() => setOpened(false)}
                        mt="md"
                        value={form.values.password}
                        onChange={(e) => form.setFieldValue('password', e.currentTarget.value)}
                        error={form.errors.password}
                    />
                </Tooltip>
                <PasswordInput
                    label="Repeat Password"
                    placeholder="Repeat your password"
                    mt="md"
                    value={form.values.repeatPassword}
                    onChange={(e) => form.setFieldValue('repeatPassword', e.currentTarget.value)}
                    error={form.errors.repeatPassword}
                />
                {error && (
                    <Text color="red" size="sm" mt="sm">
                        {error}
                    </Text>
                )}
                {loading && (
                    <Box
                        pt={10}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Loader size="lg" />
                    </Box>
                )}
                <Group justify="center" mt="md">
                    <Button type="submit">Register</Button>
                </Group>
                <Center mt="sm">
                    <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => navigate("/login")}
                    >
                        Already have an account?
                    </Button>
                </Center>
            </Paper>
        </form>
    );
}
