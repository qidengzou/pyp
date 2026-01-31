import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 根据环境自动切换API地址
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return process.env.NODE_ENV === 'production' 
      ? (process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com/api')
      : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');
  }
  // 服务器环境
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
