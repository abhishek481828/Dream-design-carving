const http = require("http");

const data = JSON.stringify({
    email: "admin@example.com",
    password: "123456"
});

const options = {
    hostname: "localhost",
    port: 5002,
    path: "/api/admin/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let body = "";
    res.on("data", (chunk) => body += chunk);
    res.on("end", () => console.log("Response Body:", body));
});

req.on("error", (error) => console.error("Error:", error));
req.write(data);
req.end();
