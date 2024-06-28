'use client'

import { useState, useEffect } from "react"

import { Row, Col, ConfigProvider, Tabs } from "antd"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Tasks from "./Tasks";
import AssignTask from "./AssignTask";
import AssignedTask from "./AssignedTask";
import Workers from "./Workers";

const User = ({ session }) =>
{
  const supabase = createClientComponentClient();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("")

  const [ownedWorkers, setOwnedWorkers] = useState(undefined);

  const refreshWorkers = async (idInput = id) =>
  {
    console.log(idInput);
    const response = await supabase.from('OwnerWorker').select('id, id_worker, UserDetails:id_worker (nickname)').eq('id_owner', idInput);

    if(!response.error)
    {
      setOwnedWorkers(() => [...response.data]);
    }
    else
    {
      console.log(response);
    }
  }

  const items = [
    {
      key: '1',
      label: 'Your tasks',
      children: <Tasks id={id} />,
    },
    {
      key: '2',
      label: 'Assign task',
      children: <AssignTask id={id} nickname={nickname} workers={{refresh: async () => await refreshWorkers(), list: ownedWorkers}} />,
    },
    {
      key: '3',
      label: 'Your assignments',
      children: <AssignedTask id={id} />,
    },
    {
      key: '4',
      label: 'Your workers',
      children: <Workers id={id} workers={{refresh: async () => await refreshWorkers(), list: ownedWorkers}}/>,
    }
  ];

  useEffect(() =>
  {
    (async () =>
    {
      const userInfo = await supabase.from('UserDetails').select().eq('uid', session.id).single();

      if(userInfo.error)
      {
        console.log(error);
      }
      else
      {
        setId(session.id);
        setNickname(userInfo.data.nickname);
        setDescription(userInfo.data.description ?? "");
    
        await refreshWorkers(session.id);
      }
    })()

  }, [session.user]);

  return (
  <>
    <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }}}>
      <Row justify={"center"}>
        <Col span={16}>
          <Tabs centered type="card" defaultActiveKey="1" items={items}  />
        </Col>
      </Row>
    </ConfigProvider>
  </>)
}

export default User;