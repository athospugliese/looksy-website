"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Upload, Shirt, ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function OutfitSwapPage() {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handlePersonImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPersonImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOutfitImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOutfitImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!personImage || !outfitImage) {
      setError("Please upload both a person image and an outfit image");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponseText(null);

    try {
      const formData = new FormData();
      // Convert base64 to blob
      const personBlob = await fetch(personImage).then(r => r.blob());
      const outfitBlob = await fetch(outfitImage).then(r => r.blob());
      
      formData.append('primary_image', personBlob);
      formData.append('secondary_image', outfitBlob);
      formData.append('prompt', 'Take the person from the first image and precisely dress them in the exact outfit from the second reference image. Transfer every detail of the outfit - including exact fabric patterns, textures, colors, seams, buttons, zippers, logos, embroidery, and all decorative elements - without any modifications or artistic interpretations. Maintain the complete fidelity of the reference clothing while naturally adapting it to the person\'s body shape, pose, and proportions. Pay special attention to how the garment would realistically fold, drape, and interact with light based on the person\'s position and the lighting conditions in their original photo. The final result should look like a professional photograph of the person actually wearing the precise outfit from the reference image.');
      
      const response = await fetch('http://localhost:8000/api/edit-image-dual', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.image) {
        setResultImage(`data:${data.mime_type || 'image/jpeg'};base64,${data.image}`);
        if (data.text) {
          setResponseText(data.text);
        }
      } else if (data.text) {
        setResponseText(data.text);
        setError('No image was generated, but the model provided a response');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Error processing your images. Please try again with different images or adjust your prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'outfit-swap-result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setPersonImage(null);
    setOutfitImage(null);
    setResultImage(null);
    setError(null);
    setResponseText(null);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Outfit Swap</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of yourself and an image of the clothing — and see yourself in that outfit instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel: Image uploads */}
          <div className="space-y-6">
            {/* Person Image Upload */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Person Photo</p>
                    <label 
                      htmlFor="personImage" 
                      className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors"
                    >
                      {personImage ? (
                        <div className="relative w-full h-48">
                          <Image 
                            src={personImage} 
                            alt="Person" 
                            fill 
                            className="object-contain rounded-md" 
                          />
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">Upload a photo of yourself</p>
                        </>
                      )}
                    </label>
                    <input 
                      id="personImage" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePersonImageUpload} 
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Outfit Photo</p>
                    <label 
                      htmlFor="outfitImage" 
                      className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors"
                    >
                      {outfitImage ? (
                        <div className="relative w-full h-48">
                          <Image 
                            src={outfitImage} 
                            alt="Outfit" 
                            fill 
                            className="object-contain rounded-md" 
                          />
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Shirt className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">Upload an outfit image</p>
                        </>
                      )}
                    </label>
                    <input 
                      id="outfitImage" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleOutfitImageUpload} 
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!personImage || !outfitImage || isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Swap Outfit
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={resetForm} 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Tips for best results</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <span className="font-bold">•</span>
                    <span>Use clear, well-lit photos of the person</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold">•</span>
                    <span>For best results, choose neutral poses</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold">•</span>
                    <span>Select clothing images with good detail visibility</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold">•</span>
                    <span>Avoid complex backgrounds in both images</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right panel: Results */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Result</h2>
                
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 text-destructive">
                    {error}
                  </div>
                )}

                {responseText && !error && (
                  <div className="bg-muted rounded-lg p-4 mb-6 text-sm">
                    <p className="font-medium mb-1">AI Response:</p>
                    <p>{responseText}</p>
                  </div>
                )}

                <div className="rounded-xl overflow-hidden flex items-center justify-center bg-muted/30 min-h-[400px]">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4"></div>
                      <p className="text-muted-foreground">Creating your outfit swap...</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">This may take up to 30 seconds</p>
                    </div>
                  ) : resultImage ? (
                    <div className="w-full">
                      <div className="relative max-h-[500px] w-full flex justify-center">
                        <Image 
                          src={resultImage} 
                          alt="Result" 
                          width={600}
                          height={600}
                          className="object-contain max-h-[500px] w-auto"
                        />
                      </div>
                      
                      <div className="mt-4 text-center">
                        <Button onClick={downloadImage} className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-10">
                      <div className="bg-muted/30 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
                        <Shirt className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-xl font-medium text-muted-foreground mb-2">Your result will appear here</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Upload a person photo and an outfit photo, then click "Swap Outfit" to see the result.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}