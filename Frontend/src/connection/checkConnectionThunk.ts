import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import type {AppDispatch} from "../../store.ts";
import {GetMe} from "./Thunks.ts";

export function useAuthCheck() {
    const publicPaths = ["/login", "/register"];
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const interval = setInterval(async () => {
            const result = await dispatch(GetMe());

            if (GetMe.rejected.match(result) && !publicPaths.includes(location.pathname)) {
                navigate("/login");
            }
        }, 60000);

        (async () => {
            const result = await dispatch(GetMe());

            if (GetMe.rejected.match(result) && !publicPaths.includes(location.pathname)) {
                navigate("/login");
            }
        })();

        return () => clearInterval(interval);
    });
}