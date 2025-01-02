import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function ButtonAnswer({ text, onClick, color }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: "300px",
        height: "60px",
        textAlign: "center",
        backgroundColor: color || "primary",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </Button>
  );
}
export default function FlagQuestionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData || [];
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [i, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(200);
  const [isAnswered, setIsAnswered] = useState(false);
  const [buttonStates, setButtonStates] = useState({});

  useEffect(() => {
    if (quizData.length > 0 && i < quizData.length) {
      const questionNumber = quizData[i];
      const apiUrl = process.env.REACT_APP_API_URL;
      const fetchQuestion = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/api/quiz/guess-capital/question/${questionNumber}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCurrentQuestion(data);
          setTimeLeft(20);
          setIsAnswered(false);
          setButtonStates({});
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      };

      fetchQuestion();
    }
  }, [quizData, i]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setTimeout(() => {
      navigate("/lose", {
        state: { questionIndex: i, validAccess: true, max: quizData.length },
      });
    }, 2000);
  };

  const handleAnswer = async (selectedAnswer) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (isAnswered) return;
    setIsAnswered(true);

    const questionNumber = quizData[i];
    let correctCountry;

    try {
      const response = await fetch(
        `${apiUrl}/api/quiz/verify/${questionNumber}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      correctCountry = await response.text();
    } catch (error) {
      console.error("Error verifying answer:", error);
    }

    if (correctCountry == selectedAnswer) {
      setButtonStates((prevState) => ({
        ...prevState,
        [selectedAnswer]: "green",
      }));
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      setButtonStates((prevState) => ({
        ...prevState,
        [selectedAnswer]: "red",
        [correctCountry]: "green",
      }));
      setTimeout(() => {
        navigate("/lose", {
          state: { questionIndex: i, validAccess: true, max: quizData.length },
        });
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (i + 1 < quizData.length) {
      setIndex(i + 1);
    } else {
      navigate("/win", {
        state: {
          questionIndex: i + 1,
          validAccess: true,
          max: quizData.length,
        },
      });
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
      <Box
        className="white"
        sx={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: "8px",
        }}
        alignItems="space-between"
      >
        <Grid item xs={12}>
          <h3>Which country's capital is this?</h3>
        </Grid>
        <Grid container justifyContent="center">
          <Box sx={{ width: "150px", height: "auto", overflow: "hidden" }}>
            {currentQuestion ? currentQuestion.capitalName : <p>Loading...</p>}
          </Box>
        </Grid>

        {/* Timer with CircularProgress */}
        <Grid container justifyContent="center" marginY="20px">
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={(timeLeft / 20) * 100}
              size={60}
              thickness={5}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                color="textSecondary"
              >
                {timeLeft}s
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          spacing={2}
          marginTop="20px"
          justifyContent="flex-start"
        >

          <Grid item sm={12} xs={12} container spacing={2}>
            {currentQuestion?.countryNames?.map((country, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ButtonAnswer
                  text={country}
                  onClick={() => handleAnswer(country)}
                  color={buttonStates[country]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
