import { Box, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeInUp } from "../theme/motionVariants";
import img from "../assets/music-1.jpg";
//import CreatePlayListCard from "./CreatePlayListCard";

//https://img.pixers.pics/pho_wat(s3:700/FO/61/81/36/13/700_FO61813613_a0eb56934168ff5e548603df0df333db.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/stickers-music-headphone-icon.jpg.jpg


import PropTypes from 'prop-types';

const PlaylistsCard = ({ playlist }) => {
    return (
        <div>
            <Link to={`/playlists/${playlist?._id}`}>
                <Box
                    rounded="md"
                    bg="zinc.900"
                    minW={{ base: "8rem", md: "10rem" }}
                    maxW={{ base: undefined, md: "12rem" }}
                    p={2}
                    pb={4}
                    as={motion.div}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate">
                    <Image
                        src={img}
                        alt={playlist?.title}
                        w="full"
                        objectFit="cover"
                        rounded="md"
                        mb={4}
                        loading="lazy"
                        minH="100px"
                    />
                    <Box>
                        <Heading
                            fontWeight={500}
                            mb={2}
                            fontSize={{ base: "sm", md: "md" }}
                            noOfLines={1}>
                            {playlist?.title}
                        </Heading>

                    </Box>
                </Box>
            </Link>
        </div>
    )
}

export default PlaylistsCard;

PlaylistsCard.propTypes = {
    playlist: PropTypes.array.isRequired,
}