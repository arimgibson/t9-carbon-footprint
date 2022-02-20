import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const ErrText = ({ err, children }) => {
  return (
    <div style={{ ...(err ? { color: "red", fontWeight: "bold" } : {}) }}>
      {children}
    </div>
  );
};

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState({});

  function submit() {
    setLoading(true);
    axios(`http://776a-128-138-65-208.ngrok.io/api/${value}/all`)
      // axios(`https://t9-carbon-footprint.herokuapp.com/${value}`)
      .then((res) => res.data)
      .then((d) => {
        setData(d);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>T9 Carbon Footprint</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>T9 Carbon Footprint</h1>

        <p className={styles.description}>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={submit}>{loading ? "loading..." : "Submit"}</button>
        </p>
        {data ? (
          <>
            <div>
              {Object.values(data).map((d) => {
                return (
                  <div
                    key={d.filename}
                    style={{
                      border: "1px solid black",
                      borderRadius: "6px",
                      margin: "20px",
                      ...(d.HTTPError ? { backgroundColor: "red" } : {}),
                    }}
                  >
                    <ul>
                      <li>
                        Filename:{" "}
                        <code style={{ fontSize: "18px" }}>{d.filename}</code>
                      </li>
                      <li>Timestamp: {d.timestamp}</li>
                      <li>Type: {d.type}</li>
                      {d.HTTPError ? <li> HTTPError: {d.HTTPError}</li> : null}
                      <li>Size: {d.size} bytes</li>

                      <ErrText err={d.minified !== true}>
                        <li>Minified: {d.minified === true ? "yes!" : "NO"}</li>
                      </ErrText>
                      <ErrText err={d.compressed === "none"}>
                        <li>Compressed: {d.compressed}</li>
                      </ErrText>
                      {d.image ? <li> Image: {d.image}</li> : null}
                    </ul>
                    {/* {d}
              "filename":"image"

              ,"timestamp":86170.078479
              ,"type":"image"
              ,"HTTPError":false
              ,"minified":"n/a"
              ,"size":5072
              ,"image":"image"
              ,"compressed":"none" */}
                  </div>
                );
              })}
            </div>
            {/* <code>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </code> */}
          </>
        ) : null}
      </main>

      <footer className={styles.footer}>
        Made by Ari + Chips
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  );
}
