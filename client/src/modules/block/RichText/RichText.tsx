import React from 'react'

const RichText = ({ text, annotations, href }) => {
  const { bold, italic } = annotations
  return (
    <span>
      {text}
    </span>
  )
}

export default RichText