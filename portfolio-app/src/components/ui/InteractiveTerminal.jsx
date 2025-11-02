"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const InteractiveTerminal = ({ onNavigate, handleResumeView, handleResumeDownload }) => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState(['Type "help" to see available commands']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show all available commands',
      execute: () => [
        '📋 Available Commands:',
        '─────────────────────────────────────',
        'whoami            - Display your information',
        'skills            - Navigate to skills section',
        'projects          - Navigate to projects section',
        'achievements      - Navigate to achievements section',
        'gallery           - Navigate to gallery section',
        'contact           - Navigate to contact section',
        'resume view       - Open resume in new tab',
        'resume dl         - Download resume',
        'clear             - Clear terminal screen',
        '─────────────────────────────────────',
        '💡 Tip: Use arrow keys to navigate command history'
      ]
    },
    whoami: {
      description: 'Display your information',
      execute: () => [
        '👤 Shanavas V Basheer',
        '─────────────────────────────────────',
        '📍 Location: Kochi, Kerala, India',
        '🎓 Education: M.Voc in Software Application Development (CUSAT)',
        '💼 Role: Full-Stack Developer | Competitive Coder',
        '📧 Email: shanavasvbasheer@gmail.com',
        '📱 Phone: +91 85473 63158',
        '💻 GitHub: github.com/shanavasvbasheer',
        '🔗 LinkedIn: linkedin.com/in/shanavasvbasheer',
        '─────────────────────────────────────',
        '✨ Status: Available for opportunities'
      ]
    },
    skills: {
      description: 'Navigate to skills section',
      execute: () => {
        onNavigate('skills');
        return ['✅ Navigating to Skills section...'];
      }
    },
    projects: {
      description: 'Navigate to projects section',
      execute: () => {
        onNavigate('projects');
        return ['✅ Navigating to Projects section...'];
      }
    },
    achievements: {
      description: 'Navigate to achievements section',
      execute: () => {
        onNavigate('achievements');
        return ['✅ Navigating to Achievements section...'];
      }
    },
    gallery: {
      description: 'Navigate to gallery section',
      execute: () => {
        onNavigate('gallery');
        return ['✅ Navigating to Gallery section...'];
      }
    },
    contact: {
      description: 'Navigate to contact section',
      execute: () => {
        onNavigate('contact');
        return ['✅ Navigating to Contact section...'];
      }
    },
    'resume view': {
      description: 'Open resume in new tab',
      execute: () => {
        handleResumeView();
        return ['✅ Opening resume in new tab...'];
      }
    },
    'resume dl': {
      description: 'Download resume',
      execute: () => {
        handleResumeDownload();
        return ['✅ Downloading resume...'];
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => null
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') {
      return;
    }

    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    const command = commands[trimmedCmd];
    
    let output;
    if (command) {
      output = command.execute();
    } else {
      output = [`❌ Command not found: "${trimmedCmd}". Type "help" for available commands.`];
    }

    if (output) {
      setHistory([...history, `$ ${cmd}`, ...output, '']);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/40 hover:border-cyan-500/80 transition-all duration-300 hover:shadow-cyan-500/30 hover:shadow-2xl bg-gray-900 group">
      {/* Terminal Header with Traffic Lights */}
      <div className="bg-gray-800 px-4 py-3 flex gap-3 items-center border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" title="Close" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer transition-colors" title="Maximize" />
        </div>
        <div className="ml-4 text-gray-400 text-sm font-mono flex-1">Portfolio Terminal</div>
        <Terminal size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
      </div>

      {/* Terminal Content Area */}
      <div
        ref={terminalRef}
        className="bg-gray-900 p-6 font-mono text-sm h-64 overflow-y-auto scrollbar-hide text-gray-100"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`transition-colors duration-300 ${
              line.startsWith('$') ? 'text-cyan-400 font-semibold' :
              line.startsWith('✅') ? 'text-emerald-400' :
              line.startsWith('❌') ? 'text-red-400' :
              line.startsWith('📋') || line.startsWith('👤') || line.startsWith('─') ? 'text-cyan-300' :
              'text-gray-100'
            }`}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input Line */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex items-center gap-2">
        <span className="text-cyan-400 font-mono font-semibold">svb@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-600 focus:placeholder-gray-500 transition-colors caret-cyan-400"
          autoFocus
        />
      </div>
    </div>
  );
};