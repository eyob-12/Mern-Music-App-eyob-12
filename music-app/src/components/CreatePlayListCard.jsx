import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

const CreatePlayListCard = () => {

    const navigate = useNavigate();

    const handleCreatePlaylist = () => {
        navigate("/playlist/createPlaylist");
    }
    return (
        <div>
            <Flex
                h="13rem"
                direction="column"
                align="center"
                justify="center"
                minW={{ base: "8rem", md: "10rem" }}
                bg="zinc.800"
                rounded="base">
                <Button
                    onClick={handleCreatePlaylist}
                    variant="unstyled"
                    bg="zinc.700"
                    display="inline-flex"
                    alignItems="center"
                    rounded="base"
                    boxSize={{ base: "2rem", md: "4rem" }}
                    m={3}>
                    <BiPlus size={24} />
                </Button>
                <Text fontSize="sm" color="zinc.400">
                    Create a playlist
                </Text>
            </Flex>
        </div>
    )
}

export default CreatePlayListCard;