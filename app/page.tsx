"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, ShieldCheck, Truck, Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-green-800 font-medium hover:text-green-600">
              Inicio
            </Link>
            <Link href="/marketplace" className="text-green-800 font-medium hover:text-green-600">
              Tienda
            </Link>
            <Link href="/about" className="text-green-800 font-medium hover:text-green-600">
              Nosotros
            </Link>
          </nav>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-xs md:text-base">
            <Link href="/marketplace">Comprar Ahora</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="p-4">
              <Link href="/" className="block text-green-800 font-medium hover:text-green-600 mb-2">
                Inicio
              </Link>
              <Link href="/marketplace" className="block text-green-800 font-medium hover:text-green-600 mb-2">
                Tienda
              </Link>
              <Link href="/about" className="block text-green-800 font-medium hover:text-green-600">
                Nosotros
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-4 md:py-8 lg:py-10 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
                    Transforma tu espacio con naturaleza viva
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Descubre nuestra colección de plantas nativas de Nariño y lleva un pedazo de nuestra biodiversidad a
                    tu hogar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link href="/marketplace">
                      Explorar Plantas <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none relative h-[400px]">
                <Image
                  src="/SvgEcommers.svg"
                  layout="intrinsic"
                  width={400}
                  height={400}
                  alt="Colección de plantas"
                  className="mx-auto aspect-square rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-4 md:py-8 lg:py-10 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Ventajas de Nuestro Proyecto
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubre por qué Ecocommers Nariño es la mejor opción para tu jardín
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border border-green-100 p-6 rounded-lg">
                <div className="p-3 rounded-full bg-green-50">
                  <Leaf className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Plantas Nativas</h3>
                <p className="text-sm text-gray-600 text-center">
                  Ofrecemos plantas nativas de la región de Nariño, adaptadas al clima local y que contribuyen a la
                  biodiversidad.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-green-100 p-6 rounded-lg">
                <div className="p-3 rounded-full bg-green-50">
                  <ShieldCheck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Garantía de Calidad</h3>
                <p className="text-sm text-gray-600 text-center">
                  Todas nuestras plantas pasan por un riguroso control de calidad para asegurar su salud y vitalidad.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-green-100 p-6 rounded-lg">
                <div className="p-3 rounded-full bg-green-50">
                  <Truck className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Envío Seguro</h3>
                <p className="text-sm text-gray-600 text-center">
                  Utilizamos embalajes especiales para proteger las plantas durante el transporte y garantizar que
                  lleguen en perfecto estado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-4 md:py-8 lg:py-10 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-center justify-center">
              <div className="flex flex-col items-center space-y-2 text-center">
                <Truck className="h-10 w-10 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Envío a Domicilio</h3>
                <p className="text-gray-600">Entregamos tus plantas directamente a tu puerta en perfecto estado.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <Leaf className="h-10 w-10 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Plantas Saludables</h3>
                <p className="text-gray-600">Garantizamos que todas nuestras plantas están en óptimas condiciones.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <ShieldCheck className="h-10 w-10 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Garantía de Calidad</h3>
                <p className="text-gray-600">Si tu planta llega en mal estado, la reemplazamos sin costo adicional.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
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
