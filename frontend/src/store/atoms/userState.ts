import { atom, selector } from 'recoil';
import axios from 'axios';

// export const userState = atom({
//   key: 'userState',
//   default: {
//     name: '',
//   },
// });


// export const userState = atom({
//   key: 'userState',
//   default: selector({
//     key: 'userStateSelector',
//     get: async () => {
//       axios.get("https://payper-server.khaqantabish.workers.dev/api/v1/user/getUser" , {
//           headers: {
//               Authorization: "Bearer " + localStorage.getItem("token")
//           }
//       })
//       .then((response) => {
//         return response.data.user;
//       })
//       .catch(err => {
//           console.error('Error fetching logged in user data', err);
//       });
//     }
//   })
// });




export const userState = atom({
  key: 'userState',
  default: selector({
    key: 'userStateSelector',
    get: async () => {
      try {
        const response = await axios.get("https://payper-server.khaqantabish.workers.dev/api/v1/user/getUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        return response.data.user;
      } catch (err) {
        console.error('Error fetching logged in user data', err);
        return null;
      }
    }
  })
});
