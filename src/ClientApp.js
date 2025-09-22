import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/clients";

function ClientApp() {
  const [clients, setClients] = useState([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchClients = async () => {
    const res = await axios.get(API_URL);
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { nom, email });
    } else {
      await axios.post(API_URL, { nom, email });
    }
    setNom("");
    setEmail("");
    setEditId(null);
    fetchClients();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchClients();
  };

  const handleEdit = (client) => {
    setNom(client.nom);
    setEmail(client.email); // corrigé setEmail
    setEditId(client.id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestion des Clients</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {editId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      <div style={styles.list}>
        {clients.map(client => (
          <div key={client.id} style={styles.card}>
            <div>
              <strong>{client.nom}</strong>
              <p>{client.email}</p>
            </div>
            <div style={styles.actions}>
              <button onClick={() => handleEdit(client)} style={styles.editBtn}>Éditer</button>
              <button onClick={() => handleDelete(client.id)} style={styles.deleteBtn}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles CSS inline (pour rapidité)
const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ClientApp;
