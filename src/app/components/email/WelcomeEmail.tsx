import {
  Html,
  Head,
  Body,
  Container,
  Img,
  Section,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";

interface WelcomeEmailProps {
  url: string;
  host: string;
}

export default function WelcomeEmail({ url, host }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "#352f47",
                card: "#4c3d71",
                "card-border": "#6a5694",
                primary: "#9936E3",
                "primary-hover": "#A856E6",
                foreground: "#fcfcfc",
                separator: "#4D475F",
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans">
          <Container className="mx-auto py-8 px-4 max-w-150">
            {/* Logo */}
            <Section className="text-center mb-8">
              <Img
                src="https://i.imgur.com/uVuHROi.png"
                alt="Runefall logo"
                width="300"
                className="mx-auto"
              />
            </Section>

            {/* Card */}
            <Section className="bg-card rounded-lg border-2 border-card-border p-8 shadow-lg">
              {/* Title */}
              <Text className="text-4xl font-bold text-center text-primary m-0 mb-6">
                Welcome to Runefall
              </Text>

              {/* Separator */}
              <Section className="my-6">
                <table width="100%" cellPadding="0" cellSpacing="0">
                  <tr>
                    <td width="50%" style={{ height: "2px" }}>
                      <div
                        style={{
                          height: "2px",
                          background:
                            "linear-gradient(to right, #4D475F, transparent)",
                        }}
                      />
                    </td>
                    <td width="12px" style={{ padding: "0 8px" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          border: "2px solid #4D475F",
                          transform: "rotate(45deg)",
                          backgroundColor: "transparent",
                        }}
                      />
                    </td>
                    <td width="50%" style={{ height: "2px" }}>
                      <div
                        style={{
                          height: "2px",
                          background:
                            "linear-gradient(to left, #4D475F, transparent)",
                        }}
                      />
                    </td>
                  </tr>
                </table>
              </Section>

              {/* Subtitle */}
              <Text className="text-2xl text-center text-foreground m-0 mb-6">
                You are almost there!
              </Text>

              {/* Body text */}
              <Section className="mb-8">
                <Text className="text-center text-foreground m-0 mb-2">
                  We are all set to get you signed-in.
                </Text>
                <Text className="text-center text-foreground m-0">
                  Just press the button below.
                </Text>
              </Section>

              {/* Button */}
              <Section>
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ position: "relative" }}
                >
                  <tr>
                    <td align="center">
                      <a
                        href={url}
                        style={{
                          display: "inline-block",
                          position: "relative",
                          background:
                            "linear-gradient(to top, #4F0F7F, #9936E3)",
                          color: "#ffffff",
                          padding: "14px 24px",
                          textDecoration: "none",
                          borderRadius: "6px",
                          border: "2px solid #000000",
                          boxShadow: "0 0 0 2px #46456A",
                          fontSize: "16px",
                          fontWeight: "600",
                          letterSpacing: "0.5px",
                          textAlign: "center",
                        }}
                      >
                        {/* Top Left Corner */}
                        <img
                          src="https://i.imgur.com/j7PnFmF.png"
                          alt=""
                          width="12"
                          height="12"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            display: "block",
                          }}
                        />
                        {/* Top Right Corner */}
                        <img
                          src="https://i.imgur.com/j7PnFmF.png"
                          alt=""
                          width="12"
                          height="12"
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            display: "block",
                            transform: "rotate(90deg)",
                          }}
                        />
                        {/* Bottom Left Corner */}
                        <img
                          src="https://i.imgur.com/j7PnFmF.png"
                          alt=""
                          width="12"
                          height="12"
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            display: "block",
                            transform: "rotate(-90deg)",
                          }}
                        />
                        {/* Bottom Right Corner */}
                        <img
                          src="https://i.imgur.com/j7PnFmF.png"
                          alt=""
                          width="12"
                          height="12"
                          style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            display: "block",
                            transform: "rotate(180deg)",
                          }}
                        />
                        <span style={{ position: "relative", zIndex: "1" }}>
                          SIGN IN
                        </span>
                      </a>
                    </td>
                  </tr>
                </table>
              </Section>

              {/* Footer text */}
              <Section className="mt-8">
                <Text className="text-center text-sm text-foreground/70 m-0">
                  If you did not request this email, you can safely ignore it.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
