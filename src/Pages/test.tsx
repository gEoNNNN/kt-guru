import axios from 'axios';
import data from '../../src/assets/titles.json';

export default function Image() {
  const API_KEY = 'AIzaSyA5lAOdbrsjohJiDbOqMr7YWrZGKx2DigI';
  const CSE_ID = 'a268077d2792a4859';

  async function delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

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

    }

    return null;
  }

  async function fetchAllImages() {
    const images: { image: string | null }[] = [];

    for (let i = 0; i < 100; i++) {
        const imageUrl = await fetchImageUrlByTitle(data[i].title);
        images.push({ image: imageUrl });
    }

    // Convert the array to JSON format
    const jsonOutput = JSON.stringify(images, null, 2);
    console.log(jsonOutput);
  }

  fetchAllImages();
}
