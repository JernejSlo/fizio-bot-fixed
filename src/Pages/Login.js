import Header from "../Components/Header"

export default function Login() {
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: '#F0F2F5', height: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#fff', maxWidth: '300px', width: '90%', padding: '30px', borderRadius: '5px', boxShadow: '0px 2px 10px rgba(0,0,0,0.2)' }}>
                    <h1 style={{ color: '#0077C9', textAlign: 'center', marginBottom: '30px' }}>LOG IN</h1>
                    <form style={{ display: 'flex', flexDirection: 'column',alignItems: "center" }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Email Address</label>
                            <input type="email" id="email" name="email" required placeholder="Enter your email address" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Password</label>
                            <input type="password" id="password" name="password" required placeholder="Enter your password" style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center',marginTop: "10px" }}>
                            <button type="submit" style={{ backgroundColor: '#0077C9', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
