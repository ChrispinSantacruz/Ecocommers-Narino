"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Leaf, Search, ShoppingCart, Filter, X, MapPin, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMobile } from "@/hooks/use-mobile"

// Datos de plantas
const plantasData = [
  {
    id: 1,
    nombre: "Helecho Nariñense",
    precio: 25000,
    categoria: "Interior",
    descripcion: "Helecho nativo de la región de Nariño, perfecto para ambientes húmedos y con poca luz.",
    cuidados: "Riego moderado, luz indirecta, ambiente húmedo.",
    imagen: "/placeholder.svg?height=300&width=300&text=Helecho",
    vendedor: "Vivero El Paraíso",
    ubicacion: "Pasto, Nariño",
  },
  {
    id: 2,
    nombre: "Orquídea de Páramo",
    precio: 45000,
    categoria: "Interior",
    descripcion: "Hermosa orquídea que crece en los páramos de Nariño, con flores duraderas y coloridas.",
    cuidados: "Riego escaso, luz indirecta brillante, sustrato especial para orquídeas.",
    imagen: "/placeholder.svg?height=300&width=300&text=Orquídea",
    vendedor: "Orquídeas del Sur",
    ubicacion: "Ipiales, Nariño",
  },
  {
    id: 3,
    nombre: "Suculenta Andina",
    precio: 18000,
    categoria: "Interior",
    descripcion: "Suculenta resistente adaptada a climas fríos, ideal para principiantes.",
    cuidados: "Riego escaso, luz directa, sustrato bien drenado.",
    imagen: "/placeholder.svg?height=300&width=300&text=Suculenta",
    vendedor: "Vivero Botánico",
    ubicacion: "Túquerres, Nariño",
  },
  {
    id: 4,
    nombre: "Bromelia Tropical",
    precio: 35000,
    categoria: "Interior",
    descripcion: "Planta tropical con hojas coloridas y una flor central espectacular.",
    cuidados: "Mantener agua en el centro de la roseta, luz indirecta brillante.",
    imagen: "/placeholder.svg?height=300&width=300&text=Bromelia",
    vendedor: "Jardines del Pacífico",
    ubicacion: "Tumaco, Nariño",
  },
  {
    id: 5,
    nombre: "Palma de Salón",
    precio: 60000,
    categoria: "Interior",
    descripcion: "Elegante palma que aporta un toque tropical a cualquier espacio interior.",
    cuidados: "Riego moderado, luz indirecta, limpiar hojas regularmente.",
    imagen: "/placeholder.svg?height=300&width=300&text=Palma",
    vendedor: "Vivero El Paraíso",
    ubicacion: "Pasto, Nariño",
  },
  {
    id: 6,
    nombre: "Cactus Columnar",
    precio: 22000,
    categoria: "Exterior",
    descripcion: "Cactus de crecimiento vertical, perfecto para jardines de bajo mantenimiento.",
    cuidados: "Riego muy escaso, luz directa, proteger de heladas.",
    imagen: "/placeholder.svg?height=300&width=300&text=Cactus",
    vendedor: "Cactus y Suculentas",
    ubicacion: "La Unión, Nariño",
  },
  {
    id: 7,
    nombre: "Lavanda Nariñense",
    precio: 15000,
    categoria: "Exterior",
    descripcion: "Aromática lavanda adaptada al clima de Nariño, atrae polinizadores.",
    cuidados: "Riego moderado, pleno sol, podar después de floración.",
    imagen: "/placeholder.svg?height=300&width=300&text=Lavanda",
    vendedor: "Aromáticas del Sur",
    ubicacion: "Buesaco, Nariño",
  },
  {
    id: 8,
    nombre: "Begonia Rex",
    precio: 28000,
    categoria: "Interior",
    descripcion: "Begonia de hojas decorativas con patrones y colores únicos.",
    cuidados: "Riego cuando el sustrato esté seco, luz indirecta, ambiente húmedo.",
    imagen: "/placeholder.svg?height=300&width=300&text=Begonia",
    vendedor: "Vivero Botánico",
    ubicacion: "Túquerres, Nariño",
  },
  {
    id: 9,
    nombre: "Árbol de Jade",
    precio: 32000,
    categoria: "Interior",
    descripcion: "Planta suculenta de fácil cuidado que simboliza prosperidad y buena suerte.",
    cuidados: "Riego escaso, luz brillante, sustrato bien drenado.",
    imagen: "/placeholder.svg?height=300&width=300&text=Jade",
    vendedor: "Cactus y Suculentas",
    ubicacion: "La Unión, Nariño",
  },
  {
    id: 10,
    nombre: "Ficus Lyrata",
    precio: 75000,
    categoria: "Interior",
    descripcion: "Planta de interior con grandes hojas en forma de violín, muy decorativa.",
    cuidados: "Riego moderado, luz indirecta brillante, evitar corrientes de aire.",
    imagen: "/placeholder.svg?height=300&width=300&text=Ficus",
    vendedor: "Jardines del Pacífico",
    ubicacion: "Tumaco, Nariño",
  },
]

export default function MarketplacePage() {
  const isMobile = useMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [cart, setCart] = useState<Array<{ planta: (typeof plantasData)[0]; cantidad: number }>>([])
  const [selectedPlant, setSelectedPlant] = useState<(typeof plantasData)[0] | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("tarjeta")
  const [deliveryMethod, setDeliveryMethod] = useState<string>("envio")
  const [shippingInfo, setShippingInfo] = useState({
    nombre: "",
    documento: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  // Filtrar plantas
  const filteredPlantas = plantasData.filter((planta) => {
    const matchesSearch =
      planta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planta.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planta.vendedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planta.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? planta.categoria === selectedCategory : true
    const matchesPrice = planta.precio >= priceRange[0] && planta.precio <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Agregar al carrito
  const addToCart = (planta: (typeof plantasData)[0]) => {
    const existingItem = cart.find((item) => item.planta.id === planta.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.planta.id === planta.id ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      setCart([...cart, { planta, cantidad: 1 }])
    }
  }

  // Eliminar del carrito
  const removeFromCart = (plantaId: number) => {
    setCart(cart.filter((item) => item.planta.id !== plantaId))
  }

  // Actualizar cantidad
  const updateQuantity = (plantaId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(plantaId)
      return
    }

    setCart(cart.map((item) => (item.planta.id === plantaId ? { ...item, cantidad: newQuantity } : item)))
  }

  // Calcular total
  const cartTotal = cart.reduce((total, item) => total + item.planta.precio * item.cantidad, 0)

  // Generar recibo
  const generateReceipt = () => {
    // Validar formulario
    const errors: Record<string, boolean> = {}
    let isValid = true

    // Validar campos obligatorios
    Object.entries(shippingInfo).forEach(([key, value]) => {
      if (
        !value &&
        (deliveryMethod === "envio" ||
          (deliveryMethod === "recoger" && ["nombre", "documento", "telefono", "email"].includes(key)))
      ) {
        errors[key] = true
        isValid = false
      }
    })

    if (!isValid) {
      setFormErrors(errors)
      return
    }

    setShowReceipt(true)
    setShowCheckout(false)
  }

  // Finalizar compra
  const checkout = () => {
    setShowCheckout(true)
  }

  // Limpiar carrito después de compra
  const finishPurchase = () => {
    setCart([])
    setShowReceipt(false)
    setShowCheckout(false)
    setShippingInfo({
      nombre: "",
      documento: "",
      direccion: "",
      ciudad: "",
      telefono: "",
      email: "",
    })
    setFormErrors({})
  }

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error cuando el usuario escribe
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800">Ecocommers Nariño</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar plantas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                    {cart.reduce((total, item) => total + item.cantidad, 0)}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Carrito de Compras</DrawerTitle>
              </DrawerHeader>
              <div className="px-4">
                {cart.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Tu carrito está vacío</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="#productos">Explorar Plantas</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.planta.id} className="flex items-center gap-4 py-2">
                        <Image
                          src={item.planta.imagen || "/placeholder.svg"}
                          width={60}
                          height={60}
                          alt={item.planta.nombre}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.planta.nombre}</h4>
                          <p className="text-sm text-muted-foreground">${item.planta.precio.toLocaleString("es-CO")}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Store className="h-3 w-3" /> {item.planta.vendedor}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.planta.id, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <span>{item.cantidad}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.planta.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.planta.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${cartTotal.toLocaleString("es-CO")}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={checkout}>
                      Finalizar Compra
                    </Button>
                  </div>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="md:hidden container py-2 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar plantas..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Categoría</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="interior"
                        checked={selectedCategory === "Interior"}
                        onCheckedChange={() => setSelectedCategory(selectedCategory === "Interior" ? null : "Interior")}
                      />
                      <Label htmlFor="interior">Interior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exterior"
                        checked={selectedCategory === "Exterior"}
                        onCheckedChange={() => setSelectedCategory(selectedCategory === "Exterior" ? null : "Exterior")}
                      />
                      <Label htmlFor="exterior">Exterior</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Precio</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="precio1"
                        checked={priceRange[0] === 0 && priceRange[1] === 30000}
                        onCheckedChange={() => setPriceRange([0, 30000])}
                      />
                      <Label htmlFor="precio1">Hasta $30.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="precio2"
                        checked={priceRange[0] === 30000 && priceRange[1] === 60000}
                        onCheckedChange={() => setPriceRange([30000, 60000])}
                      />
                      <Label htmlFor="precio2">$30.000 - $60.000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="precio3"
                        checked={priceRange[0] === 60000 && priceRange[1] === 100000}
                        onCheckedChange={() => setPriceRange([60000, 100000])}
                      />
                      <Label htmlFor="precio3">Más de $60.000</Label>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setSelectedCategory(null)
                    setPriceRange([0, 100000])
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-800">Nuestras Plantas</h1>
            <div className="flex items-center gap-4">
              <div className="space-x-2">
                <Button
                  variant={selectedCategory === "Interior" ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === "Interior" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedCategory(selectedCategory === "Interior" ? null : "Interior")}
                >
                  Interior
                </Button>
                <Button
                  variant={selectedCategory === "Exterior" ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === "Exterior" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedCategory(selectedCategory === "Exterior" ? null : "Exterior")}
                >
                  Exterior
                </Button>
              </div>
              <div className="space-x-2">
                <Button
                  variant={priceRange[1] === 30000 ? "default" : "outline"}
                  size="sm"
                  className={priceRange[1] === 30000 ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setPriceRange([0, 30000])}
                >
                  Hasta $30.000
                </Button>
                <Button
                  variant={priceRange[0] === 30000 && priceRange[1] === 60000 ? "default" : "outline"}
                  size="sm"
                  className={
                    priceRange[0] === 30000 && priceRange[1] === 60000 ? "bg-green-600 hover:bg-green-700" : ""
                  }
                  onClick={() => setPriceRange([30000, 60000])}
                >
                  $30.000 - $60.000
                </Button>
                <Button
                  variant={priceRange[0] === 60000 ? "default" : "outline"}
                  size="sm"
                  className={priceRange[0] === 60000 ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setPriceRange([60000, 100000])}
                >
                  Más de $60.000
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div id="productos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlantas.length > 0 ? (
            filteredPlantas.map((planta) => (
              <Card key={planta.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={planta.imagen || "/placeholder.svg"}
                      fill
                      alt={planta.nombre}
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">{planta.categoria}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{planta.nombre}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{planta.descripcion}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Store className="h-3 w-3" />
                    <span>{planta.vendedor}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{planta.ubicacion}</span>
                  </div>
                  <p className="font-bold text-lg mt-2">${planta.precio.toLocaleString("es-CO")}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1" onClick={() => setSelectedPlant(planta)}>
                        Detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      {selectedPlant && (
                        <>
                          <DialogHeader>
                            <DialogTitle>{selectedPlant.nombre}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="relative h-60 w-full">
                              <Image
                                src={selectedPlant.imagen || "/placeholder.svg"}
                                fill
                                alt={selectedPlant.nombre}
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">Descripción</h3>
                              <p className="text-sm text-muted-foreground">{selectedPlant.descripcion}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">Cuidados</h3>
                              <p className="text-sm text-muted-foreground">{selectedPlant.cuidados}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">Vendedor</h3>
                              <div className="flex items-center gap-2 text-sm">
                                <Store className="h-4 w-4 text-green-600" />
                                <span>{selectedPlant.vendedor}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-green-600" />
                                <span>{selectedPlant.ubicacion}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-lg">${selectedPlant.precio.toLocaleString("es-CO")}</p>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  addToCart(selectedPlant)
                                }}
                              >
                                Añadir al Carrito
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => addToCart(planta)}>
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No se encontraron plantas que coincidan con tu búsqueda.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                  setPriceRange([0, 100000])
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Recibo de Compra</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 p-2">
              <div className="flex flex-col items-center text-center border-b pb-4">
                <Leaf className="h-8 w-8 text-green-600" />
                <h2 className="text-xl font-bold text-green-800">Ecocommers Nariño</h2>
                <p className="text-sm text-muted-foreground">Marketplace de Plantas</p>
                <p className="text-sm">Fecha: {new Date().toLocaleDateString()}</p>
                <p className="text-sm">
                  No. Orden:{" "}
                  {Math.floor(Math.random() * 1000000)
                    .toString()
                    .padStart(6, "0")}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Detalles de la Compra</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.planta.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.planta.nombre}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                        <p className="text-xs text-muted-foreground">Vendedor: {item.planta.vendedor}</p>
                        <p className="text-xs text-muted-foreground">Ubicación: {item.planta.ubicacion}</p>
                      </div>
                      <p className="font-medium">${(item.planta.precio * item.cantidad).toLocaleString("es-CO")}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${cartTotal.toLocaleString("es-CO")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Información de Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Nombre:</p>
                    <p>{shippingInfo.nombre}</p>
                  </div>
                  <div>
                    <p className="font-medium">Documento:</p>
                    <p>{shippingInfo.documento}</p>
                  </div>
                  <div>
                    <p className="font-medium">Teléfono:</p>
                    <p>{shippingInfo.telefono}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>{shippingInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Método de Entrega</h3>
                <p className="text-sm">{deliveryMethod === "envio" ? "Envío a domicilio" : "Recoger en tienda"}</p>
                {deliveryMethod === "envio" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                    <div>
                      <p className="font-medium">Dirección:</p>
                      <p>{shippingInfo.direccion}</p>
                    </div>
                    <div>
                      <p className="font-medium">Ciudad:</p>
                      <p>{shippingInfo.ciudad}</p>
                    </div>
                  </div>
                )}
                {deliveryMethod === "recoger" && (
                  <div className="text-sm mt-2">
                    <p>
                      Por favor recoja sus productos en las ubicaciones de cada vendedor indicadas en el detalle de la
                      compra.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Método de Pago</h3>
                <p className="text-sm">
                  {paymentMethod === "tarjeta" && "Tarjeta de Crédito/Débito"}
                  {paymentMethod === "nequi" && "Nequi"}
                  {paymentMethod === "pse" && "PSE"}
                  {paymentMethod === "solana" && "Solana"}
                  {paymentMethod === "eth" && "Ethereum"}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Información de Envío</h3>
                <p className="text-sm">
                  {deliveryMethod === "envio"
                    ? "Tu pedido será enviado en los próximos 2-3 días hábiles. Recibirás un correo electrónico con los detalles de seguimiento."
                    : "Tus productos estarán disponibles para recoger en 24 horas. Por favor presenta tu documento de identidad y número de orden."}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Política de Devoluciones</h3>
                <p className="text-sm">
                  Si tu planta llega en mal estado, tienes 48 horas para notificarnos y procederemos con el reemplazo
                  sin costo adicional.
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm">¡Gracias por tu compra!</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={finishPurchase}>
                  Finalizar
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-6 p-2">
              <div className="space-y-4">
                <h3 className="font-medium">Resumen de la Compra</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.planta.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.planta.nombre}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                        <p className="text-xs text-muted-foreground">Vendedor: {item.planta.vendedor}</p>
                        <p className="text-xs text-muted-foreground">Ubicación: {item.planta.ubicacion}</p>
                      </div>
                      <p className="font-medium">${(item.planta.precio * item.cantidad).toLocaleString("es-CO")}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${cartTotal.toLocaleString("es-CO")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Método de Entrega</h3>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="envio" id="envio" />
                    <Label htmlFor="envio">Envío a domicilio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recoger" id="recoger" />
                    <Label htmlFor="recoger">Recoger en tienda</Label>
                  </div>
                </RadioGroup>

                {deliveryMethod === "recoger" && (
                  <div className="p-4 bg-green-50 rounded-lg text-sm">
                    <p className="font-medium text-green-800">Información de recogida:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-green-700">
                      {cart.map((item) => (
                        <li key={item.planta.id}>
                          {item.planta.nombre}: {item.planta.vendedor} - {item.planta.ubicacion}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-green-800">
                      Deberás presentar tu documento de identidad al recoger tus productos.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="flex items-center">
                      Nombre completo <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={shippingInfo.nombre}
                      onChange={handleShippingInfoChange}
                      placeholder="Ej: Juan Pérez"
                      required
                      className={formErrors.nombre ? "border-red-500" : ""}
                    />
                    {formErrors.nombre && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documento" className="flex items-center">
                      Documento de identidad <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="documento"
                      name="documento"
                      value={shippingInfo.documento}
                      onChange={handleShippingInfoChange}
                      placeholder="Ej: 1234567890"
                      required
                      className={formErrors.documento ? "border-red-500" : ""}
                    />
                    {formErrors.documento && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center">
                      Teléfono <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={shippingInfo.telefono}
                      onChange={handleShippingInfoChange}
                      placeholder="Ej: 3001234567"
                      required
                      className={formErrors.telefono ? "border-red-500" : ""}
                    />
                    {formErrors.telefono && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      Correo electrónico <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      placeholder="Ej: correo@ejemplo.com"
                      required
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                  </div>
                </div>
              </div>

              {deliveryMethod === "envio" && (
                <div className="space-y-4">
                  <h3 className="font-medium">Información de Envío</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="direccion" className="flex items-center">
                        Dirección de entrega <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={shippingInfo.direccion}
                        onChange={handleShippingInfoChange}
                        placeholder="Ej: Calle 123 #45-67"
                        required
                        className={formErrors.direccion ? "border-red-500" : ""}
                      />
                      {formErrors.direccion && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciudad" className="flex items-center">
                        Ciudad <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="ciudad"
                        name="ciudad"
                        value={shippingInfo.ciudad}
                        onChange={handleShippingInfoChange}
                        placeholder="Ej: Pasto"
                        required
                        className={formErrors.ciudad ? "border-red-500" : ""}
                      />
                      {formErrors.ciudad && <p className="text-red-500 text-xs">Este campo es obligatorio</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Método de Pago</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "tarjeta" ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setPaymentMethod("tarjeta")}
                  >
                    <div className="flex items-center justify-center h-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <p className="text-center mt-2 font-medium">Tarjeta de Crédito/Débito</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "nequi" ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setPaymentMethod("nequi")}
                  >
                    <div className="flex items-center justify-center h-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                        <path d="M18 14h-8" />
                        <path d="M15 18h-5" />
                        <path d="M10 6h8v4h-8V6Z" />
                      </svg>
                    </div>
                    <p className="text-center mt-2 font-medium">Nequi</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "pse" ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setPaymentMethod("pse")}
                  >
                    <div className="flex items-center justify-center h-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-2-1-2z" />
                        <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                        <path d="M16 11h0" />
                      </svg>
                    </div>
                    <p className="text-center mt-2 font-medium">PSE</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "solana" ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setPaymentMethod("solana")}
                  >
                    <div className="flex items-center justify-center h-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="M6 8h.01" />
                        <path d="M16 8h2" />
                        <path d="M10 8h4" />
                        <path d="M6 12h4" />
                        <path d="M14 12h.01" />
                        <path d="M18 12h.01" />
                        <path d="M6 16h2" />
                        <path d="M10 16h8" />
                      </svg>
                    </div>
                    <p className="text-center mt-2 font-medium">Solana</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "eth" ? "border-green-600 bg-green-50" : ""}`}
                    onClick={() => setPaymentMethod("eth")}
                  >
                    <div className="flex items-center justify-center h-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                      </svg>
                    </div>
                    <p className="text-center mt-2 font-medium">Ethereum</p>
                  </div>
                </div>

                {paymentMethod === "tarjeta" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de expiración</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input id="cardName" placeholder="NOMBRE APELLIDO" />
                    </div>
                  </div>
                )}

                {paymentMethod === "nequi" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="nequiNumber">Número de celular Nequi</Label>
                      <Input id="nequiNumber" placeholder="300 123 4567" />
                    </div>
                  </div>
                )}

                {paymentMethod === "pse" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Banco</Label>
                      <select id="bank" className="w-full p-2 border rounded-md">
                        <option value="">Selecciona tu banco</option>
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="bbva">BBVA</option>
                        <option value="bogota">Banco de Bogotá</option>
                        <option value="popular">Banco Popular</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountType">Tipo de cuenta</Label>
                      <select id="accountType" className="w-full p-2 border rounded-md">
                        <option value="">Selecciona el tipo de cuenta</option>
                        <option value="ahorros">Ahorros</option>
                        <option value="corriente">Corriente</option>
                      </select>
                    </div>
                  </div>
                )}

                {(paymentMethod === "solana" || paymentMethod === "eth") && (
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-center font-medium">Envía el pago a la siguiente dirección:</p>
                      <p className="text-center text-sm mt-2 break-all">
                        {paymentMethod === "solana"
                          ? "8ZUgCkZHY5rqP1PXALUrJ7aWvCxDZZXvKQgFT9PkYTzG"
                          : "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"}
                      </p>
                      <div className="flex justify-center mt-4">
                        <div className="bg-white p-2 rounded-lg">
                          <div className="h-32 w-32 bg-gray-200 flex items-center justify-center">
                            <p className="text-xs text-center">Código QR</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    Acepto los términos y condiciones y la política de privacidad
                  </Label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={generateReceipt}>
                  Confirmar Compra
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowCheckout(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <footer className="w-full border-t bg-green-800 text-white py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">Ecocommers Nariño</span>
          </div>
          <div className="text-sm text-green-100">© 2025 Ecocommers Nariño. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <Link href="#" className="text-green-100 hover:text-white">
              Términos
            </Link>
            <Link href="#" className="text-green-100 hover:text-white">
              Privacidad
            </Link>
            <Link href="/about" className="text-green-100 hover:text-white">
              Nosotros
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
