import './styles/global.css'
import { Habit } from "./components/habit";

function App() {
  return (
    <div>
    <Habit completed={3}/>
    <Habit completed={10}/>
    <Habit completed={6}/>
    </div>
  )
}

export default App