import { useState,useEffect, use } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import './App.css'
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import Editor from "react-simple-code-editor"
import axios from 'axios'
function App() {
  const [ review, setReview ] = useState(``)
  
  const [ code, setCode ] = useState(` function sum() {
    return 1 + 1
  }`)
  useEffect(() =>{
    prism.highlightAll()
  });
  async function reviewCode() {
    const response = await axios.post('http://localhost:5000/ai/get-response', { prompt:code})
    
    setReview(response.data)
  }
  return (
    <>
    <main>
      <div className="left">
        <div className="code">
        <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
        </div>
        <div  onClick={reviewCode} className="review" >review</div>
      </div>
      <div className="right">
      <Markdown

rehypePlugins={[ rehypeHighlight ]}

>{review}</Markdown>
      </div>
    </main>
      
    </>
  )
}

export default App
