import "./App.css";
import Header from "./header/Header";
//import Createcomments from "./Createcommets/Createcomments";
import Showcomments from "./showcomments/Showcomments";

function App() {
  return (
    <>
      <div className="maindiv">
        <Header />
       
        <Showcomments />
      </div>
    </>
  );
}

export default App;
