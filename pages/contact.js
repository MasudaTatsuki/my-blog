import Head from "next/head"
import Script from "next/script"
import Header from "../components/Header"

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ</title>
      </Head>
      <Script src="https://js-na2.hsforms.net/forms/embed/244259839.js" strategy="afterInteractive" defer />
      <Header />
      <main className="container" style={{ padding: "40px 16px" }}>
        <h1>お問い合わせ</h1>
        <div
          className="hs-form-frame contact-form"
          data-region="na2"
          data-form-id="c5dca864-b212-44ea-9d8a-ffb5ede9e6d7"
          data-portal-id="244259839"
          style={{ background: "#ffffff", color: "#0b0b0b", padding: "16px", borderRadius: 12, border: "1px solid #e5e7eb" }}
        />
      </main>
    </>
  )
}