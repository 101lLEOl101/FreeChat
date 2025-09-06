import {Box, Flex, Loader, Text} from "@mantine/core";
import Header from "../components/Header";
import classes from "../styles/MainPage.module.css"
import SideBar from "../components/SideBar.tsx";
import SelectedChat from "../components/SelectedChat";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store.ts";
import {CreateChat, GetMe} from "../connection/Thunks.ts";

export default function MainPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error } = useSelector((state: RootState) => state.chat);
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    useEffect(() => {
        dispatch(GetMe());
    }, [dispatch]);
    const handleAddChat = async (nickname: string) => {
        const resultAction = await dispatch(CreateChat({nickname}));
        if(CreateChat.fulfilled.match(resultAction)){
            dispatch(GetMe())
        }
    };
 return(<>
         <Header/>
         <Flex className={classes.main}>
             {loading && <Box pt={10} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',}}><Loader size="lg" /></Box> }
             {error && <Text color={"red"}>{error}</Text>}
             {(!loading && !error) && <SideBar
                 chats={user?.chats}
                 selectedChat={selectedChat}
                 onSelectChat={setSelectedChat}
                 onAddChat={handleAddChat}
             />}

            <SelectedChat chat={user?.chats.find((c) => c.id === selectedChat) || null} />
         </Flex>
     </>
 )
}