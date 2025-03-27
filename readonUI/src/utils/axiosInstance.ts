import axios from "axios";

const API_URL = "https://localhost:7182/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const refreshToken = localStorage.getItem("refreshToken");
                
                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href ="/signin";
                    return Promise.reject(error);    
                }
                else{
                    
                    const res = await axios.post(
                        `${API_URL}/Auth/refresh-token?token=${encodeURIComponent(refreshToken)}`, 
                        null, 
                        {
                            headers: {
                                Accept: "*/*",
                            },
                        }
                    );

                    if (res.status === 200){
                        localStorage.setItem("accessToken", res.data.accessToken);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                        console.log(res.data.accessToken);
                        console.log(res.data.refreshToken);
                        return axiosInstance(originalRequest);

                    }
                    
                    localStorage.clear();
                    window.location.href = "/signin";
                }
                
            } catch (err){
                console.log(err);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;