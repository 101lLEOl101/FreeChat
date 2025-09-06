import {Avatar, Group, Loader, Menu, Text, UnstyledButton} from "@mantine/core";
import classes from "../styles/Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store.ts";
import {useNavigate} from "react-router-dom";
import {GetMe, Logout} from "../connection/Thunks.ts";
import {useEffect, useState} from "react";
import cx from 'clsx';
import {IconChevronDown, IconLogout} from "@tabler/icons-react";

export default function Header() {
    const defaultImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fdefault-avatar&psig=AOvVaw0eZqg2TKzKe-PnyrbYYRGb&ust=1756986680283000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC8lcnDvI8DFQAAAAAdAAAAABAE";
    const dispatch = useDispatch<AppDispatch>();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const navigate = useNavigate();
    const {user, loading, error} = useSelector((state: RootState) => state.auth);
    const handleLogout = async () => {
        const resultAction = await dispatch(Logout());
        if(Logout.fulfilled.match(resultAction)){
            navigate("/login");
        }
    }
    useEffect(() => {
        dispatch(GetMe());
    }, [dispatch]);
    if(loading) return <Loader />;
    return (
        <div className={classes.header}>
            {error && (
                <Text color="red" size="sm" mt="sm">
                    {error}
                </Text>
            )}
            {user &&(
                <Group>
                    <Menu
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                    >
                        <Menu.Target>
                            <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                                <Group>
                                <Avatar src={defaultImage} alt={user?.nickname} radius="xl" size={30} />
                                <Text fw={500} size="lg" lh={1} mr={3}>
                                    {user?.nickname}
                                </Text>
                                <IconChevronDown size={12} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={() => handleLogout()}>Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            )}
        </div>)
}