import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    console.log(taskData)
    const createdTask = { id: taskData.taskData._id, text: taskText };
    props.onAddTask(createdTask)
  }

  const enterTaskHandler = (taskText) => {

    sendTaskRequest({
      url: '/add-task',
      method: 'POST',
      body: {
        text: taskText
      },
      headers: { 'Content-Type': 'application/json' }
    }, createTask.bind(null, taskText))
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
