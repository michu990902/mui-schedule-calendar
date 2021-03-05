import Calendar from './components/Calendar/Calendar'
// import Task from './components/Calendar/Task'
import { Box } from '@material-ui/core'

function App() {
  return (
    <div className="App">
        <Box p={1}>
            <Calendar
                title="Schedule"
            />
            {/* <Task 
                label="test"
                isDone={false}
            />
            <Task 
                label="test"
                isDone={false}
                action={() => {}}
            />
            <Task 
                label="test"
                isDone={true}
            /> */}
        </Box>
    </div>
  );
}

export default App;
