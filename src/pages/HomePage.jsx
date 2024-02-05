import React from 'react'
import Cards from '../components/Cards'
import Header from "../components/Header"
import Footer from "../components/Footer"
import SideBar from "../components/SideBar"
import { Container, Row, Col } from 'react-bootstrap';
import Item from "../components/Item"
import PlusDropdown from "../components/PlusOptions";
import HomeDropdown from "../components/HomeDropdown";

const cardData = [
  { fileName: 'File 1', lastUpdated: '2022-02-05', isFolder: false },
  { fileName: 'Folder 1', lastUpdated: '2022-02-06', isFolder: true },
    { fileName: 'Folder 2', lastUpdated: '2022-02-07' , isFolder: true },
  { fileName: 'File 2', lastUpdated: '2022-02-05' , isFolder: false },
  { fileName: 'Folder 3', lastUpdated: '2022-02-06' , isFolder: true },
  { fileName: 'File 3', lastUpdated: '2022-02-06' , isFolder: false },

];

const HomePage = () => {
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home Page</title>
          <Header/>
          <Container style={{ marginTop: '20px' }}>
            <Row>
              <Col xs={2} md={1} id="sidebar-wrapper">
                <SideBar />
              </Col>
              <Col xs={12} md={9} id="page-content-wrapper">
                <h1>Main Content</h1>
                <PlusDropdown onSelect={handleOptionSelect} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '100px' }}>
                          {cardData.map((item, index) => (
                            <Item key={index} item={item} />
                            ))}
                        </div>
              </Col>
            </Row>
          </Container>
      <Footer/>
    </div>
  )
}
const handleOptionSelect = (selectedOption) => {
  // Handle the selected option
  console.log('Selected option:', selectedOption);
};

export default HomePage;