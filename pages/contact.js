import Head from "next/head";
import Header from "../components/Header";

export default function Contact() {
  return (
    <>
      <Head>
        <title>お問い合わせ</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: "40px 16px" }}>
        <h1>お問い合わせ</h1>
        <p>ご連絡はメールで受け付けています。</p>
        <p>
          <a className="btn btn-primary" href="mailto:rizerato9@gmail.com">
            メールを送る
          </a>
        </p>
      </main>
    </>
  );
}
