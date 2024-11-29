document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelector('.texts'); // Ensure this element exists in your HTML

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Set language for better recognition

  let p = document.createElement('p'); // Create initial paragraph element

  // Flag to track if the microphone is active
  let micActive = false;

  // Handle speech recognition results
  recognition.addEventListener('result', (e) => {
      const text = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

      p.innerText = text;
      texts.appendChild(p);

      if (e.results[0].isFinal) {
          p = document.createElement('p');
          p.classList.add('replay');

          if (text.includes('hello')) {
              p.innerText = '...';
          } else if (text.includes('what is your name') || text.includes("what's your name")) {
              p.innerText = 'I\'m Bard, your AI assistant. What\'s yours?';
          } else if (text.includes('open my youtube channel')) {
              p.innerText = 'Opening YouTube...';
              window.open('https://www.youtube.com'); // Use https for security
          } else {
              p.innerText = 'Sorry, I didn\'t understand that. Try saying it differently.';
          }

          texts.appendChild(p);
      }
  });

  // Automatically restart recognition when it ends
  recognition.addEventListener('end', () => {
      if (micActive) {
          recognition.start();
      }
  });

  // Handle button click to toggle microphone
  const micToggleButton = document.getElementById('mic-toggle');

  if (micToggleButton) { // Check if the button exists
      micToggleButton.addEventListener('click', () => {
          if (micActive) {
              recognition.stop();
              micToggleButton.innerText = 'Start Mic';
              micActive = false;
          } else {
              recognition.start();
              micToggleButton.innerText = 'Stop Mic';
              micActive = true;
          }
      });
  } else {
      console.error('Mic toggle button not found.');
  }
});
