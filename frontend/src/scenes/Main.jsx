import Header from "../components/Layout"

export default function MainPage() {
  return (
    <div style={styles.container}>
      
      <header styles = {styles.header}>
        <Header/>{     
            }
      </header>
      

      <main style={styles.main}>
                <h1>Welcome to HackrMatch!</h1>
        <p>This is the main page of your app. Add content, buttons, or cards here.</p>
        <button style={styles.button} onClick={() => alert("Button clicked!")}>
          Try Now
        </button>
      </main>
      <footer style={styles.footer}>
        <p>© 2025 HackrMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', fontFamily: 'Arial, sans-serif' },
  header: { backgroundColor: '#61dafb', padding: '2rem', color: '#fff' },
  main: { padding: '2rem' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  footer: { backgroundColor: '#282c34', color: 'white', padding: '1rem', marginTop: '2rem' },
};

