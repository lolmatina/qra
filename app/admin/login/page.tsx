'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 1 ? 'Password is required' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin/news/new');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xs" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mt="md" mb={50}>
          Вход в систему
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          {error && (
            <Alert color="red" mb="md">
              {error}
            </Alert>
          )}

          <TextInput
            label="Email"
            placeholder="Email address"
            required
            {...form.getInputProps('email')}
            mb="md"
          />

          <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            required
            {...form.getInputProps('password')}
            mb="xl"
          />

          <Button fullWidth type="submit" loading={isLoading}>
            {isLoading ? 'Вход...' : 'Вход'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
