import Company from "./Components/Company";
import CompanyDashboard from "./Components/CompanyDashboard";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';

import JobCard from "./Components/JobCard";
import Userlogin from "./Components/Userlogin";
import EditProfiles from "./Components/EditProfiles";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/company" element={<Company />}></Route>
          <Route path="/companyDashboard" element={<CompanyDashboard />}></Route>
          <Route path="/jobcard/:data" element={<JobCard />}></Route>
          <Route path="/userlogin" element={<Userlogin />}></Route>
          <Route path="/editprofile" element={<EditProfiles />}></Route>

          {/* <Route path="/createpost" element={<CreatePost/>}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
