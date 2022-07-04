import React from 'react';
import Task from './Task';
import {useDispatch, useSelector} from 'react-redux';
import {updateTaskState} from '../lib/store';

export default function TaskList () {
	const tasks = useSelector((state)=> {
		const tasksInOrder = [
			...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
			...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
		];

		const filteredTasks = tasksInOrder.filter(
			(t) => t.state === 'TASK_INBOX' ||  t.state === 'TASK_PINNED'
		);
		return filteredTasks;
	});
}
export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
	const events = {
		onPinTask,
		onArchiveTask,
	};
	const LoadingRow = (
		<div className="loading-item">
			<span className="glow-checkbox" />
			<span className="glow-text">
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);

	if (loading) {
		return (
			<div className="list-items" data-testid="lodaing" key={'lodaing'}>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}
	if (tasks.length === 0) {
		return (
			<div className="list-items" key={'empty'} data-testid="empty">
				<div className="wrapper-message">
					<span className="icon-check" />
					<div className="title-message">You have no tasks</div>
					<div className="subtitle-message">Sit back and relax</div>
				</div>
			</div>
		);
	}

	const tasksInOrder = [
		...tasks.filter((t) => t.state === 'TASK_PINNED'),
		...tasks.filter((t) => t.state !== 'TASK_PINNED'),
	];
	return (
		<div className="list-items">
			{tasksInOrder.map((task) => (
				<Task key={task.id} task={task} {...events} />
			))}
		</div>
	);
}

TaskList.propTypes = {
	lodaing: PropTypes.bool,
	tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
	onPinTask: PropTypes.func,
	onArchiveTask: PropTypes.func
};
TaskList.defaultProps = {
	loading: false,
};