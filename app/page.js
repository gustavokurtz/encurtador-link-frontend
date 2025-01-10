"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar URLs do backend
  const loadUrls = async () => {
    try {
      const response = await axios.get("http://localhost:3001/");
      setUrls(response.data);
    } catch (error) {
      console.error("Erro ao buscar URLs:", error);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  // Encurtar uma URL
  const handleShorten = async () => {
    if (!originalUrl) {
      alert("Informe uma URL válida!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/encurtar", {
        originalUrl,
      });
      setUrls((prev) => [response.data, ...prev]);
      setOriginalUrl("");
    } catch (error) {
      alert("Erro ao encurtar URL");
    } finally {
      setLoading(false);
    }
  };

  // Deletar uma URL
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/${id}`);
      setUrls((prev) => prev.filter((url) => url.id !== id)); // Remove a URL deletada do estado
    } catch (error) {
      alert("Erro ao deletar URL");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Encurtador de Links</h1>
      <div className={styles.form}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Digite a URL aqui..."
          disabled={loading}
          className={styles.input}
        />
        <button onClick={handleShorten} disabled={loading} className={styles.button}>
          {loading ? "Encurtando..." : "Encurtar"}
        </button>
      </div>
      {urls.length === 0 ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        <ul className={styles.urlList}>
          {urls.map((url) => (
            <li key={url.id} className={styles.urlItem}>
              <p>
                <strong>Original:</strong>{" "}
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {url.originalUrl}
                </a>
              </p>
              <p>
                <strong>Encurtada:</strong>{" "}
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {url.shortUrl}
                </a>
              </p>
              <p>
                <strong>Cliques:</strong> {url.clicks}
              </p>
              <button onClick={() => handleDelete(url.id)} className={styles.deleteButton}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
