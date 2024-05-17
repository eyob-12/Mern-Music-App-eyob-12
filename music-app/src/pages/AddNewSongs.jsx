import { Box, Text, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import axios from "axios";

const AddNewSongs = () => {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [coverImage, setCoverImage] = useState("");
    const [title, setTitle] = useState("");
    const [artistName, setArtistName] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleMusicChange(ev) {
        setSelectedMusic(ev.target.files[0]);
    }

    function handleImageLinkChange(ev) {
        setCoverImage(ev.target.value);
    }

    function uploadMusic() {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedMusic);
        formData.append('title', title);
        formData.append('artistes', artistName);
        formData.append('coverImage', coverImage);

        axios.post("http://localhost:4000/upload-music", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            setUploadSuccess(true);
            console.log('File uploaded successfully:', response.data);
        }).catch(error => {
            console.error('Error uploading file:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const onClose = () => setUploadSuccess(false);

    return (
        <Box m="auto" mt={20} mb={20} p={8}
            maxW="500px" borderWidth="1px" borderRadius="lg"
            bg="zinc.800"
            minH="100vh"
        >
            <Text>upload Music</Text>
            <Input
                type="file"
                name="file"
                onChange={handleMusicChange}
                variant="outline"
                borderColor="teal"
                p="20px"
                mb={4}
            />
            <Text>Music Title</Text>
            <Input
                placeholder="Music Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outline"
                borderColor="teal"
                p="20px"
                mb={4}
            />
            <Text>Artist Name</Text>
            <Input
                placeholder="Artist Name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                variant="outline"
                borderColor="teal"
                p="20px"
                mb={4}
            />
            <Text>Cover Image Link</Text>
            <Input
                placeholder="Cover Image Link"
                value={coverImage}
                onChange={handleImageLinkChange}
                variant="outline"
                borderColor="teal"
                p="20px"
                mb={4}
            />

            <Button
                onClick={uploadMusic}
                bg="accent.main"
                variant="outline"
                w="100%"
                _hover={{ bg: "accent.transparent" }}
            >
                <BiCloudUpload size={50} />
                {isLoading ? "Uploading..." : "Upload Music"}
            </Button>

            <Modal isOpen={uploadSuccess} onClose={onClose}>
                <ModalOverlay />
                <ModalContent ml={200} bgColor="#F56565" color="white">
                    <ModalHeader>Upload Success!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Your music has been uploaded successfully.
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AddNewSongs;
