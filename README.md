# 🚀 SkyLauncher

SkyLauncher is a modern, automated web application deployment system that enables you to deploy your **React**, **Vite**, or even simple **HTML/CSS/JS** projects with just a few clicks! Using a powerful combination of **AWS Services** and **Redis**, this platform handles everything from building the app to deploying it in the cloud, with real-time updates and secure access. 

 --> It has 2 more back-end Repo that contains 3 servers ( sky-v1server🚀 / sky-v2server 🚀 )  ...

## 🛠️ System Design

The architecture is composed of both frontend and backend services, all hosted in AWS cloud. Below is a simplified diagram that showcases the different services and interactions within the system.



![SkyLauncher System Design](/system-design.png) <!-- Be sure to upload the system design image to your repo -->

---

## ✨ Features

- 🌐 **Simple and Fast Deployment**: Deploy any GitHub repository in minutes.
- 🛠️ **Automated Build & Deploy**: Fully managed deployment pipeline.
- 📡 **Real-Time Status Updates**: Stay informed with real-time progress updates.
- 🔐 **Secure Access**: Only authorized users can deploy apps.
- 🧑‍💻 **Supports Modern Frontend Frameworks**: Perfect for **React**, **Vite**, and **static HTML/CSS/JS** applications.
- 📊 **Scalable Architecture**: Designed for multiple, concurrent deployments using **AWS ECS** and **Redis**.

---

## 🖥️ Tech Stack

### 🏗️ Frontend
- **[Next.js](https://nextjs.org)** - A React framework for production-grade apps
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework

### 🛠️ Backend (23 Microservices)
- **Node.js** - JavaScript runtime for backend logic
- **Redis** - Real-time caching and messaging
- **Docker** -  containerizing apps

### ☁️ AWS Services
- **[AWS ECS](https://aws.amazon.com/ecs/)** - Elastic Container Service for scalable containerized applications
- **[AWS ECR](https://aws.amazon.com/ecr/)** - Elastic Container Registry for managing Docker images
- **[AWS S3](https://aws.amazon.com/s3/)** - Simple Storage Service for build artifacts and deployment files
- **[AWS SQS](https://aws.amazon.com/sqs/)** - Simple Queue Service for asynchronous task processing

---

## ⚙️ Microservices Architecture

SkyLauncher is powered by a **microservices architecture** to provide efficient and scalable deployment pipelines. Below is an overview of the services involved:

### 🔄 Frontend Service

- **Frontend Service**: A **Next.js** application that serves the user interface for deploying apps. Users can:
  - Enter GitHub repository URLs.
  - Provide security keys for authentication.
  - View real-time deployment statuses.

### 🛠️ Backend Services

SkyLauncher operates with **3 key backend services** that handle different parts of the deployment pipeline:

1. **Request Handler Service**: 
   - Validates incoming requests from the frontend.
   - Performs security checks on user inputs.
   - Routes requests to the appropriate backend services.

2. **Upload Service**: 
   - Clones the repository using the provided GitHub URL.
   - Prepares the application for building.
   - Uploads build files to **AWS S3** for deployment.

3. **Build-Deploy Service**: 
   - Builds the app using environment variables.
   - Deploys the built app to **AWS ECS**.
   - Sends deployment status updates via **AWS SQS** to the frontend.

Each service operates independently and communicates using **AWS SQS** and **Redis** for message passing and event-driven execution.

---

## 🚀 Deployment Process

SkyLauncher automates the entire deployment process, making it easy to deploy modern web apps:

1. **🔗 Connect Your Repo**: Enter your GitHub repository URL through the web interface.
2. **🔐 Secure Your Deployment**: Input your security key for authorized access.
3. **📦 Build & Deploy**: Behind the scenes, the system:
   - Clones your repository.
   - Builds the app using your stack (React/Vite/HTML).
   - Uploads build files to **AWS S3** and deploys via **AWS ECS**.
4. **🌍 Get Your URL**: Once deployed, the app is hosted live, and you can access it through a provided URL.

---

## 🏗️ Backend Services Breakdown

SkyLauncher consists of **23 microservices** that manage various operations like API requests, repository handling, build processing, and deployment:

- **Frontend Service**: Serves the user interface and provides the user-facing features for deploying applications.
- **API Service**: The main entry point for all client requests.
- **Request Handler**: Manages and validates incoming requests, ensuring secure access.
- **Upload Service**: Responsible for cloning repositories and uploading files to **AWS S3**.
- **Build-Deploy Service**: Handles the building of applications and their deployment using **AWS ECS**.

---




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# SkyLauncher-Client
