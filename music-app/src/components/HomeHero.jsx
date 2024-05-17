import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { appear } from "../theme/motionVariants";
import { Link } from "react-router-dom";
import { BsHeadphones } from "react-icons/bs";
import pic1 from "../assets/pic6.jpg";
import pic2 from "../assets/pic5.jpg";
import pic11 from "../assets/pic11.jpg";
import pic12 from "../assets/pic12.jpg";
import pic13 from "../assets/pic13.jpg";
import pic14 from "../assets/pic14.jpg";
import pic15 from "../assets/pic15.jpg";
import pic16 from "../assets/pic16.jpg";
import pic17 from "../assets/pic17.jpg";
import pic18 from "../assets/pic18.jpg";
import pic19 from "../assets/pic19.jpg";
import pic20 from "../assets/pic20.jpg";
import { useEffect, useState } from "react";

const HomeHero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [pic1, pic2, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(preImage => (preImage + 1) % images.length)
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <Box
            as={motion.div}
            variants={appear}
            initial="initial"
            animate="animate"
            exit="exit"
            h={96}
            rounded="lg"
            pos="relative"
            overflow="hidden"
        >
            <motion.div
                key={currentImage}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <Flex
                align="flex-end"
                pos="absolute"
                bottom={0}
                left={0}
                w="full"
                h="full"
                p={4}
                pb={6}
                bgGradient="linear(to-t, zinc.900, transparent)"
            >
                <Box w="full">
                    <Heading
                        as="h1"
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight={600}
                        mb={2}
                    >
                        Awesome Collection of Ours
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} w="80%">
                        Listen to the genuine music here in our playlists
                    </Text>
                    <Link to={"/playlists"}>
                        <Button
                            bg="zinc.400"
                            fontSize={{ base: "sm", md: "md" }}
                            py={{ base: 3, md: 5 }}
                            px={{ base: 5, md: 8 }}
                            mt={4}
                            gap={2}
                        >
                            <BsHeadphones size={30} color="#805AD5" />
                            Listen Now
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};

export default HomeHero;
