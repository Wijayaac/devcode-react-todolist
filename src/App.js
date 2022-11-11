import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Root from "./pages/Root";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
