async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test base endpoint
    const baseResponse = await fetch('http://localhost:5000/');
    const baseData = await baseResponse.json();
    console.log('Base endpoint:', baseData);
    
    // Test products endpoint
    const productsResponse = await fetch('http://localhost:5000/api/customer/products');
    const productsData = await productsResponse.json();
    console.log('Products endpoint:', productsData);
    
    // Test categories endpoint
    const categoriesResponse = await fetch('http://localhost:5000/api/customer/products/categories');
    const categoriesData = await categoriesResponse.json();
    console.log('Categories endpoint:', categoriesData);
    
    console.log('API tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testAPI();