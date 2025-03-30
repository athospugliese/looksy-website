"use client";

import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Shirt, Eye } from "lucide-react"
import { OutfitSwapCard } from "@/components/home/OutfitSwapCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              👕 Dress in the future. Try on any outfit with AI.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Looksy lets you see yourself wearing any outfit using AI. Upload a photo of yourself and an image of the
              clothing — and the magic happens in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OutfitSwapCard />
              
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">Image Generator</h3>
                  
                  <p className="text-muted-foreground mb-6">
                    Create stunning AI-generated images from text descriptions.
                    Just describe what you want to see, and our AI will bring it to life.
                  </p>
                  
                  <Button className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Upload your photo</h3>
                <p className="text-muted-foreground">Take a selfie or upload an existing photo of yourself.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose an outfit</h3>
                <p className="text-muted-foreground">
                  Select from our catalog or upload any clothing item you want to try.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">See your AI-powered look</h3>
                <p className="text-muted-foreground">Our AI generates a realistic preview of you wearing the outfit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl mx-auto">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-generated outfit previews</h3>
                  <p className="text-muted-foreground">See yourself in any outfit with our advanced AI technology.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Image-to-image processing</h3>
                  <p className="text-muted-foreground">Our AI seamlessly transfers clothing onto your photo.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Realistic clothing rendering</h3>
                  <p className="text-muted-foreground">
                    Experience true-to-life fabric textures and fit visualization.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobile-first user experience</h3>
                  <p className="text-muted-foreground">Try on outfits anywhere, anytime from your mobile device.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card";