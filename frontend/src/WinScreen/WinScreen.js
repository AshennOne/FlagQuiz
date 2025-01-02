import { Grid2, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WinScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const maximum = location.state?.max
  const queryParams = new URLSearchParams(location.search);
  const questionIndex = location.state?.questionIndex;
  
  useEffect(() => {
    if (!location.state?.validAccess) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleGoHome = () => {
    navigate("/");
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
          <h1>You Won!</h1>
        </Grid2>
        <Grid2 xs={12}>
          <h2>Your score: {questionIndex} / {maximum}</h2>
        </Grid2>
        <Grid2 xs={12} marginTop="40px">
          <Button variant="contained" color="primary" onClick={handleGoHome}>
            Back to menu
          </Button>
        </Grid2>
      </Box>
    </Grid2>
  );
}
