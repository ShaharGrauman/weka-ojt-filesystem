import React from 'react'
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
return (
     <Navbar bg="navbar" style={{ backgroundColor: '#EDEDED', padding: '0.8rem 4rem',position: 'fixed', top: 0, width: '100%' }} >
                  <img src="Image/logo.png" width={25} height={25} className="d-inline-block " alt="Your Logo"/>
                              <span className="ml-3 mr-2">File System</span>

    </Navbar>


    )
  }
export default Header





//     <div className="page-container" style={{ padding: '0rem 1.5rem' }}>
//         <link rel="stylesheet" href="./css/bootstrap.min.css" />
//         <link rel="stylesheet" href="./css/style.css" />
//         <meta charSet="UTF-8" />
//         <title>File System</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         {/* Link to Bootstrap CSS */}
//         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" />
//         <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
//
//         {/* Navbar */}
//       <Navbar className="navbar" style={{ backgroundColor: '#EDEDED' }}>
//             <img src="Image/logo.png" width={25} height={25} className="d-inline-block " alt="Your Logo" />
//             <span className="ml-3 mr-2">File System</span>
//       </Navbar>
//
//       </div>