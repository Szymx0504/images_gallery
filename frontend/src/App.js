import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header"; // you don't need to add curly braces here since Header is set as a default export
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import Welcome from "./components/Welcome";
import Spinner from "./components/Spinner";
import { Container, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [word, setWord] = useState(""); // initial value (now we have 2 variables 'connected' with our app)
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);


  const getSavedImages = async () => {
    try {
      const result = await axios.get(`${API_URL}/images`) // result.data is what was returned by flask
      setImages(result.data || []); // in case the .data is empty let's put an empty array
      setLoading(false);
      toast.success("Saved images downloaded");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Warning: useEffect must not return anything besides a function, which is used for clean-up.
  useEffect(() => { getSavedImages() }, []); // if you type an empty list at the end, the function will be called only when the page is loaded (so only once)
  // specifically when the app component renders

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value) // it's not advised way to do that [w Search.js jest target bez indeksu bo tutaj target Form.Control i Button łączą się w array (list)]
    // fetch(`${API_URL}/new-image?query=${word}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.urls.small) {
    //       // i added this myself (if the photo doesn't exist, don't add it) [there was an error previously]
    //       setImages([{ ...data, title: word }, ...images]);
    //     }
    //   })
    //   .catch((error) => console.log(error));

    try {
      const result = await axios.get(`${API_URL}/new-image?query=${word}`);
      // console.log(result.data); // everything related to searched images is stored inside of .data 'folder'
      setImages([{ ...result.data, title: word }, ...images]);
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    };

    setWord(""); // in order to clear the search input
  };
  const handleDeleteImage = async (id) => {
    try {
      const result = await axios.delete(`${API_URL}/images/${id}`); // you need to insert here .id, not the image object itself (remember about it)
      if (result.data?.deleted_id) { // bcs it could have deleted no object
        const titleOfImageToBeDeleted = images.find((image) => image.id === id).title;
        setImages(images.filter((image) => image.id !== id)); // filter(), the same as map(), creates a brand new array so it perfectly fits here (since you shouldn't directly mutate State's value)
        toast.warning(`Image ${titleOfImageToBeDeleted.toUpperCase()} was deleted`)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const result = await axios.post(`${API_URL}/images`, imageToBeSaved); // axios will automatically convert JavaScriptObject to json file for you
      if (result.data?.inserted_id) { // optional chaining (if .inserted_id doesn't exist, the statement will be evaluated to undefined and it won't raise an error)
        setImages(
          images.map((image) => image.id === id ? { ...image, saved: true } : image)
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
      {loading ? (<div><Spinner></Spinner></div>) : (
        <>
          <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}></Search>
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    ></ImageCard>
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome></Welcome>
            )}
          </Container>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        // autoClose={5000} // all of these will be added as the default parameters
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="light">
      >
      </ToastContainer>
    </div>
  );
} // you can do either <Header></Header> or <Header/>
// successfully recovered :) remember about git add . !!

export default App;
