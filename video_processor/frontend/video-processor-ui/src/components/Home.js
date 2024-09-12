// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Video Application</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/upload">Upload a Video</Link>
                    </li>
                    <li>
                        <Link to="/videos">List All Videos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
