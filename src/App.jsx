import { useState, useEffect } from 'react'
import { InputGroup, Form, Table, Button, Container } from "react-bootstrap";
import { nanoid } from 'nanoid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import Confetti from 'react-confetti';



const AppWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

function App() {

  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [confettiVisible, setConfettiVisible] = useState("");



const shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "Teknosa",
  },
  {
    id: 3,
    name: "Bim",
  },
];

const categories = [
  {
    id: 1,
    name: "Elektronik",
  },
  {
    id: 2,
    name: "Şarküteri",
  },
  {
    id: 3,
    name: "Oyuncak",
  },
  {
    id: 4,
    name: "Bakliyat",
  },
  {
    id: 5,
    name: "Fırın",
  },
];



  
  const handleAddProduct = () => {
    const newProduct = {
      id: nanoid(),
      name: productName,
      shop: shops.find((shop) => shop.id === selectedShop),
      category: categories.find((category) => category.id === selectedCategory),
      isBought: false,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setProductName('');
  };

  
  const handleToggleBought = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isBought: !product.isBought } : product
      )
    );
  };


  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  
  const showAlertWithConfetti = (message) => {
    setConfettiVisible(true);
    alert(message);
    setConfettiVisible(false);
  };


  useEffect(() => {
 
    const isShoppingCompleted = products.every((product) => product.isBought);
    if (isShoppingCompleted && products.length > 0) {
      showAlertWithConfetti('Alışveriş Tamamlandı!');
      setConfettiVisible(true);
      setTimeout(() => {
        setConfettiVisible(false);
      }, 3000); 
    }
  }, [products]);


  


  return (
    <>
   
      <Container>
        

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={confettiVisible ? 200 : 0}
        recycle={true}
      />
  
      <AppWrapper>
      
     
        <InputGroup className="mb-3 py-3">
          <InputGroup.Text id="basic-addon1">Ürün Adı</InputGroup.Text>
          <Form.Control
            placeholder="Ürün Giriniz..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </InputGroup>

     
        <Form.Select
          aria-label="Mağaza Seç"
          className='mb-2'
          value={selectedShop}
          onChange={(e) => setSelectedShop(parseInt(e.target.value))}
        >
          <option>MARKET</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </Form.Select>

   
        <Form.Select
          aria-label="Kategori Seç"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
        >
          <option>KATEGORİ</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>

        <Button  variant="primary mb-2 mt-2" onClick={handleAddProduct}>Ürünü Ekle</Button>

   
        <Table  striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün Adı</th>
              <th>Mağaza</th>
              <th>Kategori</th>
              <th>Satın Alındı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ textDecoration: product.isBought ? 'line-through' : 'none' }}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.shop.name}</td>
                <td>{product.category.name}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label=""
                    checked={product.isBought}
                    onChange={() => handleToggleBought(product.id)}
                  />
                </td>
                <td>
                  <Button  onClick={() => handleDeleteProduct(product.id)}>
                   <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AppWrapper>
      </Container>
    </>
  )
}

export default App





