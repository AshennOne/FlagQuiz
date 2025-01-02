import MainPage from './MainPage/MainPage';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSetup from './QuizSetup/QuizSetup';
import FlagQuestionsPage from './FlagQuestionsPage/FlagQuestionsPage';
import LoseScreen from './LoseScreen/LoseScreen';
import WinScreen from './WinScreen/WinScreen';
import CapitalQuestionsPage from './CapitalQuestionsPage/CapitalQuestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App ">
            <MainPage></MainPage>
          </div>
        } />
        <Route path="/start" element={
          <div className="App ">
            <QuizSetup />
          </div>} />
        <Route path="/flag-questions" element={
          <div className="App ">
            <FlagQuestionsPage />
          </div>} />
          <Route path="/capital-questions" element={
          <div className="App ">
            <CapitalQuestionsPage />
          </div>} />
        <Route path="/lose" element={
          <div className="App ">
            <LoseScreen />
          </div>} />
        <Route path="/win" element={
          <div className="App ">
            <WinScreen />
          </div>} />
      </Routes>
    </Router>
    
  );
}

export default App;
