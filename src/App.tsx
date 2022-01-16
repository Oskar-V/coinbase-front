import React, {useState} from 'react';
import './App.css';
import ProductMenu from "./components/ProductMenu/ProductMenu";
import ProductCandleChart from "./components/ProductCandleChart/ProductCandleChart";
import {SnackbarProvider} from 'notistack';

function App() {
  const [selectedProductsIdList, setSelectedProductsIdList] = useState<string[]>([]);

  return (
    <SnackbarProvider>
      <div className="App">
        <ProductMenu productSelectHandler={setSelectedProductsIdList}/>
        <div>
          {selectedProductsIdList.map(id => <ProductCandleChart key={id} productId={id}/>)}
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
