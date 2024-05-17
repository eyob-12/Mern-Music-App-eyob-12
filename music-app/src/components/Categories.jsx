import { Box, Flex, Heading, Image, SimpleGrid } from "@chakra-ui/react";

const categories = [
    {
        id: 1,
        title: "Pop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
    {
        id: 2,
        title: "Chill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
    {
        id: 3,
        title: "Podcast",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
    {
        id: 4,
        title: "Romance",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
    {
        id: 5,
        title: "Hip Hop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
    {
        id: 6,
        title: "Rock",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgx-LXY4NyOx6_k5pJ2huOgALvJo6-rRRjLd48u5SeaA&s",
    },
];

const Categories = () => {
    return (
        <Box mt={12}>
            <Heading fontSize="xl" mb={8}>
                Categories
            </Heading>

            <SimpleGrid columns={2} gap={4}>
                {categories.map((cat) => (
                    <Flex
                        key={cat.id}
                        align="center"
                        justify="center"
                        rounded="base"
                        pos="relative"
                        h={{ base: 24, "2xl": 32 }}
                        cursor="pointer">
                        <Image
                            src={cat.image}
                            alt={cat.title}
                            pos="absolute"
                            left={0}
                            top={0}
                            rounded="base"
                            objectFit="cover"
                            h="full"
                            w="full"
                        />
                        <Flex
                            align="center"
                            justify="center"
                            bg="blackAlpha.600"
                            pos="relative"
                            zIndex={10}
                            h="full"
                            w="full">
                            <Heading as="h4" fontSize="lg" fontWeight={500}>
                                {cat.title}
                            </Heading>
                        </Flex>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Categories;