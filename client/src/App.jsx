import { useState } from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { AppShell, Button, Group, Stack, Text, TextInput, Title } from '@mantine/core'

function App() {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setEmail('')
    setError('')

    const response = await fetch(
      `${import.meta.env.SERVER_URL}/email?userId=${encodeURIComponent(userId)}`,
    )
    const data = await response.json()

    if (!response.ok) {
      setError(data.error ?? 'No se pudo obtener el email')
      return
    }

    setEmail(data.email)
  }

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text fw={700}>Demo</Text>
          <Group gap="sm">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="default">Iniciar sesión</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Registrarse</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack maw={360} mx="auto" mt="xl" gap="lg">
          <Title order={2}>Inicio</Title>
          <Text c="dimmed">Consulta el email de un usuario.</Text>
          <form onSubmit={handleSubmit}>
            <Stack>
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
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
