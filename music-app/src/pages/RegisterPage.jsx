
import {
    Flex, Box, Heading, Input, Button, Text,
    FormControl, FormLabel, Image, useBreakpointValue,
    InputGroup, InputRightElement, Spinner
}
    from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import pic from "../assets/pic16.jpg";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import { FaMusic } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/slice/userSlice';

const RegisterPage = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    const verifayFields = () => {
        if (email == "") {
            setError("you need to fill the email!");
            return false;
        } else if (username == "") {
            setError("you need to fill the username!");
            return false;
        } else if (email.length < 5) {
            setError("username should contain more 5 characters");
            return false;
        } else if (password == "") {
            setError("You need to fill the password");
            return false;
        } else {
            setError(null);
            return true;
        }
    };

    const registerUser = async (ev) => {
        const userData = {
            email: email,
            username: username,
            password: password,
        }
        if (verifayFields()) {
            setLoading(true);
            ev.preventDefault();
            await axios.post("http://localhost:4000/user/register", userData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                dispatch(loginUser(res.data));
                setLoading(false);
            }).catch((err) => {
                setError(err?.response?.data?.message);
                setLoading(false);
            });


        }
    }

    const isImageVisible = useBreakpointValue({ base: false, md: true }); // Show image on medium (md) and larger screens

    return (
        <Flex bg="gray.800" >
            <Box
                h="100vh"
                alignContent="center"
                justifyContent="center"
                flexDirection="column"
                p={12}
                w="100%"
                boxShadow='dark-lg'
                rounded='md'
                bg='gray.800'
            >
                <Flex gap={5} mt={-10} mb={6}  >
                    <Heading fontSize={60} display="flex" gap={3}>
                        <FaMusic size={20} />
                        Register
                    </Heading>
                    <Image src="https://images.squarespace-cdn.com/content/v1/59f0a6e9f09ca487886b21e2/1527236501791-PL8UQJXN2C3M3GIMCX7R/Artboard+Landscap.png"
                        w={20} h={20}
                    /></Flex>
                <FormControl>
                    <FormLabel fontSize="xs" color="zinc.400">
                        Email
                    </FormLabel>
                    <Input
                        placeholder="ethiopia@gmail.com"
                        type="email"
                        mb={3}
                        color="white"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}

                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="xs" color="zinc.400">
                        username
                    </FormLabel>
                    <Input
                        placeholder="eyob"
                        type="text"
                        mb={3}
                        color="white"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}

                    />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize="xs" color="zinc.400">
                        Password
                    </FormLabel>
                    <InputGroup>
                        <Input
                            placeholder="**********"
                            color="white"
                            mb={6}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <InputRightElement>
                            <Button
                                p={1}
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                {error && (
                    <Flex align="center" color="red.500" gap={4}>
                        <MdError color="inherit" />
                        <Text color="inherit" fontSize="xs">
                            {error}
                        </Text>
                    </Flex>
                )}
                <Button
                    onClick={registerUser}
                    bg="accent.main"
                    py={5}
                    w="full"
                    _hover={{ opacity: 0.8 }}>
                    {loading ? <Spinner color="white" /> : "REGISTER"}
                </Button>
                <br /><br />
                <Text fontSize="sm" color="zinc.400">
                    {"Don't have an account yet?"}{" "}
                    <Link to="/user/login">
                        {" "}
                        <Text as="span" color="accent.main">
                            Log In
                        </Text>
                    </Link>
                </Text>
            </Box>
            {
                isImageVisible && (
                    <Flex>
                        <Image
                            background="gray.800"
                            src={pic}
                            alt="Login"
                            h="100vh"
                            w="100vw"
                            objectFit="cover"
                        />
                    </Flex>
                )
            }
        </Flex >
    );
};




export default RegisterPage