import { db } from "../db.js";

export const getPosts = (req, res) => {
  
  const q = "SELECT * FROM posts";

db.query(q , (err, data) => {
  if (err) return res.status(500).send(err);
    return res.status(200).json(data);
});
};

export const getPost = (req, res) => {

  const q =
    "SELECT p.id, `username`, `title`, `desc`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
    const q =
      "INSERT INTO posts(`title`, `desc`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.date,
      req.body.uid,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
};



export const deletePost = (req, res) => {

    const postId = req.params.id;
    const uid = req.body.answer

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId,uid], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      return res.json("Post has been deleted!");
    });
};

export const updatePost = (req, res) => {

    const postId = req.body.id;
    const uid = req.body.uid.id

    const q =
      "UPDATE posts SET `title`=?,`desc`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc];

    db.query(q, [...values, postId, uid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
};