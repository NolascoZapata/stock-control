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

const filterCheckBox = () => {
  
  const categoriesCheck = document.querySelectorAll('.cat-checkbox')
  categoriesCheck.forEach(cat => {
    cat.addEventListener('change',e=>{
      const isChecked = e.target.checked
      if (isChecked) {
        let elements = document.getElementsByClassName(`category-tag-${e.target.value}`)
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          element.parentElement.style.display=''
          
        }
      
      } else {
        let elements = document.getElementsByClassName(`category-tag-${e.target.value}`)
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          element.parentElement.style.display='none'
          
        }
      }
    })
  })
}

