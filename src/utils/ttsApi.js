/**
 * TTS API utility with HTTP/2 error handling and retry logic
 * Fixes: net::ERR_HTTP2_PROTOCOL_ERROR 200 (OK)
 */

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate TTS audio with retry logic and HTTP/2 error handling
 * 
 * @param {string} text - Text to convert to speech (can be URL encoded)
 * @param {Object} options - TTS API parameters
 * @returns {Promise<Blob>} - Audio blob
 */
export async function generateTTS(text, options = {}) {
  const {
    model_id = 13,
    speaker_name = 'saionji',
    speaker_id = 2,
    sdp_ratio = 0.2,
    noise = 0.6,
    noisew = 0.8,
    length = 1.0,
    language = 'EN',
    auto_split = true,
    split_interval = 0.5,
    assist_text_weight = 1,
    style = 'Neutral',
    style_weight = 5,
    pitch_scale = 1,
    intonation_scale = 1,
  } = options;

  // Build URL with parameters
  const baseUrl = 'https://api.tts-test.lumina-live-j.com/voice';
  const params = new URLSearchParams({
    model_id: model_id.toString(),
    speaker_name,
    speaker_id: speaker_id.toString(),
    sdp_ratio: sdp_ratio.toString(),
    noise: noise.toString(),
    noisew: noisew.toString(),
    length: length.toString(),
    language,
    auto_split: auto_split.toString(),
    split_interval: split_interval.toString(),
    assist_text_weight: assist_text_weight.toString(),
    style,
    style_weight: style_weight.toString(),
    pitch_scale: pitch_scale.toString(),
    intonation_scale: intonation_scale.toString(),
    text: typeof text === 'string' ? text : encodeURIComponent(text),
  });

  const url = `${baseUrl}?${params.toString()}`;

  // Retry logic with exponential backoff
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // Try with fetch first (uses HTTP/2 by default)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'audio/*',
        },
        // Add cache control to avoid stale connections
        cache: 'no-cache',
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Get the audio blob
      const blob = await response.blob();

      // Verify we got audio data
      if (!blob || blob.size === 0) {
        throw new Error('Empty audio response');
      }

      return blob;

    } catch (error) {
      const isHttp2Error = error.message.includes('HTTP2_PROTOCOL_ERROR') || 
                          error.message.includes('ERR_HTTP2_PROTOCOL_ERROR') ||
                          error.name === 'TypeError' && error.message.includes('Failed to fetch');

      // If it's an HTTP/2 error and we have retries left, try HTTP/1.1 fallback
      if (isHttp2Error && attempt < MAX_RETRIES - 1) {
        console.warn(`HTTP/2 error on attempt ${attempt + 1}, trying HTTP/1.1 fallback...`);
        
        try {
          // Force HTTP/1.1 by using XMLHttpRequest or axios
          const audioBlob = await fetchWithHttp1(url);
          return audioBlob;
        } catch (http1Error) {
          console.warn(`HTTP/1.1 fallback also failed:`, http1Error);
          // Continue to retry with exponential backoff
        }
      }

      // If this is the last attempt, throw the error
      if (attempt === MAX_RETRIES - 1) {
        throw new Error(`TTS API failed after ${MAX_RETRIES} attempts: ${error.message}`);
      }

      // Exponential backoff: wait before retrying
      const delay = RETRY_DELAY * Math.pow(2, attempt);
      console.log(`Retrying in ${delay}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await sleep(delay);
    }
  }
}

/**
 * Fetch using HTTP/1.1 as fallback (using XMLHttpRequest)
 * This bypasses HTTP/2 protocol issues
 */
function fetchWithHttp1(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Accept', 'audio/*');

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (xhr.response && xhr.response.size > 0) {
          resolve(xhr.response);
        } else {
          reject(new Error('Empty audio response from HTTP/1.1 fallback'));
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function() {
      reject(new Error('Network error in HTTP/1.1 fallback'));
    };

    xhr.ontimeout = function() {
      reject(new Error('Request timeout in HTTP/1.1 fallback'));
    };

    xhr.timeout = 30000; // 30 second timeout
    xhr.send();
  });
}

/**
 * Generate TTS and return as audio URL (for use in <audio> tag)
 * 
 * @param {string} text - Text to convert to speech
 * @param {Object} options - TTS API parameters
 * @returns {Promise<string>} - Object URL for the audio blob
 */
export async function generateTTSAsURL(text, options = {}) {
  const blob = await generateTTS(text, options);
  return URL.createObjectURL(blob);
}

/**
 * Generate TTS and play it directly
 * 
 * @param {string} text - Text to convert to speech
 * @param {Object} options - TTS API parameters
 * @returns {Promise<HTMLAudioElement>} - Audio element that can be played
 */
export async function generateTTSAndPlay(text, options = {}) {
  const audioUrl = await generateTTSAsURL(text, options);
  const audio = new Audio(audioUrl);
  
  // Clean up object URL when audio finishes
  audio.addEventListener('ended', () => {
    URL.revokeObjectURL(audioUrl);
  });

  return audio;
}



