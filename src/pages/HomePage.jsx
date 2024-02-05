import React from 'react'
import Cards from '../components/Cards'
import PlusDropdown from "../components/PlusOptions";
import HomeDropdown from "../components/HomeDropdown";

const HomePage = () => {

  return (

      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home Page</title>
  
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="Image/logo.png" width={25} height={25} className="d-inline-block " alt="Your Logo" />
            <span className="ml-3 mr-2">File System</span>
          </a>
        </nav>
        <div className="wrapper">
          <aside id="sidebar">
            <div className="d-flex">
              <button className="btn" type="button">
                <i className="lni lni-menu" />
              </button>
              <div className="sidebar-logo ml-2 mr-2">
                <a href="#">Home</a>
              </div>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <i className="lni lni-files" />
                  <span>My Files</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <i className="lni lni-share-alt" />
                  <span>Shared Files</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <i className="lni lni-trash-can" />
                  <span>Deleted Files</span>
                </a>
              </li>
            </ul>
            <div className="sidebar-footer">
              <a href="#" className="sidebar-link" data-toggle="modal" data-target="#exampleModal">
                <i className="lni lni-exit" />
                <span>Logout</span>
              </a>
            </div>
          </aside>
          <div className="main p-3">
            <div className="container">
              <div className="row">
                <div className="row mt-3">
                  <div className="col-1">
                  <PlusDropdown onSelect={handleOptionSelect} />
                  </div>
                  <div className="col-7">
                    <form className="d-flex">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-secondary" type="submit">
                        <i className="lni lni-search-alt" />
                      </button>
                    </form>
                  </div>
                  <div className="col-1">
                    <button type="button" className="btn btn-secondary ">
                      <i className="lni lni-text-align-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <h2>Path: jn/</h2>
              </div>
              <div className="row mt-4">
                <div className="row row-cols-1 row-cols-md-3">
                  <div className="col mb-3">
                    <div className="card">
                      <a className="card-block  text-decoration-none" href="show_file.html">
                        <div className="col-md-10 text-center stretched-link mt-2">
                          <i className="lni lni-empty-file fs-1" />
                        </div>
                      </a>
                      <div className="col-12 text-right">
                      <HomeDropdown onSelect={handleOptionSelect}  />

                      </div>
                      <div className="card-body">
                        <h5 className="card-title">HW2.py</h5>
                        <p className="card-text">last updated : 12/1/2024.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-3">
                    <div className="card">
                      <a className="card-block  text-decoration-none" href="show_file.html">
                        <div className="col-md-10 text-center  stretched-link mt-2">
                          <i className="lni lni-empty-file fs-1" />
                        </div>
                      </a>
                      <div className="col-12 text-right">
                      <HomeDropdown onSelect={handleOptionSelect}  />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">HW1.txt</h5>
                        <p className="card-text">last updated : 15/1/2024.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-3">
                    <div className="card">
                      <a className="card-block text-decoration-none" href="show_file.html">
                        <div className="col-md-10 text-center stretched-link mt-2">
                          <i className="lni lni-empty-file fs-1 " />
                        </div>
                      </a>
                      <div className="col-12 text-right">
                      <HomeDropdown onSelect={handleOptionSelect}  />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">photo.jpg</h5>
                        <p className="card-text">last updated : 12/1/2024.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-3">
                    <div className="card">
                      <a className="card-block text-decoration-none" href>
                        <div className="col-md-10 text-center stretched-link mt-2">
                          <i className="lni lni-folder fs-1" />
                        </div>
                      </a>
                      <div className="col-12 text-right">
                      <HomeDropdown onSelect={handleOptionSelect}  />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">project</h5>
                        <p className="card-text">last updated : 01/01/2024.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="fileDetailsModal" tabIndex={-1} role="dialog" aria-labelledby="fileDetailsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="fileDetailsModalLabel">File Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Owner:</strong> John Doe</p>
                <p><strong>Shared with:</strong></p>
                <ul>
                  <li>Jane Smith - view</li>
                  <li>Bob Johnson - edit</li>
                </ul>
                <p><strong>Required permissions:</strong> Viewers can download</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="moveModal" tabIndex={-1} role="dialog" aria-labelledby="moveModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="moveModalLabel">Move file to:</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="moveTo" id="picRadio" defaultValue="pic" />
                  <label className="form-check-label" htmlFor="picRadio">
                    <i className="fas fa-folder fs-5 fa-fw text-primary" /> pic
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="moveTo" id="tasksRadio" defaultValue="tasks" />
                  <label className="form-check-label" htmlFor="tasksRadio">
                    <i className="fas fa-folder fs-5 fa-fw text-primary" /> tasks
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Move</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to log out?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Log out</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div className="modal fade" id="upload" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onclick="this.style.display='none'">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload File</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">Choose file to upload:</label>
                  <input type="file" className="form-control" id="fileInput" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Upload</button>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div className="modal fade" id="create" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onclick="this.style.display='none'">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="exampleModalLabel">Create Folder</h5>
                <button type="button" className="close text-white" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="folderName" className="form-label">Folder Name:</label>
                  <input type="text" className="form-control" id="folderName" placeholder="Enter folder name" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" id="createFolder" data-bs-dismiss="modal">Create</button>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="text-center py-1" id="footer">
          <p>© 2024 File System. All rights reserved.</p>
        </footer>
        {/* Link to Bootstrap JS and Popper.js */}
        {/*  */}
       </div>
     );
    };
    

const handleOptionSelect = (selectedOption) => {
  // Handle the selected option
  console.log('Selected option:', selectedOption);
};

export default HomePage;







































