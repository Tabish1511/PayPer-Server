import { atom, selector } from 'recoil';
import axios from 'axios';

export const userState = atom({
  key: 'userState',
  default: selector({
    key: 'userStateSelector',
    get: async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/v1/user/getUser`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        return response.data.user;
      } catch (err) {
        console.error('Error fetching logged in user data', err);
        // Navigate to /signin here
        window.location.href = "/landingPage";
        return null;
      }
    }
  })
});
