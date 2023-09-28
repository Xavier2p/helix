import { ISum } from './types';
import { ItemQuickView } from './item-quick-view';
import { Title, Grid, Paper } from '@mantine/core';
import { useQuickView } from './quick-view.logic';

const QuickView = () => {
    const { sumMonth, sumWeek, sumAll } = useQuickView();

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Quick View</Title>
            <Grid columns={12} align="center" p="md">
                <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                    <ItemQuickView sum={sumMonth as ISum} name="Month" />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                    <ItemQuickView sum={sumWeek as ISum} name="Week" />
                </Grid.Col>
                <Grid.Col xs={12} sm={12} md={12} lg={4} xl={4}>
                    <ItemQuickView sum={sumAll as ISum} name="Time" />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export { QuickView };
