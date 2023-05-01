import { Link } from 'react-router-dom';

export default function Header() {

    const mouseEnter = e => {
        e.target.style.borderBottom = '1px solid white';
    }

    function mouseLeave(e) {
        e.target.style.borderBottom = 'none';
    }

    const linkStyle = {
        color: '#fff',
        width: "15%",
        textDecoration: 'none',
        padding: '10px 20px',
        border: "0px solid white",
        borderBottomWidth: 0,
        transition: 'box-shadow 0.3s ease-in-out',
        fontSize: "20px",
        fontWeight: 500,
        textAlign: "center",
    };


    return (
        <header style={{ backgroundColor: 'transparent', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start'}}>
                    <img src="/FizioBot.PNG" alt="FizioBot logo" style={{ height: '80px', marginRight: '20px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: "48%" }}>

                    <Link to="/" style={linkStyle} onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}>
                        Home
                    </Link>
                    <Link to="/chat" style={linkStyle} onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}>
                        Chat
                    </Link>
                    <Link to="/profile" style={linkStyle} onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}>
                        Profile
                    </Link>
                    <Link to="/sign-up" style={linkStyle} onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}>
                        Sign Up
                    </Link>
                    <Link to="/login" style={linkStyle} onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}>
                        Log in
                    </Link>
                </div>
            </nav>
        </header>
    );
}
