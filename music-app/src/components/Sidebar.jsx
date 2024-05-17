import { BiMenuAltRight, BiMusic } from "react-icons/bi";
import { AiFillHeart, AiFillHome, } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { RiUpload2Line } from 'react-icons/ri';
import { HiViewGrid } from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Box, Button, Divider, Flex, Heading, Hide, Show, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";



const MobileNav = () => {
    const [SidebarIsOpen, setSidebarIsOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setSidebarIsOpen(false);
    }, [pathname]);


    const toggleSidebar = () => {
        setSidebarIsOpen(!SidebarIsOpen);
    };

    return (
        <Box position="fixed" top={0} left={0}
            zIndex={30} w="full" h={SidebarIsOpen ? "100vh" : undefined}
            bg="zinc.950">
            <Flex align="center" justify="space-between" p={2} >
                <Link to={"/home"} >
                    <Flex color="accent.main" align="center" gap={4} >
                        <BiMusic color="inherit" size={30} />
                        <Heading as="h1" fontWeight="semibold" fontSize="2xl">
                            Abyssinia-sounds
                        </Heading>
                    </Flex>
                </Link>
                <Button onClick={toggleSidebar} variant="unstyled" color="red">
                    {SidebarIsOpen ? <TiTimes size={24} /> : <BiMenuAltRight size={24} />}
                </Button>
            </Flex>
            {SidebarIsOpen && (
                <Box px={4} pb={2} h="full">
                    <NavContent />
                </Box>
            )}

        </Box>
    );
};

const DesktopNav = () => {
    return (
        <Box
            position="fixed" top={0} left={0} zIndex={30}
            minW={{ base: "full", md: "12rem", lg: "16rem", "2xl": "25rem" }}
            minH={{ base: "5rem", md: "100vh" }}
            borderRight="1px" borderRightColor="zinc.600" bg="zinc.900">
            <Flex direction="column" minH="100vh" p={4}>
                <Flex color="accent.main" align="center" gap={4}>
                    <BiMusic color="inherit" size={30} />
                    <Heading as="h1" fontWeight="semibold" fontSize="2xl">
                        አቢሲኒያ-sounds
                    </Heading>
                </Flex>
                <NavContent />
            </Flex>
        </Box>
    );
};

const NavContent = () => {



    return (
        <Box>
            <Flex direction="column" gap={2} mt={12}>
                <NavLink to="/home">
                    {({ isActive }) => (
                        <Button
                            bg={isActive ? "#38B2AC" : "transparent"}
                            _hover={isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }}
                            rounded="base" display="inline-flex" alignItems="center" justifyContent="flex-start"
                            gap={6} py={6} px={4} w="full">
                            <AiFillHome size={20} color={isActive ? "white" : "red"} />
                            <span>Home</span>
                        </Button>
                    )}

                </NavLink>
                <NavLink to="/library">
                    {({ isActive }) => (
                        <Button
                            bg={isActive ? "#38B2AC" : "transparent"}
                            _hover={isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }}
                            rounded="base" display="inline-flex" alignItems="center" justifyContent="flex-start"
                            gap={6} py={6} px={4} w="full">
                            <HiViewGrid size={20} color={isActive ? "white" : "red"} />
                            <span>Browser</span>
                        </Button>
                    )}
                </NavLink>
                <NavLink to="/playlists">
                    {({ isActive }) => (
                        <Button
                            bg={isActive ? "#38B2AC" : "transparent"}
                            _hover={isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }}
                            rounded="base" display="inline-flex" alignItems="center" justifyContent="flex-start"
                            gap={6} py={6} px={4} w="full">
                            <BsHeadphones size={20} color={isActive ? "white" : "red"} />
                            <span>playlists</span>
                        </Button>
                    )}
                </NavLink>
                <NavLink to="/Favorites">
                    {({ isActive }) => (
                        <Button
                            bg={isActive ? "#38B2AC" : "transparent"}
                            _hover={isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }}
                            rounded="base" display="inline-flex" alignItems="center" justifyContent="flex-start"
                            gap={6} py={6} px={4} w="full">
                            <AiFillHeart size={20} color={isActive ? "white" : "red"} />
                            <span>Favorites</span>
                        </Button>
                    )}
                </NavLink>
                <NavLink to="/addSongs">
                    {({ isActive }) => (
                        <Button
                            bg={isActive ? "#38B2AC" : "transparent"}
                            _hover={isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }}
                            rounded="base" display="inline-flex" alignItems="center" justifyContent="flex-start"
                            gap={6} py={6} px={4} w="full">
                            <RiUpload2Line size={20} color={isActive ? "white" : "red"} />
                            <span>AddSongs</span>
                        </Button>
                    )}
                </NavLink>
            </Flex>

            <Divider
                bg="zinc.500" border="0"
                mt={{ base: 12, md: 6, lg: 12 }} h="1px" mb={4}
            />
            <Box>
                <Profile />
            </Box>

        </Box >
    );
}

const Sidebar = () => {
    return (
        <div>
            <Show above="md">
                <DesktopNav />
            </Show>
            <Hide above="md">
                <MobileNav />
            </Hide>
        </div>
    );
};

export default Sidebar