import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

// a funciton choosing a random element from an array
function picRandomItem(array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

export default function Content({ data }) {
  const [level, setLevel] = useState(0);
  // score
  const [score, setScore] = useState(0);
  // the country that we are currently asking about
  const [currentQuestion, setCurrentQuestion] = useState();
  // options
  const [options, setOptions] = useState();
  // state for storing interval, so that we can clear it later on
  const [interv] = useState();
  // seconds
  const [secs, setSecs] = useState(0);
  // if the answer is wrong
  const [wrong, setWrong] = useState(false);
  // alert
  const [alert, setAlert] = useState(false);
  // final
  const [final, setFinal] = useState(false);

  useEffect(() => {
    setSecs(0);

    const question = picRandomItem(data);

    const defaultOptions = [1, 2, 3, 4];
    setCurrentQuestion(question);
    // put three options randomly, put the right choice in a random index
    const randomNumber = Math.floor(Math.random() * 4);
    setOptions(
      defaultOptions.map((value, index) => {
        return index === randomNumber ? question : picRandomItem(data);
      })
    );

    let interval;

    interval = setInterval(() => {
      setSecs((prev) => prev + 1);
    }, 1000);

    // at the end of useEffect, a function should be returned
    return () => clearInterval(interval);

    // connect useEffect with Level state so that each time you go to the next level you get a new questoin
  }, [level, data]);

  const time = 20;
  // if time is up and final is false(if we didn't set this then it would )
  if (secs >= time && !final) {
    clearInterval(interv);
    setFinal(true);
  }

  if (!currentQuestion || !options)
    return <ReactLoading type="spin" className="d-block mx-auto mt-5" />;

  if (final) {
    return (
      <>
        <p class="fs-1 text-center mt-3">
          Level: <span className="text-success">{level}</span>
        </p>
        <p class="fs-1 text-center">
          Score: <span className="text-success">{score}</span>
        </p>
        <Button
          size="lg"
          className="d-block mt-5 mx-auto"
          onClick={() => {
            setLevel(0);
            setFinal(false);
            setSecs(0);
          }}
        >
          Start Again
        </Button>
      </>
    );
  }

  return (
    <>
      <Stack direction="horizontal" className="fs-1">
        <div>Level: {level}</div>
        <div className={`ms-auto ${alert && `text-warning`}`}>
          Score: {score}
        </div>
      </Stack>
      <Container className="mt-5">
        <Row xs={1} md={2}>
          <Col>
            <Row className="mb-5">
              <div className="text-center">
                Guess the country this flag belongs to
              </div>
            </Row>
            <Row>
              <Image
                className=" mx-auto d-block max"
                style={{
                  width: "fit-Content",
                  maxHeight: "20rem",
                }}
                // src="https://vanishingportrait.com/wp-content/uploads/2019/05/tiffanytrenda-vanishingportrait-label.jpg"
                src={currentQuestion.flags.svg}
              />
            </Row>
          </Col>
          <Col className="pl-5">
            <Row className="mb-3">
              <div className="fs-1 text-center">
                {secs}
                <span className="text-muted">/20s</span>{" "}
                {wrong && <span className="text-warning">+10s</span>}
              </div>
            </Row>
            <Row>
              {/* options */}
              {options.map((value) => {
                return (
                  <Button
                    variant={wrong ? "danger" : "light"}
                    size="lg  "
                    className="d-block mt-2 mb-1 w-100"
                    onClick={() => {
                      // check if the answer is right
                      if (currentQuestion.cca2 === value.cca2) {
                        // add two ponts to the score
                        setScore((oldValue) => oldValue + 3);
                        setLevel((prev) => prev + 1);
                        setSecs(0);
                      } else {
                        // for one second set Wrong to be true and then turn it back to false
                        setWrong(true);
                        setTimeout(() => {
                          setWrong(false);
                          setSecs((oldValue) => oldValue + 10);
                        }, 500);
                      }
                    }}
                  >
                    {value.name.official}
                  </Button>
                );
              })}

              {/* pass button */}
              {!alert ? (
                <Button
                  variant="success"
                  size="lg"
                  className="mt-5"
                  onClick={() => {
                    // check if the user has enough score
                    if (score >= 5) {
                      // then take him to the next level
                      setLevel((prev) => prev + 1);
                      // subtract five points from score
                      setScore((prev) => prev - 15);
                    } else {
                      // alert should be true for a period of time in order show the alert message
                      setAlert(true);

                      setTimeout(() => {
                        setAlert(false);
                      }, 5000);
                    }
                  }}
                >
                  Pass
                </Button>
              ) : (
                <Alert variant="danger" className="mt-3" id="alert">
                  Sorry, you don't have enough Score to pass a question. In
                  order to pass one question you must have at least 15 points
                </Alert>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
