import React from "react";
import { Container, Button, Input, Stack } from "@chakra-ui/react";
import Header from "./header";
import { useAuth } from "./../hooks/index";

export default function ProtectedPage({ children }) {
  const { token, setToken } = useAuth("");
  const [appId, setAppId] = React.useState("");
  const [appSecret, setAppSecret] = React.useState("");
  const isLoggedIn = token;

  async function loginToSymbi() {
    const response = await fetch("https://api.symbl.ai/oauth2/token:generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        type: "application",
        appId,
        appSecret,
      }),
    });
    const json = await response.json();
    console.log(
      "🚀 -> file: protectedPage.js -> line 25 -> loginToSymbl -> json",
      json
    );
    setToken(json.accessToken);
  }
  return (
    <>
      <Header />
      {!isLoggedIn ? (
        <Container>
          <Stack spacing={3} marginBottom="1rem">
            <Input
              placeholder="appId"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              size="md"
            />
            <Input
              placeholder="appSecret"
              size="md"
              value={appSecret}
              onChange={(e) => setAppSecret(e.target.value)}
            />
          </Stack>
          <Button onClick={() => loginToSymbi()}>Login</Button>
        </Container>
      ) : (
        children
      )}
    </>
  );
}
