import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

type Mix = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  description: string;
};

const PublicMixShowcasePanel: React.FC = () => {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMixes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "publicMixes"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Mix, "id">),
        }));
        setMixes(data);
      } catch (error) {
        console.error("Failed to load mixes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMixes();
  }, []);

  return (
    <div style={{ background: "#111", color: "#fff", padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
      <h3>Ìºê Public Mix Showcase</h3>
      {loading ? (
        <p>Loading mixes...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {mixes.map((mix) => (
            <li key={mix.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #333" }}>
              <strong>{mix.title}</strong> <br />
              <em>by {mix.author}</em> <br />
              <span style={{ fontSize: "0.8rem", color: "#aaa" }}>{mix.createdAt}</span> <br />
              <p style={{ marginTop: "0.3rem" }}>{mix.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicMixShowcasePanel;
