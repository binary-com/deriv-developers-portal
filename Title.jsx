import React from "react"

const Title = ({ className, headerSize, children }) => {
  const Title = headerSize || "h1"
  return (
    <Title id="title" className={className}>
      {children}
    </Title>
  )
}

export default Title
