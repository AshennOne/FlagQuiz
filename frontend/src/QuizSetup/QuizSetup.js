import { Grid2 as Grid } from "@mui/material";
import {Box, Button, ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function QuizSetup() {

    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [alignment, setAlignment] = useState('flags');
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }
    const handleStart = async () => {
        let url = `${apiUrl}/api/quiz/chronology`;
    
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setQuizData(data); 
          if(alignment === 'flags'){ 
            navigate("/flag-questions", { state: { quizData: data } });
          } else {
            navigate("/capital-questions", { state: { quizData: data } });
          }
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };
    return (
        <Grid
          container
          sx={{ minHeight: "100vh" }}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box className="white" alignItems="space-between">
            <Grid xs={12}>
              <h1>Countries Quiz</h1>
              <h4>Choose mode</h4>
            </Grid>
            <Grid>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
              <ToggleButton value="flags">Flags</ToggleButton>
              <ToggleButton value="capitals">Capitals</ToggleButton>
            </ToggleButtonGroup>
            </Grid>
            <Grid xs={12} marginTop="40px">
              <Button 
              variant="contained"
              sx={{ width: "200px" }}
              onClick={handleStart}
              >
                Start
                </Button>
            </Grid>
          </Box>
        </Grid>
    );
}
