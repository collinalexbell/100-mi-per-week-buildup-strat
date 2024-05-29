import { BarChart, Bar, Cell, Rectangle, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';

function linearIncrease() {
 const weeks = Array.from({length: 52}, (value, key) => key + 1)
 return weeks.map(n => ({"miles":(100.0/52.0 * n), "week": n}))
}

function calculateWeek(startDate, currentDate) {
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week
  const startTime = startDate.getTime();
  const currentTime = currentDate.getTime();
  const elapsedWeeks = Math.floor((currentTime - startTime) / millisecondsPerWeek);
  const curWeek = elapsedWeeks + 1;
  return curWeek;
}

const colors = ['red', 'blue'];

function App() {
 const startDate = new Date("2024-05-28"); // Start date: Tuesday, May 28, 2024
 const currentDate = new Date(); // Current date
 const curWeek = calculateWeek(startDate, currentDate);
 let data = linearIncrease();
 data[0].ran = 0.37 + 0.37
 return (
  <div className="App">
    <BarChart
    height={800}
    width={800}
    data = {data}
   >
     <XAxis dataKey="week"/>
     <YAxis dataKey="miles"/>
     <Tooltip 
     formatter={(value, name, props)=>
       name === "miles" ? value.toFixed(1) + " (" + (value/7).toFixed(1) + " per day)" :
        value.toFixed(1)}/>
     <Bar dataKey="miles" fill="#8884d8" shape={<Rectangle />}>
        {linearIncrease().map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[curWeek === entry["week"] ? 0 : 1]} />
        ))}
      </Bar>
      <Bar dataKey="ran" fill="green"/>
    </BarChart>
  </div>
 );
}

export default App;
