const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadRouter = express.Router();

// 设置文件上传的存储路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const username = req.body.username; // 假设用户名从请求体中获取
    const userFolderPath = path.join(__dirname, 'uploads', username);
    // 创建用户文件夹（如果不存在）
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }
    cb(null, userFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// 处理文件上传
uploadRouter.post('/', upload.single('file'), (req, res) => {
  res.json({ message: '文件上传成功' });
});

module.exports = uploadRouter;
