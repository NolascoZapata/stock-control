const sortProdAz = (products, azName) => {
  if (azName === true) {
    products.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
    
    return products

  } else if (azName === false) {
    products.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    })
    return products

  }
}
const sortProdStock = (products, maxFirst) => {
  if (maxFirst === true) {
    products.sort(function (a, b) {
      return b.stock - a.stock;
    })
    return products
  } else if (maxFirst === false) {
    products.sort(function (a, b) {
      return a.stock - b.stock;
    })
    return products

  }
}

const filterCheckBox = (products)=>{
  let categoriesList=[]
  const categoriesCheck = document.querySelectorAll('.cat-checkbox')
  categoriesCheck.forEach(cat=> {
    categoriesList.push((cat.id.slice(16)).toLowerCase())
  })
  categoriesCheck.forEach(cat=>cat.onclick=()=>{
    if (cat.checked) {
      console.log(`categoria checkeada`);
    } else {
      
      console.log(`categoria no checkeada`);
      let noCheckprod= products.filter(prod=>prod.category===cat.id.slice(16).toLowerCase())
      console.log('noCheckprod',noCheckprod);
    }
  })

}
