import styles from "./styles/Home.module.css";
import globalStyles from "./styles/globals.css"
import { useState } from "react";
import axios from "axios";

const ErrText = ({ err, children }) => {
  return <div style={{ ...(err ? { color: "red", fontWeight: "bold" } : {}) }}>{children}</div>;
};

export default function Home() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState({});

  function submit() {
    setLoading(true);
    axios(`https://t9-carbon-footprint.herokuapp.com/api/${value}/all`)
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
                        Filename: <code style={{ fontSize: "18px" }}>{d.filename}</code>
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
        Made by <a href="https://github.com/arimgibson">Ari</a> @ <a href="https://t9hacks.org">T9Hacks 2022</a>. Front end support from <a href="https://github.com/dawsbot">Dawson</a>.
      </footer>
    </div>
  );
}
