import {useEffect, useState} from 'react';
import './ProductMenu.css';
import axios from "axios";
import {Product} from "../../interfaces";


interface PropsInterface {
  productSelectHandler: (productIdList : string[]) => void
}
function ProductMenu(props : PropsInterface) {
  const [productsList, setProductsList] = useState<Product[]>( []);
  const [selectedProductsList, setSelectedProductsList] = useState<string[]>( []);


  useEffect(() => {
    axios.get('https://api.exchange.coinbase.com/products')
      .then(response => {
        const data = response.data.filter((it:Product) => it.id.includes('EUR'));
        data.sort((one:Product, two:Product) => (one.id > two.id ? 1 : -1));
        setProductsList(data);
      });
  }, [])

  const onClickHandler = (productId : string) => {
    const wasSelected = selectedProductsList.includes(productId);
    const selected = selectedProductsList.filter(it => it !== productId);
    if (!wasSelected) selected.push(productId)
    setSelectedProductsList(selected);
    props.productSelectHandler(selected);
  }

  const isSelected = (productId : string) => {
    return selectedProductsList.includes(productId);
  }

  return (
      <div className={"product-menu"}>
        {productsList.map(product =>
          <div key={product.id} className={"product-menu-item"} onClick={() => onClickHandler(product.id)}>
            <div className={"text-01"}>
              {product.id}
            </div>
            <input className={"checkbox"} type="checkbox" checked={isSelected(product.id)} readOnly={true}/>
          </div>
        )}
      </div>
  );
}

export default ProductMenu;
