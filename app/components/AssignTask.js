import { useContext } from "react";

import { Select, Form, Input, Button, ConfigProvider } from "antd";
import { notificationContext } from "../helpers/Context";
import { useBoolean } from "ahooks";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AssignTask = ({id, workers}) =>
  {
    const { TextArea } = Input;
    const { api } = useContext(notificationContext);

    const [assignLoading, setAssignLoading] = useBoolean(false);

    const supabase = createClientComponentClient()

    const createAssign = async (assign) =>
    {
      try
      {
        setAssignLoading.setTrue();

        const {error} = await supabase.from("Assignments")
        .insert
        ({
          title: assign.title,
          description: assign.description,
          assigned_by: id,
          assigned_to: assign.id_worker
        });

        if (!error)
        {
          assignSuccess("top");
        }
        else
        {
          assignError("top", "Oops, there is some error. Please try again later.");
          console.log(error);
        }

      }
      catch(error)
      {
        assignError("top", error.message);
      }
      finally
      {
        setAssignLoading.setFalse();
      }
    }

    const assignError = (placement, message) =>
    {
      api.error({
        message: message,
        duration: 3,
        style: {width: 420},
        placement
      })
    }

    const assignSuccess = (placement) =>
    {
      api.info({
        message: "You have successfully created an assignment!",
        duration: 0,
        style: {width: 420},
        placement
      })
    }

    return(
      <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }, components:{Button:{primaryColor: '#000000'}}}}>
        <Form layout="vertical" requiredMark={false} onFinish={createAssign}>
          <Form.Item label="Worker" name="id_worker" rules={[{ required: true, message: "Select worker." }]}>
            <Select>
              {workers?.list?.map((worker, key) => <Select.Option key={key} value={worker.id_worker}>{worker.UserDetails.nickname}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is a required field." }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Assign Description" name="description" rules={[{ required: true, message: "Assign Description is a required field." }]}>
            <TextArea />
          </Form.Item>
          <Button loading={assignLoading} type="primary" htmlType="submit" block>Create assign</Button>
        </Form>
      </ConfigProvider>
    )
  }
  
  export default AssignTask;