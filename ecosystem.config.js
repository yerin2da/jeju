module.exports = {
    apps: [
        {
            name: "jeju", // 앱 이름은 고유하게!
            cwd: "E:/cobra/jeju", // jeju 프로젝트 실제 경로
            script: "node_modules/react-scripts/scripts/start.js",
            interpreter: "node",
            env: {
                NODE_ENV: "development",          // 필요 시 환경 변수 추가
                PORT: 3001                        // 서버 포트 (필요 시)
            }
        },

    ]
}
