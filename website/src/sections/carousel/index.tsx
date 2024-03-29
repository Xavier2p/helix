import { Carousel } from '@mantine/carousel';
import { Card, Container, Image, Paper, Text, Title } from '@mantine/core';
import { useCarouselStyles } from './styles';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { carouselData } from './data';

const CarouselSection = () => {
    const { classes } = useCarouselStyles();

    const slides = carouselData.map((slide) => (
        <Carousel.Slide key={slide.title} onClick={() => {}}>
            <Paper shadow="sm" radius="md" p="xl">
                <Image src={slide.image} withPlaceholder alt={slide.title} className={classes.image} />
                <Card m="sm" shadow="sm" radius="md" padding="sm">
                    <Title order={3} align="center" mt="xs">
                        {slide.title}
                    </Title>
                    <Text mb="lg">{slide.description}</Text>
                </Card>
            </Paper>
        </Carousel.Slide>
    ));

    return (
        <Container py="xl" className={classes.inner}>
            <Carousel
                maw={1000}
                mx="auto"
                slideGap="md"
                withIndicators
                height="auto"
                loop
                nextControlIcon={<IconChevronRight size={24} />}
                previousControlIcon={<IconChevronLeft size={24} />}
                classNames={classes}
            >
                {slides}
            </Carousel>
        </Container>
    );
};

export default CarouselSection;
