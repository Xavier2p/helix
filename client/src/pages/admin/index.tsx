import { Card, Center, Grid, Title } from '@mantine/core';
import { ListUsers } from './users';

const AdminPanel = (): JSX.Element => (
    <Grid.Col span={12}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center>
                <Title order={2}>Admin Panel</Title>
            </Center>
            <ListUsers />
        </Card>
    </Grid.Col>
);

export default AdminPanel;
