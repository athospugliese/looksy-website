import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const personImage = formData.get('primary_image') as File;
    const outfitImage = formData.get('secondary_image') as File;
    const prompt = formData.get('prompt') as string;

    if (!personImage || !outfitImage || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: primary_image, secondary_image, or prompt' },
        { status: 400 }
      );
    }

    // Create a new FormData to forward to the external API
    const apiFormData = new FormData();
    apiFormData.append('primary_image', personImage);
    apiFormData.append('secondary_image', outfitImage);
    apiFormData.append('prompt', prompt);

    // Forward the request to the Python FastAPI backend
    const response = await fetch('/api/outfit-swap', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || 'Failed to process images' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing outfit swap:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};