import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchData} from "./api/ApiInteraction";
import {BookDto} from "./api/BookDto";
import Diagram from "./diagram/Diagram";

function App() {
  const [shouldLoaded, setShouldLoaded] = useState(false)
  const [data, setData] = useState<BookDto[]>([])

  useEffect(() => {
    if (shouldLoaded) {
      fetchData().then(res => setData(res))
    } else {
      setData([])
    }
  }, [shouldLoaded]);

  return (
    <div className="App">
      <input
        style={{ width: '30px', height: '30px' }}
        type="checkbox"
        checked={shouldLoaded}
        onChange={() => setShouldLoaded(!shouldLoaded)}
      />
      {shouldLoaded && data?.length > 0 && (
        <Diagram data={data} />
      )}
    </div>
  );
}

export default App;
