import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import {Button, Center, Box, Group, Paper, PasswordInput, Text, TextInput, Tooltip, Loader} from '@mantine/core';
import {useForm} from "@mantine/form";
import type {AppDispatch, RootState} from "../../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Login} from "../connection/authThunk.ts";
import {useNavigate} from "react-router-dom";
export default function LoginComponent() {
    const form = useForm({
        initialValues: {
            login: '',
            password: '',
        }
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const handleLogin = async () => {
        const resultAction = await dispatch(Login(form.values));
        if(Login.fulfilled.match(resultAction)){
            navigate("/main");
        }
    }
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
        <form onSubmit={form.onSubmit(handleLogin)}>
            <Paper shadow={"0px 8px 16px rgba(255, 255, 255, 0.2)"} withBorder p={"xl"} radius={"md"}>
                <TextInput
                    rightSection={rightSection}
                    value={form.values.login}
                    onChange={(e) => form.setFieldValue('login', e.target.value)}
                    label="Login"
                    placeholder="Your login"
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
                    />
                </Tooltip>
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
                <Group justify="center">
                    <Button type="submit" mt={"md"}>Login</Button>
                </Group>
            </Paper>
        </form>
    );
}