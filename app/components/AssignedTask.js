import { Table } from "antd";

const AssignedTask = () =>
{
	const dataSource = [
		{
			key: '1',
			assigned_to: 'Mike Keilman',
			title: 'Change button',
			date: '12-05-2012, 13:34',
			description: 'Please change button on',
		},
		{
			key: '2',
			assigned_to: 'John Johnson',
			title: 'Add new page',
			date: '23-01-2013, 09:14',
			description: 'Please add new page with this button',
		},
	];
	
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
			dataIndex: 'date',
			key: 'date',
		},
		{
			key: 'action',
			render: (_, record) => (
				<button id={record.key} className="underline">Delete</button>
			),
		}
	];
	
	return(<Table dataSource={dataSource} columns={columns} />);
}

export default AssignedTask;
