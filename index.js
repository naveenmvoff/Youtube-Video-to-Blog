// USe to convert Video to Audio file
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

// Set FFmpeg binary path
ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadAudio(youtubeURL, outputFileName) {
  try {
    // Validate the YouTube URL
    if (!ytdl.validateURL(youtubeURL)) {
      console.error('Invalid YouTube URL. Please check the URL and try again.');
      return;
    }

    console.log('Downloading audio from:', youtubeURL);

    // Create a readable stream from ytdl
    const stream = ytdl(youtubeURL, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25, // Increase buffer size to 32MB
    });

    // Use fluent-ffmpeg to process the audio
    ffmpeg(stream)
      .audioCodec('pcm_s16le') // Use WAV format codec
      .audioChannels(1)        // Set to mono audio
      .audioFrequency(16000)   // Set sample rate to 16kHz
      .on('start', () => {
        console.log('FFmpeg process started...');
      })
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.timemark}`);
      })
      .on('end', () => {
        console.log('Audio download and conversion completed!');
      })
      .on('error', (err) => {
        console.error('Error during FFmpeg processing:', err.message);
      })
      .save(outputFileName); // Save to the specified file
  } catch (error) {
    console.error('Error during download or conversion:', error.message);
  }
}

// Example usage
// const youtubeURL = 'https://youtu.be/2sVeyo2tYbE?si=5YM11gJpYYY6JT6r';
const youtubeURL = 'https://youtu.be/Zna8yoCuANA?si=XUr7dM_x9-u1FZdx';
const outputFileName = './output_audio.wav';

// Call the function
downloadAudio(youtubeURL, outputFileName);
