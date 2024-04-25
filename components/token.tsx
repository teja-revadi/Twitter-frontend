// access token
// export const token = localStorage.getItem("access") ;

const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("access");;
    } 
};

export const token = getToken()