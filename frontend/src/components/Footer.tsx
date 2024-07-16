import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

export function Footer(){
    return (
        <div className="bg-black h-40 flex justify-center items-center">
            <div className='w-64 flex justify-between items-center'>
                <Link to="https://github.com/Tabish1511/PayPer-Server">
                    <GitHubIcon fontSize='large' style={{ fontSize: '3rem', color: '#F4F1E9' }}/>
                </Link>
                <Link to="https://www.linkedin.com/in/tabish-khaqan/">
                    <LinkedInIcon fontSize='large' style={{ fontSize: '3rem', color: '#F4F1E9' }}/>
                </Link>
            </div>
        </div>
    )
}