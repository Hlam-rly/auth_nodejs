import { Row, Col, ConfigProvider, List, Modal, Button } from "antd";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";

const Tasks = ({id}) =>
{
  const supabase = createClientComponentClient();

  const [selectedTask, setSelectedTask] = useState(false);
  const [tasks, setTasks] = useState([])
  const [completionModal, setCompletionModal] = useState(null);

  useEffect(() =>
  {
    id &&
    (async () =>
      {
        await refreshTasks();
      })()
  }, [id])

  const CompleteTask = async () =>
  {
    const response = await supabase.from("Assignments").update({done: true}).eq("id", completionModal).select();

    if(response.error)
    {
      console.log(response);
    }
    else
    {
      await refreshTasks();
    }
  }

  const refreshTasks = async () =>
  {
    const response = await supabase.from("Assignments").select("*, UserDetails:assigned_by (nickname)").eq('assigned_to', id).eq('done', false);

    if(response.error)
    {
      console.log(response);
    }
    else
    {
      setTasks(() => response.data);
    }
  }

  return(
    <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }}}>
      <Modal open={completionModal} onCancel={() => setCompletionModal(null)} footer={null}>
        <div className="flex flex-col items-center">
          <span className="my-2">You want to check this assignment as completed?</span>
          <div className="flex gap-x-2">
            <Button onClick={() => setCompletionModal(null)}>Cancel</Button>
            <Button type="primary" className="text-black" onClick={CompleteTask}>Report Completion</Button>
          </div>
        </div>
      </Modal>

      <Row>
        <Col span={8} style={{borderRight: "1px solid white"}}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={tasks}
          renderItem={(item, i) => 
            <List.Item className="bg-neutral-800"
             extra={
              <span className="underline cursor-pointer" id={i} onClick={(e) => {setSelectedTask(tasks[e.target.id])}}>view</span>
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
            <span className="absolute left-2 top-2">{new Date(selectedTask.created_at).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="max-w-sm">{selectedTask.description}</span>
            <span className="absolute left-2 bottom-2">Assigned by: {selectedTask.UserDetails.nickname}</span>
            <span className="absolute right-2 bottom-2 underline cursor-pointer" onClick={() => setCompletionModal(selectedTask.id)}>Report completion.</span>
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