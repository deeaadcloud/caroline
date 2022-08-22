import React, { useEffect } from 'react';
// import Typography from '@material-ui/core/Typography';
// import {Typography, Slider} from "@material-ui/core"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import './App.css';
import data from './data/data.json'
import categories from './data/categories.json'






function App() {
  const dataState = data.data
  const categoriesState = categories
  const all = dataState.map((n, i) => ({
    value: n,
    item: {
      categories: categoriesState[i = n.category - 1 % categoriesState.length],
    }
  }));
  const [sortcategory, setSortCategory] = React.useState(all)
  const [allItems, setAllItem] = React.useState(all)
  const [order, setOrder] = React.useState("ASC")
  const [value, setValue] = React.useState([8, 1500])
  const [x, setX] = React.useState(false);



  const sorting = (col) => {
    if (order === "ASC") {
      // col = "name" & col = "price" два параметра отбора, при клике на button, мы определяем по какому параметру массива будет определяться сортировка
      if (col = "name") {
        // для col = "name" мы делаем примитивную сортировку по алфавиту которая находится ниже
        // сравнивая два оператора a, b мы понимаем что нам нужно сравнивать не все данные, которые в нем прописанны, а только имя, поэтому добавляем к оператору (а) значение value, где лежит уже знакомый нам name который как параметр прописан в col откуда мы его достаем и всю связь преобразовываем в строку для корректного чтения
        const sorted = [...sortcategory].sort((a, b) =>
          a.value[col].toUpperCase() < b.value[col].toUpperCase() ? 1 : -1)
        console.log()
        setSortCategory(sorted)
        setOrder("DSC")
      }
      else if (col = "price") {
        // здесь тоже самое делаем для цены, только через числовую сортировку
        const sorted = [...sortcategory].sort((a, b) => {
          return a.value[col].toUpperCase() - b.value[col].toUpperCase()
        })
        console.log(sorted)
        setSortCategory(sorted)
        setOrder("DSC")

      }
    }
    if (order === "DSC") {
      // и тоже самое для обратного порядка (от большего к меньшему, от Я до А)
      if (col = "name") {
        const sorted = [...sortcategory].sort((a, b) =>
          a.value[col].toLowerCase() > b.value[col].toLowerCase() ? 1 : -1)
        console.log(sorted)
        setSortCategory(sorted)
        setOrder("ASC")
      }
      else if (col = "price") {

        const sorted = [...sortcategory].sort((a, b) => {
          return b.value[col].toUpperCase() - a.value[col].toUpperCase()
        })
        console.log(sorted)
        setSortCategory(sorted)
        setOrder("ASC")

      }
    }
  }

  

  
  function sortByCategory(id) {
    if (id === 0) {
      setSortCategory(allItems)
    }
    else {
      let newSort = [...allItems].filter(item => item.value.category == id.id)
      setSortCategory(newSort)

    }
  }

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    setSortCategory(allItems) 
      const sortMoney = [...sortcategory].filter(item => {
        return item.value.price >= newValue[0] && item.value.price <= newValue[1]
      })
      setSortCategory(sortMoney)  
    console.log(sortMoney)
    

  };
  const soldCheckbox = ({ target: { checked } }) => {
    const start = 0
    const clientPrice = 500
    const sortClientMoney = [...sortcategory].filter(item => {
      return item.value.price >= start && item.value.price <= clientPrice
    })
    if(checked!=true){
      setSortCategory(allItems)
      
    }
    else{
      setSortCategory(sortClientMoney)
    }
    
    console.log(x, checked);
    setX(checked);
  };

  useEffect(() => {
    setSortCategory(sortcategory)
  }, [])
  useEffect(() => {
    setAllItem(allItems)
  }, [])
  return (
    <div className="App">
      <div className="main">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-lg-3">
              <div className="siderbar-section">
                <div className="sidebar-single-widget">
                  <h6 className="sidebar-title">Категории</h6>

                  <div className="sidebar-content">
                    <div className="recent-post">

                      <ul>
                        {categoriesState.map((id, name) => (
                          <li key={name} onClick={() => sortByCategory(id)} className="recent-post-list" >
                            <div className="post-content">
                              <a
                                // href={'/shop/cat/' + `${id.id}`}
                                className="post-link">{id.name}</a>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="check">

                      <input type="checkbox" checked={x} onChange={soldCheckbox} />
                      <h6>Доступные мне</h6>
                      </div>
                      
                      <h6>
                        Цена
                      </h6>

                      <Box sx={{
                        width: 250,
                        color: 'success.main'
                      }}>
                        <Slider
                          min={8}
                          max={1500}
                          value={value}
                          onChange={rangeSelector}
                          step={10}
                          valueLabelDisplay="auto"

                        />
                      </Box>

                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="blog-grid-wrapper">

                <div className="row">
                  <div className="offcanvas-cart-item-single ">
                    <h6 >Сортировка:</h6>
                    <a className='post-link' onClick={() => sorting("price")}>sortPrice</a>
                    <a className='post-link' onClick={() => sorting("name")}>sortName</a>
                  </div>

                  {sortcategory.map((id, index,) => (

                    <div key={index} className="col-md-6 col-12">

                      <div className="blog-feed-single">
                        <a href="/shop/10" className="blog-feed-img-link">
                          <img src={require(`./img/uploads_Shop/${id.value.id}/${id.value.file}`)} alt="" className="blog-feed-img" />
                        </a>
                        <div className="blog-feed-content">
                          <div className="blog-feed-post-meta">
                            <span>Стоимость: {id.value.price}</span><br />
                            <span>Категория: <a href={'/shop/cat/' + `${id.value.id}`}>{id.item.categories.name}</a> </span><br />
                          </div>
                          <h5 className="blog-feed-link"><a href={'/shop/' + `${id.value.id}`}>{id.value.name}</a></h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
}

export default App;
