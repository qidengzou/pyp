# FastAPI 集成到 Vercel

## 本地开发

### 安装依赖

```bash
pip install -r requirements.txt
```

### 运行开发服务器

```bash
uvicorn api.__init__:app --reload
```

访问 http://localhost:8000 查看 API

## 部署到 Vercel

1. 确保代码已推送到 GitHub
2. 在 Vercel 控制台导入项目
3. Vercel 会自动检测 Python 配置并部署

## API 端点

- `GET /` - 基本响应
- `GET /api/hello` - Hello 消息
