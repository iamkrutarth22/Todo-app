
import { useParams } from 'react-router-dom'

const Task = () => {
    const params=useParams()
  return (
    <div>
      task no {params.taskid}
    </div>
  )
}

export default Task
