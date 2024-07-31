import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useBoolean } from "ahooks";

import { Button, Table, Modal, ConfigProvider, Form, Input } from "antd";
import { useContext } from "react";
import { notificationContext } from "../helpers/Context";


const Workers = ({id, workers}) =>
{
  const supabase = createClientComponentClient();

  const [showModal, {setTrue, setFalse}] = useBoolean(false);
  const [addWorkerLoading, SetAddWorkerLoading] = useBoolean(false);

  const { api } = useContext(notificationContext);

  const deleteWorker = async ({target}) =>
  {
    await supabase.from('OwnerWorker').delete().eq('id', target.id);
    await workers.refresh();
  }

  const addWorker = async (worker) =>
  {
    SetAddWorkerLoading.setTrue();

    const response = await supabase.from("UserDetails").select('uid').eq('nickname', worker.name).single();

    if(response.error)
    {
      if(response.code = "42703")
      {
        assignError("top", "User does not exist.");
      }
      else
      {
        console.log(response.error.message);
      }
    }
    else
    {
      const isAlreadyWorker = await supabase.from("OwnerWorker").select('id').eq('id_owner', id).eq('id_worker', response.data.uid);

      if(!isAlreadyWorker.error && !isAlreadyWorker.data?.length)
      {
        const { error } = await supabase.from("OwnerWorker")
        .insert
        ({
          id_owner: id,
          id_worker: response.data.uid
        });

        if(error)
        {
          console.log(error);
        } 
        else
        {
          setFalse();
  
          await workers.refresh();
        }
      }
      else
      {
        assignError("top", "Worker is already added.");
      }
    }

    SetAddWorkerLoading.setFalse();
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

  const columns =
  [
		{
			title: 'Worker',
			dataIndex: 'worker',
			key: 'worker',
		},
		{
			key: 'action',
			render: (_, record) => (
        record.index !== 0 &&
				<button id={record.key} onClick={deleteWorker} className="underline">Delete</button>
			),
		}
	];

  return (
    <>
      <Button onClick={() => setTrue()}>Add worker</Button>
      <Modal open={showModal} onCancel={setFalse} footer={null}>
        <ConfigProvider theme={{token: {colorLink: "#1677ff", fontSize: 16, colorTextHeading: '#ffffff', colorText: "#fcffe8" }, components:{Button:{primaryColor: '#000000'}}}}>
          <Form layout="vertical" requiredMark={false} onFinish={addWorker}>
            <Form.Item label="Worker name" name="name" rules={[{ required: true, message: "Worker name is required." }]}>
              <Input />
            </Form.Item>
            <Button loading={addWorkerLoading} type="primary" htmlType="submit" block>Add Worker</Button>
          </Form>
        </ConfigProvider>
      </Modal>
      {
        workers.list &&
        <Table dataSource={workers.list.map((el, index) => {return {index: index, key: el.id, worker: el.UserDetails.nickname}})} columns={columns} pagination={{ pageSize: 10, hideOnSinglePage: true }}/>
      }
    </>
  )
}

export default Workers;