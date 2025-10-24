const API_URL = import.meta.env.VITE_API_URL;



export async function testApi() {  




  try {
    const response = await fetch(`${API_URL}/`);

    if (!response.ok) {
      console.error('Ошибка ответа от сервера:', response.status, response.statusText);
      return;
    }



    const data = await response.json();
    console.log('Ответ от API:', data);

    
  } catch (error) {
    console.error('Ошибка запроса к API:', error.message);
  }
}
