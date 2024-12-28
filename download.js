const express = require('express');
const path = require('path');
const fs = require('fs');
const downloadRouter = express.Router();

// 处理文件下载
downloadRouter.get('/', (req, res) => {
  const username = req.query.username; // 假设用户名从查询参数中获取
  const filePath = path.join(__dirname, 'uploads', username, 'downloaded_file.txt');
  res.download(filePath, 'downloaded_file.txt', (err) => {
    if (err) {
      console.error('文件下载失败:', err);
      res.status(500).send('文件下载失败');
    }
  });
});

module.exports = downloadRouter;
