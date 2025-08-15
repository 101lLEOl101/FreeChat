import {Box, Button, Loader, Text} from "@mantine/core"
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store.ts";
import {GetMe, Logout} from "../connection/authThunk.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function MainPage() {
    const dispatch = useDispatch<AppDispatch>();
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
    return (<>
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
            {user &&(<Box>{user?.login}</Box>
            )}
            <Button w={"100px"} onClick={handleLogout}>Logout</Button>
        </>
    );
}