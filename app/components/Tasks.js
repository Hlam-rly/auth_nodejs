import { Row, Col, ConfigProvider, List } from "antd";
import { useEffect, useState } from "react";

const Tasks = () =>
{
  const [selectedTask, setSelectedTask] = useState(false);

  const data =
  [
    {
      title: "Change button",
      description: "Please Change this button.",
      assigned_by: "Ivan Ivanov",
      date: "12-12-2012, 12:30"
    },
    {
      title: "Change Title please",
      description: "Please Change Title please ..",
      assigned_by: "Ian Johnson",
      date: "12-6-2012, 15:11"
    },
    {
      title: "Add new page",
      description: "Please add this page ....",
      assigned_by: "Kate Jackson",
      date: "12-8-2012, 8:54"
    }
  ]

  return(
    <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }}}>
      <Row>
        <Col span={8} style={{borderRight: "1px solid white"}}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item, i) => 
            <List.Item className="bg-neutral-800"
             extra={
              <span className="underline cursor-pointer" id={i} onClick={(e) => {setSelectedTask(data[e.target.id])}}>view</span>
            } >
              <List.Item.Meta title={<span>{item.title}</span>} description={<span>{item.description}</span>} />
            </List.Item>
          }
        >
          
        </List>
        </Col>
        <Col span={16} className="p-2 flex flex-col items-center relative">
        {selectedTask
          ?
          <>
            <span className="mb-5 max-w-sm">{selectedTask.title}</span>
            <span className="absolute left-2 top-2">{selectedTask.date}</span>
            <span className="max-w-sm">{selectedTask.description}</span>
            <span className="absolute right-2 bottom-2">Assigned by: {selectedTask.assigned_by}</span>
            <span className="absolute right-2 top-2 underline cursor-pointer">Report completion.</span>
          </>
          :
          <span>Choose task to see details.</span>
        }
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default Tasks;