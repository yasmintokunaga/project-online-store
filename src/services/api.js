export async function getCategories() {
  const APICategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(APICategories);
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const APICategoriesQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(APICategoriesQuery);
  const categoriesQuery = await response.json();
  return categoriesQuery;
}

export async function getProductById(productId) {
  const APIid = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(APIid);
  const productDetails = await response.json();
  return productDetails;
}
