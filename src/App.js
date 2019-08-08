import React, { useState, useEffect, useCallback } from 'react'

const TIME_OUT_MS = 3000
const DATA = {
  name: 'fred'
}

const visibleStyle = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: '100vh',
  width: '100vw',
  border: 'none',
  position: 'absolute',
  background: 'white'
}

const hiddenStyle = {
  top: '0',
  left: '0',
  height: '0',
  width: '0',
  border: 'none',
  position: 'absolute',
  overflow: 'hidden'
}

const PostForm = ({ setSubmitRef, data }) => {
  const dataElements = Object.keys(data).map((key, index) => (
    <input defaultValue={data[key]} key={`${key}-${index}`} name={key} />
  ))

  return (
    <form
      style={hiddenStyle}
      action="http://localhost:3030"
      method="post"
      target="output_frame">
      {dataElements}
      <button ref={setSubmitRef} />
    </form>
  )
}

const IframePanel = ({ show }) => {
  return (
    <iframe
      style={show ? visibleStyle : hiddenStyle}
      title="abc"
      name="output_frame"
      src=""
      id="output_frame"></iframe>
  )
}

function App() {
  const [shouldShow, setShouldShow] = useState(false)
  const [submitRef, setSubmitRef] = useState(undefined)

  const onClick = useCallback(() => {
    setShouldShow(true)
    submitRef.click()
  }, [submitRef])

  useEffect(() => {
    if (submitRef) {
      setTimeout(onClick, TIME_OUT_MS)
    }
  }, [onClick, submitRef])

  return (
    <>
      <IframePanel show={shouldShow} />

      <PostForm data={DATA} setSubmitRef={setSubmitRef} />

      <p>Will automagically submit after {TIME_OUT_MS / 1000} seconds</p>

      <button onClick={onClick}>Manually Submit</button>
    </>
  )
}

export default App
