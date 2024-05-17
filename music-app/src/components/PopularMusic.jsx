import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import SongCard from "./SongCard";
import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";


const NewSmallSection = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setError(false);
        setLoading(true);
        await axios.get("http://localhost:4000/songs/popular")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box mt={8}>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap={3}>
                    <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
                        TOP Popular Music - In Habesha
                    </Heading>
                    <Box color="accent.main">
                        <Image src="https://images.squarespace-cdn.com/content/v1/59f0a6e9f09ca487886b21e2/1527236501791-PL8UQJXN2C3M3GIMCX7R/Artboard+Landscap.png"
                            w={10}
                        />
                    </Box>
                </Flex>
                <Link to="/library">
                    <Button
                        variant="unstyled"
                        fontSize={{ base: "sm", md: "md" }}
                        color="accent.light"
                        fontWeight={500}>
                        See more
                    </Button>
                </Link>
            </Flex>
            {loading ? (
                <Flex align="center" color="accent.main" justify="center" minH="20rem">
                    <AiOutlineLoading color="inherit" className="spin" size={36} />
                </Flex>
            ) : error ? (
                <Box my={2}>
                    <Text>Sorry, an error occured</Text>
                </Box>
            ) : (
                <Flex
                    align="center"
                    overflowX="scroll"
                    gap={5}
                    mt={3}
                    pb={4}
                    className="scrollbar_style">
                    {data?.map((song) => (
                        <SongCard key={song._id} song={song} />
                    ))}
                </Flex>
            )}
        </Box>
    );
};

export default NewSmallSection;

