import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/userSlice";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
//import { AiOutlineLogout } from "react-icons/ai";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());
        navigate("/user/login");

    }
    const redirectToLogin = () => {
        navigate("/user/login");
    }
    return (
        <Box>
            {user ? (
                <Box p={3}>
                    <Flex align="center" gap={4} color="accent.light">
                        <HiOutlineUserCircle size={20} color="red" />
                        <Text fontSize="lg" >
                            {user?.username}
                        </Text>
                    </Flex>
                    <Button onClick={logout}
                        mt={{ base: 8, md: 4, lg: 8 }}
                        colorScheme='whiteAlpha'
                        display="inline-flex"
                        border={5}
                        alignItems="center"
                        fontWeight={400}
                        gap={3}>
                        {" "}

                        Logout
                    </Button>
                </Box>
            ) : (
                <Button
                    onClick={redirectToLogin}
                    variant="unstyled"
                    rounded="base"
                    w="full"
                    border="1px"
                    color="teal.500"
                    borderColor="teal.500"
                    fontSize="sm"


                >
                    Login
                </Button>
            )
            }
        </Box >
    )
}

export default Profile