import { Row, Col, ConfigProvider } from "antd";

const Tasks = () =>
{
  return(
    <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }}}>
      <Row>
        <Col span={8} style={{backgroundColor: 'red'}}>
        </Col>

        <Col span={16} style={{backgroundColor: 'green'}}>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default Tasks;