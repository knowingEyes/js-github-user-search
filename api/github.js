// export default async function handler(req, res) {
//  const { q, type } = req.query;
//   const token = process.env.GITHUB_TOKEN;
 

//   if (!q || !type) {
//     return res.status(400).json({ message: "Missing query or type" });
//   }

//   let endpoint = "";

//   if (type === "search") {
//     endpoint = `https://api.github.com/search/users?q=${q}+in:login&per_page=10`;
//   } else if (type === "user") {
//     endpoint = `https://api.github.com/users/${q}`;
//   } else {
//     return res.status(400).json({ message: "Invalid type" });
//   }

//   try {
//     const response = await fetch(endpoint, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/vnd.github+json",
//       },
//     });

//     const data = await response.json();
//     res.status(response.status).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "GitHub API error", error: error.message });
//   }
// }
// handler()
