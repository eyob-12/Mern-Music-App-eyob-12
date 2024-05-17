import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { MusicPlayer } from "../components/musicComponent/index.jsx";
const HomeLayout = () => {
    const { currentTrack } = useSelector((state) => state.player);

    const { pathname } = useLocation();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Grid
                position="relative"
                templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }}
                bg="blackAlpha.900"
                color="#e3e3e3">
                <GridItem colSpan={2}>
                    <Sidebar />
                </GridItem>

                <GridItem colSpan={8} minH={{ base: "97vh", md: "100vh" }}>
                    <Outlet />
                </GridItem>
                {currentTrack && <MusicPlayer />}

            </Grid>
        </>
    );
};

export default HomeLayout;