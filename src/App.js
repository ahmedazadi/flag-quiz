import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Content from "./Content";
import ReactLoading from "react-loading";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    // fetch all the data
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data)
    return <ReactLoading type="spin" className="d-block mx-auto mt-5" />;

  return (
    <>
      <Container className="bg-cyan-900">
        <Content data={data} />
      </Container>
    </>
  );
}

export default App;
