const OPENROUTER_API_KEY = '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';

export const sendMessage = async (message) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Legal Document Management System",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant specializing in Vietnamese legal documents and regulations. Provide clear, accurate, and concise responses in Vietnamese."
          },
          {
            "role": "user",
            "content": message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng của bạn.');
    }
    throw new Error(error.message || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
  }
};