import "./MainPage.css";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import QuizSetup from "../QuizSetup/QuizSetup";
import { useNavigate } from 'react-router-dom';



function MainPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/start');
  };

  return (
    <Grid2
      container
      sx={{ minHeight: "100vh" }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box className="white" alignItems="space-between">
        <Grid2 xs={12}>
          <h1>Countries Quiz</h1>
        </Grid2>
        <Grid2 xs={12} marginTop="40px">
          <Button 
          variant="contained"
          sx={{ width: "200px" }}
          onClick={
            handleClick
          }
          >
            Start
            </Button>
        </Grid2>
      </Box>
    </Grid2>
  );
}

export default MainPage;
