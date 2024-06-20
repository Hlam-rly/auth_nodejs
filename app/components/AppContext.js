'use client'

import { useEffect, useState } from "react";
import {useResponsive} from "ahooks/es"

import { sessionContext, breakpointsContext, notificationContext } from "../helpers/Context";

import { ConfigProvider, theme, notification } from "antd"

const AppContext = ({sessionProp, children}) =>
{
  const [session, setSession] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const size = useResponsive();

  //todo: uncomment
  // useEffect(() =>
  // {
  //   sessionProp ? setSession(sessionProp) : setSession("");
  // }, [sessionProp])

  return(
    <>
      {
        // session != null &&
        <ConfigProvider theme={{
          algorithm: theme.darkAlgorithm, token: { colorPrimary: "#e5e892", colorBgLayout: "#434343" }}}>
          {/*todo: uncomment*/}
          {/* <sessionContext.Provider value={{ session, setSession }}> */}
            <breakpointsContext.Provider value={{ size }}>
              <notificationContext.Provider value={{ api, values: { signUpMessage: "Please check your email, a message with confirmation link was sent to your email address. " } }}>
                  {contextHolder}
                  {children}
              </notificationContext.Provider>
            </breakpointsContext.Provider>
          {/* </sessionContext.Provider> */}
        </ConfigProvider>
      }
    </>
  )
}

export default AppContext;