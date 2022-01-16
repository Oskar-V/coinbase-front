import {useState} from 'react';
import './App.css';
import ProductMenu from "./components/ProductMenu/ProductMenu";
import ProductCandleChart from "./components/ProductCandleChart/ProductCandleChart";
import {SnackbarProvider} from 'notistack';
import Header from "./components/Header/Header";

function App() {
  const [selectedProductsIdList, setSelectedProductsIdList] = useState<string[]>([]);
  const [dataUpdateCount, setDataUpdateCount] = useState<number>(0);

  return (
    <SnackbarProvider>
      <Header dataUpdateCountHandler={() => {
        setDataUpdateCount(dataUpdateCount + 1)
      }}/>
      <div className={"app-body"}>
        <ProductMenu productSelectHandler={setSelectedProductsIdList}/>
        <div>
          {selectedProductsIdList.map(id => <ProductCandleChart key={id} productId={id} dataUpdateCount={dataUpdateCount}/>)}
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
