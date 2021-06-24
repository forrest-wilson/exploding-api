import axios from 'axios';
import FormData from 'form-data';

const getEndpoint = 'https://quotes.rest/qod';

const postEndpoint = 'https://www.thiswebsitewillselfdestruct.com/api/send_letter';

const timeoutInMilliseconds = 1000;

// Send a request

async function getRandomMessage() {
  // Set up request

  const { data: { contents: { quotes } } } = await axios.get(getEndpoint);
  
  const title = quotes[0].title
  const quote = quotes[0].quote
  const author = quotes[0].author

  const formattedQuote = `
    ${title},

    ${quote}

    -- ${author}
  `

  const formData = new FormData();

  formData.append('body', formattedQuote)

  const request = await axios.post(postEndpoint, formData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    }
  })
  
  console.log(`${request.data.code}:`, `Posted at ${new Date().toLocaleDateString()}`)

  setTimeout(() => {
    getRandomMessage()
  }, timeoutInMilliseconds)
}

getRandomMessage()