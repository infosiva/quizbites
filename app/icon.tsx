import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse(
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: 'linear-gradient(135deg, #ca8a04, #f59e0b)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" strokeOpacity="0.55"/>
        <path d="M7 12.5l3.2 3.2L17 9" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
