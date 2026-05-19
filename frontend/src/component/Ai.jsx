import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from "../Context/shopContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Ai() {
  let {showSearch, setShowSearch} = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!speechRecognition) {
    console.log("Speech recognition not supported")
  }

  const startRecognition = () => {
    if (!speechRecognition) return
    
    const recognition = new speechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase()
      
      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("opening search")
        setShowSearch(true)
        navigate("/collection")
      }
      else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("closing search")
        setShowSearch(false)
      }
      else if (transcript.includes("collection") || transcript.includes("collections") || transcript.includes("product") || transcript.includes("products")) {
        speak("opening collection page")
        navigate("/collection")
      }
      else if (transcript.includes("about") || transcript.includes("aboutpage")) {
        speak("opening about page")
        navigate("/about")
        setShowSearch(false)
      }
      else if (transcript.includes("home") || transcript.includes("homepage")) {
        speak("opening home page")
        navigate("/")
        setShowSearch(false)
      }
      else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
        speak("opening your cart")
        navigate("/cart")
        setShowSearch(false)
      }
      else if (transcript.includes("contact")) {
        speak("opening contact page")
        navigate("/contact")
        setShowSearch(false)
      }
      else if (transcript.includes("order") || transcript.includes("myorders") || transcript.includes("orders") || transcript.includes("my order")) {
        speak("opening your orders page")
        navigate("/order")
        setShowSearch(false)
      }
      else {
        toast.error("Try Again")
      }
    }

    recognition.onend = () => {
      setActiveAi(false)
    }

    recognition.onerror = (e) => {
      console.log("Speech recognition error:", e)
      setActiveAi(false)
    }

    setActiveAi(true)
    try {
      recognition.start()
    } catch (err) {
      console.log("Recognition already started")
      setActiveAi(false)
    }
  }

  return (
    <div className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] " onClick={startRecognition}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? "translate-x-[10%] translate-y-[-10%] scale-125 " : "translate-x-[0] translate-y-[0] scale-100"} transition-transform` } style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
      }}/>
    </div>
  )
}

export default Ai