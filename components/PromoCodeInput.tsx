'use client'
import { useState } from 'react'
import { usePromo } from '@/hooks/usePromo'

export default function PromoCodeInput() {
  const { isUnlocked, daysLeft } = usePromo()
  const [showInput, setShowInput] = useState(false)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (isUnlocked) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
        Pro access active — {daysLeft} days remaining
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      })
      const data = await res.json()
      if (data.valid) {
        setStatus('success')
        setMessage(`Pro unlocked for ${data.daysUnlocked} days!`)
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setStatus('error')
        setMessage(data.message || 'Invalid code')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong')
    }
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="text-sm font-medium transition-colors"
        style={{ color: 'var(--accent, #fbbf24)' }}
      >
        Have a promo code?
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter code"
        className="px-3 py-1.5 text-sm rounded-lg border bg-white outline-none"
        style={{ borderColor: status === 'error' ? '#dc2626' : 'var(--border, #fde68a)', minWidth: 140 }}
        autoFocus
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-3 py-1.5 text-sm font-bold text-white rounded-lg transition-opacity active:scale-[0.97]"
        style={{ background: 'var(--accent, #fbbf24)', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? '...' : 'Apply'}
      </button>
      {message && (
        <span className="text-xs font-medium" style={{ color: status === 'success' ? '#059669' : '#dc2626' }}>
          {message}
        </span>
      )}
    </form>
  )
}
