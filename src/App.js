import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { id } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard/Dashboard";
import Root from "./pages/Root";

function App() {
  setDefaultOptions({ locale: id });

  return (
    <>
      <Router>
        <Toaster position='top-center' reverseOrder={false} />
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
