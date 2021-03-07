import Calendar from './components/Calendar/Calendar'
import { Box } from '@material-ui/core'

function App() {
  return (
    <div className="App">
        <Box p={1}>
            <Calendar
                title="Schedule"
            />
        </Box>
    </div>
  );
}

export default App;
