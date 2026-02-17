import { useGameStore } from '../../store'

export default function HUD() {
  const { faith, money, time, weather } = useGameStore()

  // Format time (e.g. 14.5 -> 14:30)
  const formatTime = (t: number) => {
    const hours = Math.floor(t)
    const minutes = Math.floor((t - hours) * 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: '20px',
      pointerEvents: 'none', // Let clicks pass through to 3D scene
      zIndex: 10, // Ensure it's on top of Canvas
      display: 'flex',
      justifyContent: 'space-between',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '1.2rem',
      textShadow: '0 0 5px black'
    }}>
      {/* Left: Shrine Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>⛩️ Faith: {faith.toFixed(0)}</div>
        <div>💰 Money: ¥{money}</div>
      </div>

      {/* Right: Environment */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'right' }}>
        <div>🕒 Time: {formatTime(time)}</div>
        <div>🌤️ Weather: {weather}</div>
      </div>
    </div>
  )
}
