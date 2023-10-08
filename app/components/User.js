'use client'

import { useState, useEffect } from "react"
import { useBoolean } from "ahooks";

import { Row, Col, Typography, theme, Spin, ConfigProvider } from "antd"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const User = ({ session }) =>
{
  const supabase = createClientComponentClient();

  const { Title, Paragraph } = Typography;

  const { token } = theme.useToken();

  const [loading, { setFalse, setTrue }] = useBoolean(false);

  const [id, setId] = useState("");
  const [description, setDescription] = useState("")
  const [nickname, setNickname] = useState("")

  const updateInfo = async (obj) =>
  {
    try
    {
      setTrue();
  
      const response = await supabase.from('UserDetails').update({[obj.fieldName]: obj.fieldValue}).eq('id', id).select();
  
      if (response.status === 200)
      {
        obj.setFunction(response.data[0][obj.fieldName]);
      }
      else
      {
        console.log(response.statusText);
      }
    }
    catch(err)
    {
      console.log(err);
    }
    finally
    {
      setFalse();
    }
  }

  useEffect(() =>
  {
    (async () =>
    {
      const userInfo = await supabase.from('UserDetails').select().eq('uid', session.id).limit(1).single();

      if(!userInfo.error)
      {
        setId(userInfo.data.id);
        setNickname(userInfo.data.nickname);
        setDescription(userInfo.data.description ?? "");
      }
    })()

  }, [session.user]);

  return (
  <>
    <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }}}>
      <Row wrap={false} gutter={[16,16]}>
        <Col style={{ backgroundColor: token.colorPrimary, borderRadius: "4px" }} xl={{span: 8, offset: 8}} md={{span: 12, offset: 6}} sm={{span: 20, offset: 2}} xs={{span: 24, offset: 0}}>
          <Spin spinning={loading}>
            <Row wrap={false}  justify="center">
              <Col span={23}>
                <Title level={2}>Your profile:</Title>
                <Row wrap={false} >
                  <Col span={5} xs={{span: 7}}>
                    <Paragraph strong={true}>Nickname:&nbsp;</Paragraph>
                  </Col>
                  <Col span={19} xs={{span: 17}}>
                    <Paragraph editable={{ onChange: (value) => updateInfo({ fieldName: "nickname", fieldValue: value, setFunction: (setValue) => setNickname(setValue) }), tooltip: false }}>{nickname}</Paragraph>
                  </Col>
                </Row>

                <Row wrap={false}>
                  <Col span={24}>
                    <Paragraph strong={true}>About me:</Paragraph>
                    <Paragraph editable={{maxLength: 240, onChange: (value) => updateInfo({ fieldName: "description", fieldValue: value, setFunction: (setValue) => setDescription(setValue) }), tooltip: false }}>{description}</Paragraph>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
    </ConfigProvider>
  </>)
}

export default User;