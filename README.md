### n8n + RAG: Building a Smart Chatbot for Hartak.am

Retrieval-Augmented Generation (RAG) combined with **n8n** provides a powerful yet simple way to build an intelligent chatbot that can understand user questions, search through real content, and generate accurate, grounded answers.

This project uses **n8n**, **Supabase Vector Store**, **Apify Crawler**, and **OpenAI/Cohere embeddings** to create a fully automated pipeline for crawling hartak.am, indexing knowledge, and answering user queries reliably.

---

## Why Use n8n?

n8n is a low-code automation tool that allows you to connect every component of the RAG pipeline **without writing complex backend code**.

With n8n, you can visually orchestrate:

- Fetching website content (via Apify or HTTP nodes)
- Cleaning and preparing text
- Splitting content into chunks
- Generating embeddings with OpenAI or Cohere
- Storing vectors inside Supabase
- Retrieving relevant context dynamically
- Generating AI answers via GPT-4, Cohere Command R, etc.
- Delivering responses through chat widgets, Telegram, Slack, or any interface

Instead of building APIs, databases, and cron jobs manually, everything is handled through reusable workflow blocks inside n8n.

---

## 🔄 How the Workflow Works

This RAG pipeline follows a clean and modular structure:

### **1. Ingestion**
- Crawl and download the latest content from hartak.am using Apify.
- Extract raw HTML → clean it → convert to plain text.

### **2. Preprocessing**
- Split text into chunks (e.g., 500–1200 characters).
- Attach metadata such as URL, title, or timestamp.

### **3. Embedding**
- Convert text chunks into embeddings using:
  - OpenAI Embeddings
  - or Cohere Embeddings

### **4. Indexing**
- Store embeddings + documents inside **Supabase Vector Store**.

### **5. Querying**
When a user sends a question through your AI chat widget:
- Create an embedding of the question
- Retrieve the top-N similar chunks from Supabase
- Pass these chunks to the LLM as context

### **6. Answer Generation**
Using OpenAI or Cohere, the model generates:
- A grounded answer  
- Based strictly on retrieved documents  
- With minimal hallucinations  
- In Armenian (or any supported language)

The chatbot responds instantly through the frontend widget.

---

## Workflow Overview

Below is the complete workflow diagram used in this project:

![RAG Workflow]()

---

## Features

✔ Fully automated daily crawling  
✔ Smart text cleanup and formatting  
✔ High-quality embeddings  
✔ Fast vector search  
✔ Robust LLM-based answering  
✔ Language support for Armenian  
✔ Easy to scale and maintain  
