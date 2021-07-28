import React, { useEffect, useState } from 'react';
import { TwitterOutlined,RightOutlined } from '@ant-design/icons';
import '../App.scss';


const QuoteBox = () => {

  const [quote, setQuote] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      let result = await fetch("https://type.fit/api/quotes");
      result = await result.json();
      setQuote(result);
      setCurrentQuote(result[15])
    }
    fetchResults();
  }, [])

  function randomQuoteIndex() {
    return Math.floor((Math.random() * --quote.length) + 0)

  }

  return (
    <>

      {currentQuote &&
        (<div id="quote-box" className="animate__animated animate__flipInX">
          <div id="text">{currentQuote.text}</div>
          <div id="author">- {currentQuote.author ? currentQuote.author : 'Anonymous'}</div>
          <div id="controls">
            <a id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${currentQuote.text}" ${currentQuote.author ? currentQuote.author : 'Anonymous'}`} target="_blank" >
              <TwitterOutlined />
            </a>
            <button id="new-quote" onClick={() => {
              setCurrentQuote(quote[randomQuoteIndex()]);
            }}><RightOutlined /></button>

          </div>
        </div>)
      }


    </>
  )
}

export default QuoteBox