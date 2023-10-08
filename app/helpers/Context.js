import {createContext} from "react";

export const sessionContext = createContext(false);

export const breakpointsContext = createContext({ size : {sm: false, md: true} });

export const notificationContext = createContext();