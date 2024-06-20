'use client'

import { useContext, useState } from "react"
import { useBoolean } from "ahooks";
import useMounted from "./hooks/useMounted";

import { breakpointsContext, sessionContext } from "./helpers/Context";

import Auth from "./components/Auth";
import User from "./components/User";
import { Layout, Tabs, Row, ConfigProvider, Button as ButtonD } from "antd"


import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; 

export default function Page()
{

  //todo: uncomment
  // const supabase = createClientComponentClient();

  const {isMounted} = useMounted();

  const { Header, Content } = Layout;

  const [formIndex, setFormIndex] = useState(0);

  const {size} = useContext(breakpointsContext);
  // const {session, setSession} = useContext(sessionContext);

  const [loading, { setFalse, setTrue }] = useBoolean(false);

  const menuItems =
  [
    {
      label: "Sign In",
      key: "0",
    },
    {
      label: "Sign Up",
      key: "1"
    },
  ];

  const signOut = async () =>
  {
    setTrue();

    await supabase.auth.signOut();

    setSession("");

    setFalse();
  };

  return(
    <>
    {
        isMounted &&
        <Layout>
          <ConfigProvider theme={{ components: { Layout: { headerBg: "transparent", bodyBg: "#ffffff" } }, token: { colorLink: "#fcff9c" } }}>
            <Header >
              <Row align="middle" style={size.md ? {justifyContent: "space-between", flexFlow: "wrap", height: "100%" } : { justifyContent: "center", height: "100%" }} >
          {/*todo: uncomment*/}
               
                {/* {
                  session
                  ?
                    <>
                      <h2>Hello, {session.user_metadata.nickname}</h2>
                      <ButtonD loading={loading} onClick={signOut} type="link">Sign out</ButtonD>
                    </>
                  :
                    <Tabs defaultActiveKey="0" onChange={(key) => setFormIndex(key)} items={menuItems} animated={true} centered tabBarStyle={{ backgroundColor: "transparent", border: 0 }}></Tabs>
                } */}
              </Row>
            </Header>

            <Content style={{ display: "flex", flexDirection: "column", justifyContent: "center", overflowX: "hidden", maxWidth: "100vw" }}>
              {
                <>
          {/*todo: uncomment*/}
                
                  {/* {
                    session ?
                      <User session={session} />
                      : <Auth activeForm={formIndex} />
                    } */}
                    <User session={"1"} />
                </>
              }
            </Content>
          </ConfigProvider>
        </Layout>
      }
    </>
  )
}