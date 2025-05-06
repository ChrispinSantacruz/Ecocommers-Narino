"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, ChevronDown, ChevronUp, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "¡Hola! Soy el asistente virtual de Ecocommers Nariño. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const botResponses = [
  {
    keywords: ["hola", "buenos dias", "buenas tardes", "saludos"],
    response: "¡Hola! ¿En qué puedo ayudarte con nuestras plantas?",
  },
  {
    keywords: ["precio", "costo", "valor", "cuanto cuesta"],
    response: "Nuestras plantas tienen precios desde $15.000 hasta $75.000 dependiendo del tipo y tamaño.",
  },
  {
    keywords: ["envio", "entrega", "domicilio", "enviar"],
    response:
      "Realizamos envíos a toda Colombia. El tiempo de entrega es de 2-3 días hábiles y puedes elegir entre envío a domicilio o recoger en tienda.",
  },
  {
    keywords: ["pago", "tarjeta", "nequi", "pse", "solana", "ethereum", "eth", "crypto"],
    response: "Aceptamos pagos con tarjeta de crédito/débito, Nequi, PSE, Solana y Ethereum.",
  },
  {
    keywords: ["cuidado", "cuidar", "riego", "luz", "sol", "agua"],
    response:
      "Cada planta tiene necesidades específicas de cuidado. Te recomendamos revisar la descripción detallada de cada producto donde encontrarás instrucciones de cuidado.",
  },
  {
    keywords: ["interior", "exterior", "jardin", "casa", "apartamento"],
    response: "Tenemos plantas tanto para interior como exterior. Puedes filtrar por categoría en nuestra tienda.",
  },
  {
    keywords: ["garantia", "devolucion", "cambio", "reembolso"],
    response: "Ofrecemos garantía de 48 horas. Si tu planta llega en mal estado, la reemplazamos sin costo adicional.",
  },
  {
    keywords: ["contacto", "telefono", "email", "correo", "whatsapp"],
    response: "Puedes contactarnos al correo info@ecocommers-narino.com o al teléfono 300-123-4567.",
  },
]

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: generateBotResponse(newMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()

    // Check for keyword matches
    for (const item of botResponses) {
      if (item.keywords.some((keyword) => lowercaseMessage.includes(keyword))) {
        return item.response
      }
    }

    // Default response if no keywords match
    return "Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más sobre nuestras plantas o servicios?"
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div
          className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out mb-2 w-72 border border-green-200 ${
            isMinimized ? "h-12" : "h-[400px]"
          }`}
        >
          <div className="bg-green-600 text-white p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <h3 className="font-medium text-sm">Asistente Ecocommers</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-white hover:text-white hover:bg-green-700"
                onClick={toggleMinimize}
              >
                {isMinimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-white hover:text-white hover:bg-green-700"
                onClick={toggleChat}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="h-[320px] p-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-2 ${
                          message.sender === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && (
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="bg-green-100 text-green-800">
                                <Leaf className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="text-xs">{message.text}</p>
                            <p
                              className={`text-[10px] mt-1 ${
                                message.sender === "user" ? "text-green-100" : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-2 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-1"
                >
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 text-xs h-8"
                  />
                  <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700 h-8 w-8">
                    <Send className="h-3 w-3" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      <Button
        onClick={toggleChat}
        className={`rounded-full w-10 h-10 flex items-center justify-center ${
          isOpen ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        <Leaf className="h-5 w-5" />
      </Button>
    </div>
  )
}
