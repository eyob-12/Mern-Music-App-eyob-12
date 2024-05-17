
import { Box, Text, Link, Icon, } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {

    return (
        <Box bg="zinc.910" color="#e3e3e3" py={10} px={4} alignItems="center">

            <Text mt={10} textAlign="center">
                &copy; {new Date().getFullYear()} አቢሲኒያ-sounds. All rights reserved.
            </Text>
            <Text fontSize="sm" textAlign="center" mt={2}>
                Made with ❤️ by <Link href="https://eyobaddis.netlify.app" color="blue.300" textDecoration="underline">Eyob</Link>
                <br />
                <Link href="https://www.facebook.com/exole.ad?mibextid=ZbWKwL" color="blue.300" mr={2}>
                    <Icon as={FaFacebook} boxSize={6} color="blue" />
                </Link>
                <Link href="https://github.com/eyob-12?tab=repositories" color="blue.300" mr={2}>
                    <Icon as={FaGithub} boxSize={6} color="white" />
                </Link>
                <Link href="https://www.instagram.com/eyob_1_2?igsh=YzljYTk1ODg3Zg==" color="blue.300" mr={2}>
                    <Icon as={FaInstagram} boxSize={6} color="pink.600" />
                </Link>
                <Link href="https://www.linkedin.com/in/eyobaddis" color="blue.300">
                    <Icon as={FaLinkedin} boxSize={6} color="blue" />
                </Link>
            </Text>
        </Box>
    );
};

export default Footer;
