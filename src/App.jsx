import './components/CalcArea'
import CalcArea from './components/CalcArea';
import './components/Head'
import Head from './components/Head';
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <div className="App">
      <Head/>
      <CalcArea/>
      <Analytics />
    </div>
  );
}

export default App;
