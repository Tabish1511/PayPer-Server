import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function Footer(){
    return (
        <div className="bg-black h-40 flex justify-center items-center">
            <div className='w-64 flex justify-between items-center'>
                <GitHubIcon fontSize='large' style={{ fontSize: '3rem', color: '#F4F1E9' }}/>
                <LinkedInIcon fontSize='large' style={{ fontSize: '3rem', color: '#F4F1E9' }}/>
            </div>
        </div>
    )
}