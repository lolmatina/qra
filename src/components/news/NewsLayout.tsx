'use client';

import { Anchor, Container, Grid, Paper, Stack, Title } from '@mantine/core';

interface NewsLayoutProps {
  newsContent: React.ReactNode;
  sidebarLinks: Array<{ id: number; title: string; href: string }>;
}

export default function NewsLayout({ newsContent, sidebarLinks }: NewsLayoutProps) {
  return (
    <Container py="xl" size="lg">
      <Grid>
        {/* Main content */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Title order={1} mb="lg">
            Latest News
          </Title>
          {newsContent}
        </Grid.Col>

        {/* Sidebar */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper shadow="xs" p="md" radius="md" withBorder>
            <Title order={2} size="h3" mb="md">
              Categories
            </Title>
            <Stack gap="xs">
              {sidebarLinks.map((link) => (
                <Anchor key={link.id} href={link.href} underline="hover">
                  {link.title}
                </Anchor>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
