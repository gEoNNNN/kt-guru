import axios from 'axios';

const API_KEY = 'AIzaSyBqorJmCpLLlf4zPYIaQu3HCNpmrufIWIQ';
const CSE_ID = 'a268077d2792a4859';
async function fetchImageUrlByTitle(title: string): Promise<string | null> {
  const url = 'https://www.googleapis.com/customsearch/v1';

  const params = {
      q: title,
      key: API_KEY,
      cx: CSE_ID,
      searchType: 'image',
      num: 1  // Number of results. 1 means only the top result.
  };

  try {
      const response = await axios.get(url, { params });
      const results = response.data;

      if (results.items && results.items.length > 0) {
          return results.items[0].link;
      }
  } catch (error) {
      console.error('Error fetching image URL:', error);
  }

  return null;
}
console.log(fetchImageUrlByTitle("denis"))
