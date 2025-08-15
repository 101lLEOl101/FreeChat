import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type {AppDispatch} from "../../store.ts";
import {GetMe} from "./authThunk.ts";

export function useAuthCheck() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const interval = setInterval(async () => {
            const result = await dispatch(GetMe());

            if (GetMe.rejected.match(result)) {
                navigate("/login");
            }
        }, 60000);

        (async () => {
            const result = await dispatch(GetMe());
            if (GetMe.rejected.match(result)) {
                navigate("/login");
            }
        })();

        return () => clearInterval(interval);
    });
}