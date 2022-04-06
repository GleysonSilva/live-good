import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom } from "./pages/AdminRoom";
import { DashBoard } from "./pages/DashBoard";
import { RegisterResident } from "./pages/RegisterResident";
import { InforResident } from "./pages/InforResident";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/local/new" component={NewRoom} />
          {/* <Route path="/local/:id" component={Room} /> */}
          <Route path="/local/register-resident" component={RegisterResident} />
          <Route path="/local/resident-infor/:id" component={InforResident} />
          <Route path="/local/:id" component={DashBoard} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
