import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shirt } from "lucide-react";
import Link from "next/link";

export function OutfitSwapCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Shirt className="h-6 w-6 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Outfit Swap</h3>
        
        <p className="text-muted-foreground mb-6">
          Upload a photo of yourself and an outfit image to see how you&apos;d look wearing it.
          Our AI technology seamlessly dresses you in any clothing item.
        </p>
        
        <Link href="/outfit-swap">
          <Button className="w-full">
            Try Outfit Swap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}