import { useEffect, useRef, useState } from "react";
import {
    Button,
    Flex,
    Hide,
    SimpleGrid,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart, } from "react-icons/ai";
import {
    nextTrack,
    prevTrack,
    setPlaying,
} from "../../redux/slice/playerSlice";

import { setUser } from "../../redux/slice/userSlice";
import VolumeControl from "./VolumeControl";
import TrackDetails from "./Trackdetails";
import PlayControls from "./PlayControls";
import LoginModal from "../LoginModal";
import PlayingBar from "./PlayingBar";
import { setModalMessage } from "../../redux/slice/modalSlice";
import axios from "axios";

const MusicPlayer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalRef = useRef();
    const toast = useToast();
    const dispatch = useDispatch();
    const { currentTrack, repeatStatus, currentIndex, trackList, isPlaying }
        = useSelector((state) => state.player);
    const { user, token } = useSelector((state) => state.user);
    const audioRef = useRef(null);
    const isEndOfTracklist = currentIndex === trackList.length - 1;
    const [songDetails, setSongDetails] = useState(null);
    const [audioPlaying, setAudioPlaying] = useState(
        audioRef.current && audioRef.current.playing
    );

    //  const [musicBarVisible, setMusicBarVisible] = useState(true);


    useEffect(() => {
        if (audioPlaying) {
            dispatch(setPlaying(true));
        } else {
            dispatch(setPlaying(false));
        }
    }, [audioPlaying]);

    //  useEffect(() => {
    //      audioRef.current = new Audio();
    //      return () => {
    //          // Cleanup audio element when component unmounts
    //          audioRef.current = null;
    //      };
    //  }, []);
    //  useEffect(() => {
    //      if (currentTrack?.filename && currentTrack.filename.length > 0) {
    //          audioRef.current.src = currentTrack.filename[0]; // Access the first element of the filename array
    //          audioRef.current.play(); // You can play the audio here if needed
    //      }
    //  }, [currentTrack]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [isPlaying]);


    useEffect(() => {
        setSongDetails((prev) => {
            return { ...prev, time: 0 };
        });
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }, [currentTrack?._id]);

    useEffect(() => {
        setSongDetails({
            volume: 1,
            time: audioRef?.current
                ? Math.round(
                    (audioRef?.current.currentTime / audioRef.current.duration) * 100
                ) // eslint-disable-line no-mixed-spaces-and-tabs
                : 0,
            shuffle: false,
            repeat: false,
        });
    }, [audioRef.current]);

    const seekPoint = (e) => {
        audioRef.current.currentTime = (e / 100) * audioRef.current.duration;

        setSongDetails((prev) => ({
            ...prev,
            time: Math.round(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
            ),
        }));
    };

    const changeVolume = (e) => {
        setSongDetails((prevValues) => {
            return { ...prevValues, volume: e / 100 };
        });
        audioRef.current.volume = e / 100;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef?.current.pause();
            dispatch(setPlaying(false));
        } else {
            audioRef?.current.play();
            dispatch(setPlaying(true));
        }
    };

    const volumeToggle = () => {
        if (songDetails?.volume > 0) {
            setSongDetails((prev) => {
                return { ...prev, volume: 0 };
            });
            audioRef.current.volume = 0;
        } else {
            setSongDetails((prev) => {
                return { ...prev, volume: 1 };
            });
            audioRef.current.volume = 1;
        }
    };

    useEffect(() => {
        audioRef.current.currentTime = 0;
        audioRef?.current.play();
        dispatch(setPlaying(true));
    }, [currentTrack.src]);

    const handleNextSong = () => {
        if (trackList.length == 1) {
            restartSong();
        } else {
            dispatch(nextTrack());
        }
    };

    const handlePreviousSong = () => {
        if (trackList.length == 1) {
            restartSong();
        } else {
            dispatch(prevTrack());
        }
    };

    const restartSong = () => {
        setSongDetails((prev) => {
            return { ...prev, time: 0 };
        });
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const handleEnded = () => {
        switch (repeatStatus) {
            case "OFF":
                if (!isEndOfTracklist) {
                    handleNextSong();
                }
                break;
            case "TRACKLIST":
                handleNextSong();
                break;
            case "SINGLE":
                audioRef.current.play();
                break;

            default:
                break;
        }
    };

    const likeSong = async () => {
        await axios.patch(`http://localhost:4000/songs/like/${currentTrack?._id}`, null, {
            headers: {

                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch(setUser(res.data));
                toast({
                    description: "Your favorites have been updated",
                    status: "success",
                });
            })
            .catch(() => {
                toast({
                    description: "An error occured",
                    status: "error",
                });
            });
    };

    const handleLike = () => {
        if (!token) {
            dispatch(
                setModalMessage("Please login to save songs to your favorites.")
            );
            onOpen();
        } else {
            likeSong();
        }
    };

    // const toggleMusicBarVisibility = () => {
    //     setMusicBarVisible(!musicBarVisible);
    // };

    return (
        <>


            <>
                <LoginModal ref={modalRef} onClose={onClose} isOpen={isOpen} />
                <SimpleGrid
                    templateColumns="repeat(3, 1fr)"
                    align="center"
                    justify="space-between"
                    position="fixed"
                    bottom="0"
                    left="0"
                    zIndex={100}
                    width="full"
                    p={4}
                    border="1px"
                    borderColor="zinc.600"
                    roundedTop="lg"
                    bgColor="blackAlpha.700"
                    backdropFilter="blur(15px)">
                    <TrackDetails track={currentTrack} />
                    <Flex direction="column" gap={2}>
                        <PlayControls
                            isPlaying={isPlaying}
                            onNext={handleNextSong}
                            onPlay={handlePlayPause}
                            onPrevious={handlePreviousSong}
                            repeatStatus={repeatStatus}
                        />
                        <Hide below="md">
                            <PlayingBar
                                onSeek={seekPoint}
                                time={songDetails?.time}
                                track={currentTrack}
                                trackRef={audioRef.current}
                            />
                        </Hide>
                    </Flex>
                    <Flex align="center" justify="flex-end" gap={{ base: 0, md: 4 }}>
                        <Button
                            variant="unstyled"
                            fontSize={{ base: 18, md: 24 }}
                            p={0}
                            h={{ base: 8, md: 12 }}
                            minW={6}
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            color="accent.main"
                            onClick={handleLike}>
                            {user && user.favorites && user.favorites.includes(currentTrack._id) ? (
                                <AiFillHeart color="inherit" />
                            ) : (
                                <AiOutlineHeart color="#ddd" />
                            )}
                        </Button>
                        <Flex justifyContent="space-between" gap={0}>
                            <Hide below="md">
                                <VolumeControl
                                    onChange={changeVolume}
                                    onToggle={volumeToggle}
                                    volume={songDetails ? songDetails?.volume : 0}
                                />
                            </Hide>
                            <audio
                                ref={audioRef}
                                src={currentTrack?.filename[0]}
                                onPause={() => setAudioPlaying(false)}
                                onPlay={() => setAudioPlaying(true)}
                                onEnded={handleEnded}
                                onTimeUpdate={() => {
                                    setSongDetails((prev) => ({
                                        ...prev,
                                        time: Math.round(
                                            (audioRef.current.currentTime / audioRef.current.duration) *
                                            100
                                        ),
                                    }));
                                }}
                            />
                        </Flex>
                        {/*
                            <Button
                                variant="unstyled"
                                fontSize={{ base: 18, md: 24 }}
                                p={0}
                                h={{ base: 8, md: 12 }}
                                minW={6}
                                display="inline-flex"
                                alignItems="center"
                                bg="gray.800"
                                _hover={{ bg: "gray.600" }}
                                justifyContent="center"
                                color="accent.main"
                                onClick={toggleMusicBarVisibility} // Toggle visibility on click
                            >
                                <AiOutlineClose />
                            </Button>
                                */}
                    </Flex>
                </SimpleGrid>
            </>

        </>
    );
};

export { MusicPlayer };