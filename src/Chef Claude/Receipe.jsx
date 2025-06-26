import React from 'react'
import Markdown from 'react-markdown'

function Receipe(props) {
    console.log(props.response);
  return (
    <section className='receipe-section' aria-live='polite'>
        {props.response?<h2 className='ayuh2'>AyuConnect Recommends:</h2>:null}
        <Markdown>{props.response}</Markdown>
      </section>
  )
}

export default Receipe
