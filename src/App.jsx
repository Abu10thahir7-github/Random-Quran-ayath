import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [verse, setVerse] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [uthmaniText, setUthmaniText] = useState('');

  // Base URL for audio files
  const BASE_AUDIO_URL = 'https://verses.quran.com/';

  // Fetch a random verse
  const fetchRandomVerse = async () => {
    try {
      const response = await axios.get('https://api.quran.com/api/v4/verses/random');
      console.log(response.data);
      setVerse(response.data.verse); // Assuming the verse data is in response.data.verse
      await ayath(response.data.verse.verse_key); // Fetch Uthmani text using the verse key
      await getAudio(response.data.verse.verse_key); // Get audio for the new verse
    } catch (error) {
      console.log('Error fetching verse:', error);
    }
  };

  useEffect(() => {
    fetchRandomVerse(); // Fetch a random verse once on mount
  }, []);

  const getAudio = async (verseKey) => {
    console.log("verse key" +verseKey);
    if (verseKey) {
      try {
        const response = await axios.get(`https://api.quran.com/api/v4/recitations/5/by_ayah/${verseKey}`);
        console.log(response.data);
        if (response.data.audio_files && response.data.audio_files.length > 0) {
          // Construct the full audio URL
          console.log(response);
          const relativeUrl = response.data.audio_files[0].url;
          const fullAudioUrl = BASE_AUDIO_URL + relativeUrl; // Combine base URL with relative URL
          setAudioUrl(fullAudioUrl); // Set the audio URL
          console.log(fullAudioUrl);
        }
      } catch (error) {
        console.log('Error fetching audio:', error);
      }
    }
  };

  const ayath = async (verseKey) => {
    try {
      const res = await axios.get('https://api.quran.com/api/v4/quran/verses/indopak');
      const versesData = res.data.verses; // Assuming verses are under 'verses' key in the response
      console.log(versesData);
      const matchedVerse = versesData.find(v => v.verse_key === verseKey);
      
      if (matchedVerse) {
        setUthmaniText(matchedVerse.text_indopak); // Set the Uthmani text
      } else {
        console.log('Verse not found in fetched data');
      }
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };
  
  return (
    <div className="App">
      {verse ? (
        <div>
          <h2>Verse Information</h2>
          <p><strong>Verse Number:</strong> {verse.verse_number}</p>
          <p><strong>Verse Key:</strong> {verse.verse_key}</p>
          <p><strong>Juz Number:</strong> {verse.juz_number}</p>
          <p><strong>Hizb Number:</strong> {verse.hizb_number}</p>
          <p><strong>Page Number:</strong> {verse.page_number}</p>
          <p><strong>Ruku Number:</strong> {verse.ruku_number}</p>
          <p><strong>Manzil Number:</strong> {verse.manzil_number}</p>
          <p><strong>Rub El Hizb Number:</strong> {verse.rub_el_hizb_number}</p>
          <p><strong>Sajdah Number:</strong> {verse.sajdah_number}</p>
          <button onClick={fetchRandomVerse}>Next</button> {/* Call fetchRandomVerse directly */}

          {audioUrl && (
            <div>
              <h3>Audio:</h3>
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {uthmaniText && (
            <div>
              <h3>Uthmani Text:</h3>
              <p>{uthmaniText}</p> {/* Display the Uthmani text */}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;