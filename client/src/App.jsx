import { useState } from 'react'
import { Button, Stack, Text, TextInput } from '@mantine/core'

function App() {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setEmail('')
    setError('')

    const response = await fetch(`/api/email?userId=${encodeURIComponent(userId)}`)
    const data = await response.json()

    if (!response.ok) {
      setError(data.error ?? 'No se pudo obtener el email')
      return
    }

    setEmail(data.email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack maw={360} mx="auto" mt="xl">
        <TextInput
          label="ID de usuario"
          value={userId}
          onChange={(event) => setUserId(event.currentTarget.value)}
          required
        />
        <Button type="submit">Enviar</Button>
        {email ? <Text>{email}</Text> : null}
        {error ? <Text c="red">{error}</Text> : null}
      </Stack>
    </form>
  )
}

export default App
