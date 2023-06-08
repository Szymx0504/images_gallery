import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header"; // you don't need to add curly braces here since Header is set as a default export
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState(""); // initial value (now we have 2 variables 'connected' with our app)
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value) // it's not advised way to do that [w Search.js jest target bez indeksu bo tutaj target Form.Control i Button łączą się w array (list)]
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.urls.small) {
          // i added this myself (if the photo doesn't exist, don't add it) [there was an error previously]
          setImages([{ ...data, title: word }, ...images]);
        }
      })
      .catch((error) => console.log(error));
    setWord(""); // in order to clear the search input
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id)); // filter(), the same as map(), creates a brand new array so it perfectly fits here (since you shouldn't directly mutate State's value)
  };
  // how it is accessed when reloading and variables above don't get assigned once again? Because they are constants or what??
  // console.log(word) // anytime when state of the component changes, component is re-rendered (still idk how the code reades comes through here)

  // first option (my attempt)
  // let imagesArray = [];
  // return (
  //   <div>
  //     <Header title="Images Gallery"></Header>
  //     <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}></Search>
  //     {/* {images.length ? <ImageCard image={images[0]}></ImageCard> : null} */}
  //     {images.forEach(image => {
  //       imagesArray.push(<ImageCard image={images[images.indexOf(image)]}></ImageCard>)
  //     })}
  //     <ul>{imagesArray}</ul>
  //   </div>
  // );

  // second option (instructor's attempt (probably better))
  return (
    <div>
      <Header title="Images Gallery"></Header>
      <Search
        word={word}
        setWord={setWord}
        handleSubmit={handleSearchSubmit}
      ></Search>
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard
                  image={image}
                  deleteImage={handleDeleteImage}
                ></ImageCard>
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome></Welcome>
        )}
      </Container>
    </div>
  );
} // you can do either <Header></Header> or <Header/>
// successfully recovered :) remember about git add . !!

export default App;
