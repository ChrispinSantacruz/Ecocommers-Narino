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
  options?: string[]
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
    options: ["¿Cuáles son los métodos de pago?", "¿Hacen envíos?", "¿Qué plantas tienen disponibles?"],
  },
  {
    keywords: ["precio", "costo", "valor", "cuanto cuesta"],
    response: "Nuestras plantas tienen precios desde $15.000 hasta $75.000 dependiendo del tipo y tamaño.",
    options: ["¿Tienen descuentos?", "¿Cuánto cuesta el envío?", "¿Qué incluye el precio?"],
  },
  {
    keywords: ["envio", "entrega", "domicilio", "enviar"],
    response:
      "Realizamos envíos a toda Colombia. El tiempo de entrega es de 2-3 días hábiles y puedes elegir entre envío a domicilio o recoger en tienda.",
    options: ["¿Cuánto cuesta el envío?", "¿Puedo recoger en tienda?", "¿Qué pasa si mi planta llega dañada?"],
  },
  {
    keywords: ["pago", "tarjeta", "nequi", "pse", "solana", "ethereum", "eth", "crypto"],
    response: "Aceptamos pagos con tarjeta de crédito/débito, Nequi, PSE, Solana y Ethereum.",
    options: ["¿Cómo pagar con Nequi?", "¿Aceptan pagos en efectivo?", "¿Es seguro pagar en línea?"],
  },
  {
    keywords: ["cuidado", "cuidar", "riego", "luz", "sol", "agua"],
    response:
      "Cada planta tiene necesidades específicas de cuidado. Te recomendamos revisar la descripción detallada de cada producto donde encontrarás instrucciones de cuidado.",
    options: ["¿Cuánta agua necesita una planta?", "¿Qué plantas son de interior?", "¿Qué plantas necesitan más luz?"],
  },
  {
    keywords: ["garantia", "devolucion", "cambio", "reembolso"],
    response: "Ofrecemos garantía de 48 horas. Si tu planta llega en mal estado, la reemplazamos sin costo adicional.",
    options: ["¿Cómo funciona la garantía?", "¿Qué cubre la garantía?", "¿Cómo solicito un cambio?"]
  },
  {
    keywords: ["ubicacion", "direccion", "donde estan"],
    response: "Estamos ubicados en Pasto, Colombia. Puedes visitarnos en nuestra tienda física.",
    options: ["¿Cuál es el horario de atención?", "¿Cómo llegar a la tienda?", "¿Tienen otras sucursales?"]
  },
  {
    keywords: ["descuento", "promocion", "oferta"],
    response: "Actualmente tenemos un 10% de descuento en todas las plantas de interior. ¡Aprovecha ahora!",
    options: ["¿Cuánto dura la promoción?", "¿Qué productos están en descuento?", "¿Hay descuentos para clientes frecuentes?"]
  },
  {
    keywords: ["plagas", "insectos", "problemas", "enfermedades"],
    response: "Si tu planta tiene plagas, te recomendamos usar productos orgánicos específicos para controlarlas. Consulta con nosotros para más detalles.",
    options: ["¿Qué productos recomiendan?", "¿Cómo prevenir plagas?", "¿Qué hacer si mi planta está enferma?"]
  },
  {
    keywords: ["tierra", "sustrato", "fertilizante", "abono"],
    response: "Ofrecemos sustratos y fertilizantes ideales para cada tipo de planta. Encuéntralos en nuestra tienda.",
    options: ["¿Qué sustrato es mejor para mi planta?", "¿Con qué frecuencia debo fertilizar?", "¿Venden abono orgánico?"]
  },
  {
    keywords: ["regalo", "cumpleaños", "aniversario"],
    response: "Una planta es un regalo perfecto. Ofrecemos opciones de empaque especial para ocasiones especiales.",
    options: ["¿Qué plantas recomiendan para regalar?", "¿Tienen tarjetas de regalo?", "¿Puedo personalizar el empaque?"]
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

  const handleSendMessage = (message?: string) => {
    const userMessage = message || newMessage
    if (userMessage.trim() === "") return

    const userMessageObj: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessageObj])
    setNewMessage("")

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage)
      const botMessageObj: Message = {
        id: messages.length + 2,
        text: botResponse.response,
        sender: "bot",
        timestamp: new Date(),
        options: botResponse.options,
      }

      setMessages((prev) => [...prev, botMessageObj])

      if (botResponse.options.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: messages.length + 3,
            text: "Opciones:",
            sender: "bot",
            timestamp: new Date(),
            options: botResponse.options,
          },
        ])
      }
    }, 500)
  }

  const generateBotResponse = (userMessage: string): { response: string; options: string[] } => {
    const lowercaseMessage = userMessage.toLowerCase()

    for (const item of botResponses) {
      if (item.keywords.some((keyword) => lowercaseMessage.includes(keyword))) {
        return { response: item.response, options: item.options || [] }
      }
    }

    return { response: "Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más?", options: [] }
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
                            {message.options && (
                              <div className="mt-2 space-y-1">
                                {message.options.map((option, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => handleSendMessage(option)}
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            )}
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
