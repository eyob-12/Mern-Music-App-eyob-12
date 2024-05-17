import HomeHero from "../components/HomeHero";
import SmallSection from "../components/NewSmallSection";
import PopularMusic from "../components/PopularMusic";
import TopCharts from "../components/TopCharts";
import Categories from "../components/Categories";
import { Grid, GridItem, Hide } from "@chakra-ui/react";
import Footer from "../components/Footer";


const HomePage = () => {

    return (
        <Grid
            templateColumns={{ base: "1fr", lg: "repeat(8, 1fr)" }}
            minH="100vh"
            pl={{ base: 2, md: 14, lg: 12, xl: 0 }}
            pb={24}
            pt={{ base: 14, md: 4 }}>
            <GridItem colSpan={5} p={4}>

                <HomeHero />
                <SmallSection />
                <PopularMusic />
            </GridItem>
            <GridItem colSpan={3} p={4}>
                <TopCharts />
                <Hide below="md">
                    <Categories />
                </Hide>
            </GridItem>
            <GridItem colSpan={8} p={4}>
                <Footer />
            </GridItem>
        </Grid>
    );
};

export default HomePage;