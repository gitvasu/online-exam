import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import ExamInfo from "./components/examInfo";
import NotFound from "./components/notFound";
import TakeTest from "./components/takeTest";
import Register from "./components/register";
import TestReport from "./components/testReport";
import { hasGivenTest, isRegistered } from "./utils/sessionManagement";

function App() {
  return (
    <Router>
      <Switch>


        <Route path="/exam-info"
          render={() => {
            if (isRegistered()) 
              return <ExamInfo />;
            else 
              return <Redirect to="/register" />; }
          }
        />


        <Route path="/register"
          render={
            (props) => {
              if (isRegistered())
                return (<Redirect to="/exam-info"{...props} msg="Need to logout first" />);
              else 
                return <Register {...props} />; }
          }
        />


        <Route path="/take-test"  
        render={
          (props) => {
            if (!props.location.state) 
              return <Redirect to="/exam-info" />;
            else if (props.location.state && hasGivenTest()) 
              return <Redirect to="/test-report" />;
            else 
              return <TakeTest {...props} />; }
            } 
            />


        <Route path="/test-report"   
               render={
                        (props) => {
                          if (!isRegistered())
                            return <Redirect to="/exam-info" />;
                          else 
                            return hasGivenTest() ? (<TestReport {...props} />) : (<Redirect to="/exam-info" />); }
            
                      } 
                      />

        <Redirect exact from="/" to="/exam-info" />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
        

      </Switch>
    </Router>
  );
}

export default App;


