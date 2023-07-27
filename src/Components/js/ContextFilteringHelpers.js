

export default function reorganizeByCategory(products) {
    const [ProductArray] = products;
    const categorizedProducts = [];
  
    for (const product of ProductArray) {
      const { id_category, category_name } = product;
  
      // Buscar la categoría en el array clasificado
      const existingCategory = categorizedProducts.find(
        (category) => category.category_name === category_name
      );
  
      if (existingCategory) {
        existingCategory.products.push(product);
      } else {
        // Crear una nueva categoría
        categorizedProducts.push({
          category_name,
          products: [product],
        });
      }
    }
    
    return categorizedProducts;
  }


//funcion para filtrar un array y devolver los 10 productos mas vendidos

function getTop10MostSoldProducts(products) {
  // Primero, ordenamos el array de productos en orden descendente según la cantidad vendida (sold).
  products.sort((a, b) => b.sold - a.sold);

  // Luego, tomamos los primeros 10 productos del array ordenado.
  const top10MostSoldProducts = products.slice(0, 10);

  return top10MostSoldProducts;
 
}



//funcion para filtrar un array y devolver los 10 productos mas nuevos
function getTop10NewProducts(products) {
  // Sort the products based on the "date" in descending order (assuming the date is in a valid format)
  const sortedProducts = products.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the first 10 products from the sorted list
  const top10NewProducts = sortedProducts.slice(0, 10);

  return top10NewProducts;
}





//funcion para reorganizar el array  y dejar la categoria pasada por parametro de primera
// Función para reorganizar el orden de los objetos en el array
function reorganizeArrayByCategoryAndMoveUp(products, categoryName) {

  let productsArray = products.slice();
  // Find the index of the category in the array
  const categoryIndex = productsArray.findIndex(product => product.category === categoryName);

  // If the category exists in the array, move it to the beginning
  if (categoryIndex !== -1) {
    // Extract the category object
    const category = productsArray.splice(categoryIndex, 1)[0];

    // Add the category object and its products to the beginning of the array
    productsArray.unshift(category);
  }

  return productsArray;

}

export {getTop10MostSoldProducts, getTop10NewProducts, reorganizeArrayByCategoryAndMoveUp}








