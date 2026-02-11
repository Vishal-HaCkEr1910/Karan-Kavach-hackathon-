#  KARAN-KAVACH
## To use visit : https://karan-kavach-download-page.vercel.app
# UI:
<img width="2880" height="1800" alt="Screenshot from 2026-02-03 22-59-40" src="https://github.com/user-attachments/assets/efa8c474-fd98-4359-9972-7906e6572cf1" />

## Hardware-Level Memory Exploitation Monitor

**KARAN-KAVACH** is a next-generation security monitoring system that operates at the hardware level to detect and prevent memory exploitation attacks in real-time. Unlike traditional antivirus solutions that rely on signature-based detection, KARAN-KAVACH monitors CPU behavior, branch predictions, and memory access patterns to identify zero-day threats.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [System Requirements](#-system-requirements)
3. [Installation](#-installation)
4. [Quick Start](#-quick-start)
5. [Usage Guide](#-usage-guide)
6. [Architecture](#-architecture)
7. [Supported Platforms](#-supported-platforms)
8. [Troubleshooting](#-troubleshooting)

---

## ✨ Features

- **Real-time Process Monitoring** - Continuous scanning of all running processes
- **Hardware-Level Detection** - Intel LBR (Last Branch Record) integration for ROP attack detection
- **Memory Integrity Monitoring** - Track memory allocation patterns and detect anomalies
- **Network Connection Analysis** - Monitor suspicious network activity
- **Threat Laboratory** - Simulated threat execution for testing and demonstration
- **Neumorphic Dashboard** - Beautiful, modern UI with real-time visualizations
- **Cross-Platform Support** - Works on Windows, macOS, and Linux

---

## 💻 System Requirements

### Minimum Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Python**: 3.8 or higher
- **Node.js**: 16.0 or higher
- **RAM**: 4GB minimum
- **Storage**: 500MB free space

### Recommended for Full LBR Support
- **CPU**: Intel Core i5 or higher (for hardware LBR support)
- **OS**: Linux with perf tools installed (for direct MSR access)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/karan-kavach.git
cd karan-kavach
```

### Step 2: Install Backend Dependencies

```bash
cd backend
pip3 install -r requirements.txt
```

If `requirements.txt` doesn't exist, install manually:

```bash
pip3 install flask flask-cors psutil
```

### Step 3: Install Frontend Dependencies

```bash
cd "UI DESIGN"
npm install
```

---

## ⚡ Quick Start

### Step 1: Start the Backend Server

Open a terminal and run:

Open a terminal and run:

```bash
sources venv/bin/activate   #for mac and linux
venv\Scripts\activate       #for windows
```
```bash
cd backend
python3 karan_kavach.py
```

You should see:

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   KARAN-KAVACH                                                ║
║   Hardware-Level Memory Exploitation Monitor                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

[*] Starting KARAN-KAVACH API Server...
[*] API will be available at: http://localhost:5001
```

### Step 2: Start the Frontend Dashboard

Open another terminal and run:

```bash
cd "UI DESIGN"
npm run dev
```

### Step 3: Access the Dashboard

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 📖 Usage Guide

### Dashboard Overview

The dashboard is divided into several sections:

#### 1. **Header**
- Shows system status (SECURE/ALERT/DANGER)
- Displays active threats count
- CPU and Memory usage indicators

#### 2. **Left Sidebar**
- Navigation menu
- System information

#### 3. **Main Dashboard**

| Section | Description |
|---------|-------------|
| **CPU Monitor** | Real-time CPU usage with core breakdown |
| **Memory Monitor** | RAM usage and allocation patterns |
| **Threat Lab** | Execute simulated threats for testing |
| **Process Monitor** | Live list of running processes with threat analysis |
| **Integrity Score** | Overall system security rating |
| **LBR Stack Monitor** | Intel LBR data (Intel CPUs only) |
| **Debug Console** | Real-time security logs |

#### 4. **Right Panel**
- **Search Bar** - Search for specific processes
- **Quick Actions**:
  - 🛑 **Stop All Threats** - Terminate all detected malicious processes
  - ⚠️ **Shutdown PC** - Emergency system shutdown

### Using the Threat Laboratory

1. Click "Execute" on any threat simulation card
2. The system will spawn a test process that mimics malicious behavior
3. Watch as KARAN-KAVACH detects and monitors the threat
4. The threat auto-terminates after 8 seconds
5. Use this to demonstrate the detection capabilities

### Searching Processes

1. Type a process name in the search bar (right panel)
2. Press Enter to search
3. Matching processes will be highlighted in the process list
4. Search is case-insensitive

### Quick Actions

#### Stop All Threats
- Clicks the "Stop All Threats" button
- Terminates all processes identified as threats
- Also clears simulated threats from the Threat Laboratory

#### Shutdown PC
- Shows a confirmation dialog
- If confirmed, initiates system shutdown
- **Warning**: This performs an actual system shutdown!

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KARAN-KAVACH                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐         ┌─────────────────────────────┐   │
│   │   React Frontend│ ◄─────► │    Flask Backend (API)      │   │
│   │   (Port 5173)   │  REST   │    (Port 5001)              │   │
│   └─────────────────┘         └─────────────────────────────┘   │
│                                          │                      │
│                                          ▼                      │
│                               ┌─────────────────────────────┐   │
│                               │   KaranKavach Engine        │   │
│                               │   - Process Scanner         │   │
│                               │   - Memory Monitor          │   │
│                               │   - LBR Reader (Intel)      │   │
│                               │   - Threat Analyzer         │   │
│                               └─────────────────────────────┘   │
│                                          │                      │
│                                          ▼                      │
│                               ┌─────────────────────────────┐   │
│                               │   Operating System APIs     │   │
│                               │   - psutil (cross-platform) │   │
│                               │   - MSR (Intel LBR)         │   │
│                               └─────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Supported Platforms

| Platform | Process Monitoring | Memory Analysis | LBR Support | Network Analysis |
|----------|-------------------|-----------------|-------------|------------------|
| **Windows (Intel)** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Windows (AMD)** | ✅ Full | ✅ Full | ❌ Not Available | ✅ Full |
| **macOS (Intel)** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **macOS (Apple Silicon)** | ✅ Full | ✅ Full | ❌ Not Available | ✅ Full |
| **Linux (Intel)** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Linux (AMD)** | ✅ Full | ✅ Full | ❌ Not Available | ✅ Full |
| **Linux (ARM)** | ✅ Full | ✅ Full | ❌ Not Available | ✅ Full |

> **Note**: LBR (Last Branch Record) is an Intel-exclusive hardware feature. On non-Intel systems, the LBR panel will show "Not Available" with an explanation.

---

## 🔧 Troubleshooting

### Backend Won't Start

```bash
# Check if port 5001 is in use
lsof -i :5001

# Kill the process using the port
kill -9 <PID>
```

### Frontend Shows "Disconnected"

1. Ensure backend is running on port 5001
2. Check browser console for CORS errors
3. Verify both servers are running

### LBR Shows "Not Available"

This is expected on:
- AMD processors
- Apple Silicon (M1/M2/M3) Macs
- ARM-based Linux systems

LBR is an Intel-only hardware feature.

### High CPU Usage

The monitoring system uses minimal resources, but if you experience issues:

```bash
# Reduce polling frequency in Dashboard.jsx
const POLL_INTERVAL = 5000; // Increase from 2000 to 5000
```

---

## 📄 License

This project is developed for educational and research purposes.

---

## 🔗 Related Documentation

- [How It Works](./HOW_IT_WORKS.md) - Detailed technical documentation
- [Presentation](./PRESENTATION.md) - Hackathon presentation slides

---

**KARAN-KAVACH** - *Protecting systems at the hardware level*
