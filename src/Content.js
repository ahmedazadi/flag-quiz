import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

// a funciton choosing a random element from an array
function picRandomItem(array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

export default function Content() {
  // all countries
  const [all, setAll] = useState([]);
  // the country that we are currently asking about
  const [currentQuestion, setCurrentQuestion] = useState();
  // options
  const [options, setOptions] = useState([1, 2, 3]);
  // seconds
  const [secs, setSecs] = useState(0);
  // state for storing interval, so that we can clear it later on
  const [interv, setInterv] = useState();

  function newQuestion(data) {
    const question = picRandomItem(data);

    setCurrentQuestion(question);

    setOptions([question, ...options.map(() => picRandomItem(data))]);
  }

  useEffect(() => {
    // fetch all the data
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2")
      .then((response) => response.json())
      .then((data) => {
        setAll(data);
        newQuestion(data);
      });

    let interval;

    setInterv(
      (interval = setInterval(() => {
        setSecs((prev) => prev + 1);
      }, 1000))
    );

    return () => clearInterval(interval);
  }, []);

  if (secs === 5) {
    clearInterval(interv);
  }

  if (!all || !currentQuestion || !options) return "loadng";

  return (
    <>
      <Stack direction="horizontal" className="fs-1">
        <div>Level: 10</div>
        <div className="ms-auto">Score: 10</div>
      </Stack>
      <Container className="mt-5">
        <Row>
          <Col>
            <Row className="mb-5">
              <div className="text-center">
                Guess the country this flag belong to
              </div>
            </Row>
            <Row>
              <img src={currentQuestion.flags.svg} />
            </Row>
          </Col>
          <Col className="pl-5">
            <Row className="mb-3">
              <div className="fs-1 text-center">{secs}</div>
            </Row>
            <Row>
              {options.map((value) => {
                return (
                  <Button
                    variant="light"
                    className="d-block mt-2 mb-1 w-100"
                    onClick={() => {
                      // check if the answer is right
                      if (currentQuestion.cca2 === value.cca2) {
                        setCurrentQuestion(null);
                        setOptions([1, 2, 3]);

                        newQuestion(all);
                      }
                    }}
                  >
                    {value.name.common}
                  </Button>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
