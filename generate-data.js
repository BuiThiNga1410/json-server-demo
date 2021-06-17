const { date } = require('faker');
const faker = require('faker');
const fs = require("fs");

//Set locale to use Vietnamese
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = []

  //loop and push category
  for (let i = 0; i < n; i++) {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };

    categoryList.push(category);
  }

  return categoryList;
}

const randomProductList = (categoryList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];
  const productList = [];

  //random data
  for (category of categoryList) {
    for( let i = 0; i < numberOfProduct; i++) {
      const product = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: +faker.commerce.price(),
        description: faker.commerce.productDescription(),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumbnaiUrl: faker.image.imageUrl(400, 400),
        categoryId: category.id
      }
      productList.push(product);
    }
  }
  return productList;
}
//IFFE

(() => {
  //random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  //prepare db
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Nga"
    }
  }

  //wwrite db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log("write data success");
  })
})()
