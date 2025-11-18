/**
 * Example usage of TTS API utility
 * This shows how to use the TTS API with HTTP/2 error handling
 */

import { generateTTS, generateTTSAsURL, generateTTSAndPlay } from './ttsApi';

// Example 1: Generate TTS and get blob
async function example1() {
  try {
    const text = '面接のご回答、ありがとうございます。あなたの回答からは、誠実さと意欲が伝わってきました。少し深く掘り下げられると、さらに説得力が増すと思います。';
    
    const audioBlob = await generateTTS(text, {
      model_id: 13,
      speaker_name: 'saionji',
      speaker_id: 2,
      language: 'EN', // or 'JP' for Japanese
    });

    // Use the blob (e.g., download, play, etc.)
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error('TTS generation failed:', error);
  }
}

// Example 2: Generate TTS and get URL directly
async function example2() {
  try {
    const text = '面接のご回答、ありがとうございます。';
    const audioUrl = await generateTTSAsURL(text);
    
    // Use in audio tag
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error('TTS generation failed:', error);
  }
}

// Example 3: Generate and play directly
async function example3() {
  try {
    const text = '面接のご回答、ありがとうございます。';
    const audio = await generateTTSAndPlay(text);
    await audio.play();
  } catch (error) {
    console.error('TTS generation failed:', error);
  }
}

// Example 4: React component usage
import { useState } from 'react';

export function TTSButton({ text }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlay = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const audio = await generateTTSAndPlay(text, {
        model_id: 13,
        speaker_name: 'saionji',
        speaker_id: 2,
        language: 'EN',
      });
      
      await audio.play();
    } catch (err) {
      setError(err.message);
      console.error('TTS Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handlePlay} 
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Play Audio'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}



