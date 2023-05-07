const router = require("express").Router();
// const {users} = ()

router.get("./users", (req, res) => {
  res.send(users);
});

router.get("./users/:userId", (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res.send("This user doesn't exist");
    return;
  }
});
