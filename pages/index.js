import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  InputGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import ProtectedPage from "../components/protectedPage";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null);
  useEffect(() => {
    const src = URL.createObjectURL(new Blob([file], { type: "video/mp4" }));
    console.log("🚀 -> file: index.js -> line 25 -> useEffect -> src", src);
    setVideoSrc(src);
  }, [file]);
  return (
    <>
      <ProtectedPage>
        <Container maxWidth="1200px">
          <Box marginBottom="1rem">
            <InputGroup marginBottom="2rem">
              <Input
                type="file"
                id="input"
                accept="audio/*, video/*"
                ref={videoRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </InputGroup>
            <Box bg="lightgrey" marginBottom="1rem">
              <AspectRatio maxH="100%" ratio={16 / 9}>
                <video id="video-summary" controls src={videoSrc}></video>
              </AspectRatio>
            </Box>

            <Button>Send for processing </Button>
          </Box>
          <Divider orientation="horizontal" />
          <Heading>Processing Data</Heading>
          <SimpleGrid
            columns={2}
            spacingX="40px"
            spacingY="20px"
            marginTop="1rem"
          >
            <Box bg="lightGrey" height="80px">
              <Container margin="1rem">
                <Heading as="h4" size="md">
                  Transcripts pulled from Conversation API
                </Heading>
              </Container>
            </Box>
          </SimpleGrid>
        </Container>
      </ProtectedPage>
    </>
  );
}
