import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { id } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard/Dashboard";
import Root from "./pages/Root";
import ActivityDetail from "./pages/Activity/ActivityDetail";

function App() {
  setDefaultOptions({ locale: id });

  return (
    <>
      <Router>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Dashboard />} />
            <Route path='/activity/:id' element={<ActivityDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
