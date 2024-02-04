import HomeDropdown from "../components/HomeDropdown";

  const TestPage = () => {
    const handleOptionSelect = (selectedOption) => {
      console.log('Selected option in home page:', selectedOption);
    };
  
    return (
      <div>
        <h1>Home Page</h1>
        <HomeDropdown onSelect={handleOptionSelect} />
      </div>
    );
  };
  
  export default TestPage;