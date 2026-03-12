// Core Service to interact with the SGI Backend AI Endpoints
export const getQuickAnalysis = async (context: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context }),
    });

    if (!response.ok) {
      if (response.status === 429) {
          throw new Error('quota');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error || 'Failed to fetch analysis');
    }
  } catch (error: any) {
    if (error.message === 'quota') {
        throw error;
    }
    console.error("AI Service Error:", error);
    throw error;
  }
};
