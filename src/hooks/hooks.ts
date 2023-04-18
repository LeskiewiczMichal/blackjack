// Types
import { RootState } from "store/store";

// Libraries
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Functions
import type { AppDispatch } from "store/store";

// Create custom hooks for dispatch and selector
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
