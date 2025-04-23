const apiBaseUrl =
    process.env.NODE_ENV === "production"
        ? "https://jeju-proxy.onrender.com" // 배포용
        : "http://localhost:5000";           // 개발용

export default apiBaseUrl;
