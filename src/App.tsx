import "./App.css";
import LeftSideBar from "./Components/Left-Sidebar/Left-Sidebar";

const App = () => {

  return (
    <div className="d-flex">
      <LeftSideBar />
      <div className="flex-grow-1 p-3">
      </div>
    </div>
  );
};

export default App;
