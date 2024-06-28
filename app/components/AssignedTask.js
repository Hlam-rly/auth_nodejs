import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";

import { Table, Button } from "antd";

const AssignedTask = ({id}) =>
{
  const supabase = createClientComponentClient();

  const [assignedTasks, setAssignedTasks] = useState([]);

	useEffect(() =>
	{
		(async () => refreshTasks())()
	}, [id]);

	const refreshTasks = async () =>
	{
		const response = await supabase.from('Assignments')
			.select('id, title, description, UserDetails:assigned_to (nickname), created_at, done')
			.eq('assigned_by', id);

			if(!response.error)
			{
				setAssignedTasks(() => [...response.data.map((assignment) => 
					{
						return {
							key: assignment.id,
							title: assignment.title,
							description: assignment.description,
							created_at: new Date(assignment.created_at).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit', second: '2-digit' }),
							assigned_to: assignment.UserDetails.nickname,
							done: assignment.done ? <span className="text-green-400">Done</span> : <span className="text-yellow-200">In progres</span>
						}
					})])
			}
	}

	const deleteAssignment = async ({target}) =>
	{
		await supabase.from('Assignments').delete().eq('id', target.id);

		await refreshTasks();
	}

	const columns = [
		{
			title: 'Assigned to',
			dataIndex: 'assigned_to',
			key: 'assigned_to',
		},
		{
			title: 'Title of assignment',
			dataIndex: 'title',
			key: 'title',
			ellipsis: true,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: 'Date',
			dataIndex: 'created_at',
			key: 'created_at',
		},
		{
			title: 'Status',
			dataIndex: 'done',
			key: 'done',
		},
		{
			key: 'action',
			render: (_, record) => (
				<button id={record.key} className="underline" onClick={deleteAssignment}>Delete</button>
			),
		}
	];
	
	return(
	<>
	<Button onClick={refreshTasks}>Refresh</Button>
	<Table dataSource={assignedTasks} columns={columns} pagination={{ pageSize: 10, hideOnSinglePage: true }} />
	</>);
}

export default AssignedTask;
