import { Container, Row, Col, Stack, Button } from "react-bootstrap";

export default function Content() {
  return (
    <>
      <Stack direction="horizontal" className="fs-1">
        <div>Level: 10</div>
        <div className="ms-auto">Score: 10</div>
      </Stack>
      <Container className="mt-5">
        <Row>
          <Col>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/383px-Flag_of_Iraq.svg.png" />
          </Col>
          <Col>
            <Button variant="light" className="d-block mt-3 mb-3 w-100">
              number one
            </Button>
            <Button variant="light" className="d-block mt-3 mb-3 w-100">
              number two
            </Button>
            <Button variant="light" className="d-block mt-3 mb-3 w-100">
              number three
            </Button>
            <Button variant="light" className="d-block mt-3 mb-3 w-100">
              number four
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
