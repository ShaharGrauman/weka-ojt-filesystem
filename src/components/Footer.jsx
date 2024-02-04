import React from 'react'


const Header = () => {
  return (
      <div>
        <link  href="./css/bootstrap.min.css" rel="stylesheet"/>
        <link  href="./css/style.css" rel="stylesheet" />
        <meta charSet="UTF-8" />
        <title>File System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Link to Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
        <footer className="footer text-center py-1" style={{ backgroundColor: '#EDEDED' }}>
          <p>© 2024 File System. All rights reserved.</p>
        </footer>

       </div>
  )
}

export default Header
