'use client'

import React, { useState, useEffect } from 'react'

interface TextTypeProps {
  text: string
  typingSpeed?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  showCursor?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  textClassName?: string
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 80,
  pauseDuration = 5000,
  deletingSpeed = 50,
  loop = false,
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  textClassName = '',
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else if (loop) {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
      }
    } else if (loop) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
      } else {
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, text, typingSpeed, pauseDuration, deletingSpeed, loop])

  useEffect(() => {
    if (!showCursor) return
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [showCursor])

  return (
    <span className={textClassName}>
      {displayText}
      {showCursor && (
        <span className={`${cursorClassName} ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          {cursorCharacter}
        </span>
      )}
    </span>
  )
}

export default TextType
