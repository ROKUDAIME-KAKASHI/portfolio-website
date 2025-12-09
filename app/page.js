"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sun, Moon, Briefcase, User, Mail, FileText, Grid, Sparkles, ExternalLink, Github } from 'lucide-react';

// ---------- Mock data / utilities ----------
const statsMock = {
    modelsDeployed: 15,
    datasets: 28,
    accuracy: 94.5,
    publications: 3,
};

const visitorsSeries = [
    { day: 'Mon', visitors: 800 },
    { day: 'Tue', visitors: 1200 },
    { day: 'Wed', visitors: 1600 },
    { day: 'Thu', visitors: 900 },
    { day: 'Fri', visitors: 2000 },
    { day: 'Sat', visitors: 1400 },
    { day: 'Sun', visitors: 1558 },
];

const initialProjects = [
    {
        id: 1, title: 'Neural Style Transfer Engine', desc: 'Real-time artistic style transfer using CNNs with TensorFlow.js, deployed as web app', tags: ['Deep Learning', 'CNN', 'TensorFlow.js'], live: '#', repo: '#'
    },
    {
        id: 2, title: 'Sentiment Analysis API', desc: 'NLP-based sentiment classifier using BERT, FastAPI backend with 95% accuracy', tags: ['NLP', 'BERT', 'FastAPI'], live: '#', repo: '#'
    },
    {
        id: 3, title: 'Computer Vision Object Detector', desc: 'YOLOv8-based real-time object detection system with custom dataset training', tags: ['Computer Vision', 'YOLO', 'PyTorch'], live: '#', repo: '#'
    },
];

// ---------- Main App ----------
export default function PortfolioDashboard() {
    const [dark, setDark] = useState(true);
    const [route, setRoute] = useState('home');
    const [projects, setProjects] = useState(initialProjects);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFeaturedProject, setShowFeaturedProject] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const themeClass = dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900';
    
    const navItems = [
        { name: 'Home', icon: <User size={20} />, route: 'home' },
        { name: 'Dashboard', icon: <Grid size={20} />, route: 'dashboard' },
        { name: 'Projects', icon: <Briefcase size={20} />, route: 'projects' },
        { name: 'About', icon: <FileText size={20} />, route: 'about' },
        { name: 'Contact', icon: <Mail size={20} />, route: 'contact' },
    ];

    // PROJECT CRUD
    function addProject(payload) {
        const id = Math.max(0, ...projects.map(p => p.id)) + 1;
        setProjects(prev => [{ id, ...payload }, ...prev]);
    }
    function updateProject(id, payload) {
        setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...payload } : p)));
    }
    function deleteProject(id) {
        setProjects(prev => prev.filter(p => p.id !== id));
    }

    return (
        <div className={`min-h-screen w-full flex flex-col lg:flex-row ${themeClass} transition-colors duration-300`}>
            {/* SIDEBAR - MOBILE BUTTON */}
            <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl ${dark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    animate={{ rotate: sidebarOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </motion.div>
            </motion.button>

            {/* SIDEBAR - DESKTOP & MOBILE */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-full sm:w-64 ${dark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} border-r p-6 sm:p-8 flex flex-col gap-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:relative fixed lg:translate-x-0 z-40 lg:z-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300`}
            >
                <motion.div
                    className="flex items-center justify-between gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex-1">
                        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Jinto Johnson</h1>
                        <p className="text-xs text-slate-500 mt-1">AI/ML Engineer</p>
                    </div>
                    <motion.button
                        aria-label="toggle-dark"
                        onClick={() => setDark(d => !d)}
                        className={`p-2 rounded-lg ${dark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {dark ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.button>
                </motion.div>

                <nav className="flex flex-col gap-1" onClick={() => setSidebarOpen(false)}>
                    {navItems.map((item, i) => (
                        <motion.button
                            key={item.route}
                            onClick={() => setRoute(item.route)}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                                route === item.route
                                    ? dark
                                        ? 'bg-slate-800 text-white'
                                        : 'bg-slate-100 text-slate-900'
                                    : dark
                                        ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {item.icon}
                            <span className="text-sm font-medium">{item.name}</span>
                        </motion.button>
                    ))}
                </nav>

                <div className={`mt-auto pt-6 border-t ${dark ? 'border-slate-800' : 'border-slate-200'} text-xs text-slate-500`}>
                    <p>Portfolio Dashboard</p>
                </div>
            </motion.aside>

            {/* MAIN */}
            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen">
                <Header route={route} stats={statsMock} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={route}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-8"
                    >
                        {route === 'home' && <Home projects={projects} setRoute={setRoute} showFeaturedProject={showFeaturedProject} setShowFeaturedProject={setShowFeaturedProject} />}
                        {route === 'dashboard' && (
                            <Dashboard stats={statsMock} visitors={visitorsSeries} projects={projects} onSelectProject={p => {
                                setSelectedProject(p); setRoute('projects');
                            }} />
                        )}
                        {route === 'projects' && (
                            <ProjectsPage projects={projects} onAdd={addProject} onUpdate={updateProject} onDelete={deleteProject}
                                selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                        )}
                        {route === 'about' && <About />}
                        {route === 'contact' && <Contact />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}


// ---------- Small components ----------
function Header({ route, stats }) {
    return (
        <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div>
                <h2 className="text-3xl font-bold capitalize tracking-tight">{route}</h2>
                <p className="text-sm text-slate-500 mt-1">Welcome to your portfolio dashboard</p>
            </div>
            <motion.div
                className="flex flex-wrap gap-3 items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex flex-wrap gap-3">
                    <Stat label="Models" value={stats.modelsDeployed} />
                    <Stat label="Datasets" value={stats.datasets} />
                    <Stat label="Accuracy" value={`${stats.accuracy}%`} />
                </div>
            </motion.div>
        </motion.div>
    );
}

function Stat({ label, value }) {
    return (
        <motion.div
            className="bg-slate-100 dark:bg-slate-800 px-3 py-2 lg:px-4 lg:py-3 rounded-lg text-center border border-slate-200 dark:border-slate-700 hover-lift depth-shadow-lg cursor-pointer perspective"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            whileHover={{
                rotateY: 5,
                rotateX: -5
            }}
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate" style={{ y: 0 }}>
                {label}
            </motion.div>
            <motion.div 
                className="text-lg lg:text-2xl font-bold mt-2 gradient-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
                {value}
            </motion.div>
        </motion.div>
    );
}



function Home({ projects, setRoute, showFeaturedProject, setShowFeaturedProject }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            <motion.section
                className="col-span-1 lg:col-span-2 w-full"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
            >
                <motion.div 
                    className="rounded-xl p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg perspective card-3d w-full"
                    whileHover={{ rotateY: 2, rotateX: -1 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Profile Section */}
                    <div className="flex flex-col gap-6 mb-6 sm:mb-8">
                        <div className="flex-shrink-0">
                            <motion.div
                                className="relative w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg perspective card-3d"
                                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 10,
                                    rotateX: -5,
                                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <img
                                    src="/profile.jpg"
                                    alt="Jinto Johnson C"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>

                        <div className="flex-1">
                            <motion.h3
                                className="text-3xl font-bold"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                Hi, I'm Jinto Johnson C
                            </motion.h3>
                            <motion.p 
                                className="text-gray-700 dark:text-gray-300 font-semibold mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                AI/ML Engineer
                            </motion.p>
                            <motion.p
                                className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                            >
                                I specialize in developing cutting-edge machine learning models and deploying scalable AI solutions.
                            </motion.p>
                        </div>
                    </div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setRoute('projects')}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-900 hover:to-black transition shadow-lg shadow-gray-900/50 button-ripple hover-lift text-sm sm:text-base"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setRoute('contact')}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition hover-lift text-sm sm:text-base"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-gray-700 dark:text-gray-400"
                                >
                                    <Sparkles size={18} />
                                </motion.div>
                                Featured Project
                            </h4>
                            <motion.button
                                onClick={() => setShowFeaturedProject(!showFeaturedProject)}
                                className="px-3 py-1 rounded text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {showFeaturedProject ? 'Hide' : 'Show'}
                            </motion.button>
                        </div>
                        <AnimatePresence>
                            {showFeaturedProject && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <motion.div
                                        className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover-lift depth-shadow perspective card-3d"
                                        whileHover={{ 
                                            scale: 1.02,
                                            rotateY: 3,
                                            rotateX: -2
                                        }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <h5 className="font-bold">{projects[0].title}</h5>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{projects[0].desc}</p>
                                        <div className="mt-3 flex gap-2 flex-wrap">
                                            {projects[0].tags.map((t, i) => (
                                                <motion.span
                                                    key={t}
                                                    className="px-2.5 py-1 rounded text-xs font-medium bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 200 }}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.aside
                className="col-span-1 lg:col-span-1 w-full"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 80, delay: 0.1 }}
            >
                <motion.div 
                    className="rounded-xl p-4 sm:p-6 lg:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg h-fit perspective card-3d w-full"
                    whileHover={{ rotateY: -2, rotateX: 1 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <h4 className="font-semibold text-base sm:text-lg">Core Skills</h4>
                    <motion.ul className="mt-4 text-xs sm:text-sm space-y-2 sm:space-y-3">
                        {['PyTorch • TensorFlow', 'Computer Vision • NLP', 'MLOps • Docker', 'Transformers • BERT'].map((skill, i) => (
                            <motion.li
                                key={i}
                                className="text-slate-600 dark:text-slate-400 flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55 + i * 0.08 }}
                                whileHover={{ x: 8, color: '#6366f1' }}
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                >
                                    ✓
                                </motion.span>
                                {skill}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </motion.aside>
        </div>
    );
}

function Dashboard({ stats, visitors, projects, onSelectProject }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <motion.div
                className="col-span-1 lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg perspective card-3d w-full"
                initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 80 }}
                whileHover={{ rotateY: 1, rotateX: 0 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <h4 className="font-semibold text-base sm:text-lg">Traffic Analytics</h4>
                <div style={{ height: 250 }} className="mt-4 sm:mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={visitors}>
                            <XAxis dataKey="day" tick={{fontSize: 12}} />
                            <YAxis tick={{fontSize: 12}} />
                            <Tooltip />
                            <Line type="monotone" dataKey="visitors" strokeWidth={2} stroke="#374151" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                className="rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg perspective card-3d w-full"
                initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
                whileHover={{ rotateY: -1, rotateX: 0 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <h4 className="font-semibold text-base sm:text-lg">Projects</h4>
                <div className="mt-4 sm:mt-6">
                    <BarChartMini data={projects} onSelect={onSelectProject} />
                </div>
            </motion.div>

            <motion.div
                className="col-span-1 lg:col-span-3 rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg perspective card-3d w-full"
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
                whileHover={{ rotateY: 1, rotateX: 0 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <h4 className="font-semibold text-base sm:text-lg mb-4">Recent Projects</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {projects.map((p, i) => (
                        <div key={p.id} className="w-full">
                            <motion.div
                                className="p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-full flex flex-col hover-lift perspective card-3d"
                                initial={{ opacity: 0, y: 10, rotateY: -15 }}
                                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.02, rotateY: 5, rotateX: -2 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <h5 className="font-semibold text-sm sm:text-base">{p.title}</h5>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 flex-1">{p.desc}</p>
                                <div className="mt-3 sm:mt-4 flex gap-2 flex-wrap">
                                    <motion.button
                                        onClick={() => onSelectProject(p)}
                                        className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black transition font-medium"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Open
                                    </motion.button>
                                    <motion.a
                                        href={p.live}
                                        className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition font-medium"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Live
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

function BarChartMini({ data, onSelect }) {
    const bars = data.map(d => ({ name: d.title.substring(0, 10), count: d.tags.length }));
    return (
        <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bars} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function ProjectsPage({ projects, onAdd, onUpdate, onDelete, selectedProject, setSelectedProject }) {
    const [form, setForm] = useState({ title: '', desc: '', tags: '' });

    function submit(e) {
        e.preventDefault();
        if (!form.title) return;
        const payload = {
            title: form.title, desc: form.desc, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
            live: '#', repo: '#'
        };
        onAdd(payload);
        setForm({ title: '', desc: '', tags: '' });
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <motion.div
                className="col-span-1 lg:col-span-2 rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg perspective card-3d w-full"
                initial={{ opacity: 0, x: -20, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 80 }}
                whileHover={{ rotateY: 2 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Projects</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {projects.length === 0 ? (
                        <p className="text-xs sm:text-sm text-slate-500 py-8 text-center">No projects yet. Add one to get started!</p>
                    ) : (
                        projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                            className="p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 hover:border-gray-500 transition hover-lift perspective card-3d"
                                initial={{ opacity: 0, x: -10, rotateY: -15 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                                whileHover={{ x: 4, rotateY: 3, rotateX: -1 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm sm:text-base truncate">{p.title}</div>
                                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{p.desc}</div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                                    <motion.button
                                        onClick={() => setSelectedProject(p)}
                                        className="flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 rounded text-xs font-medium border border-slate-300 dark:border-slate-600 hover:border-gray-500 transition"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Edit
                                    </motion.button>
                                    <motion.button
                                        onClick={() => onDelete(p.id)}
                                        className="flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            <motion.aside
                className="rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg h-fit perspective card-3d w-full"
                initial={{ opacity: 0, x: 20, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
                whileHover={{ rotateY: -2 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Add Project</h4>
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Title</label>
                        <motion.input
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Project title"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none transition"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Tags</label>
                        <motion.input
                            value={form.tags}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            placeholder="Tags (comma separated)"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none transition"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Description</label>
                        <motion.textarea
                            value={form.desc}
                            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                            placeholder="Project description"
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none transition resize-none"
                            rows="3"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <motion.button
                            type="submit"
                            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-900 hover:to-black transition shadow-lg shadow-gray-900/30 button-ripple hover-lift"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Add
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={() => { setForm({ title: '', desc: '', tags: '' }); setSelectedProject(null); }}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-semibold hover-lift"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset
                        </motion.button>
                    </div>
                </form>

                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <h5 className="font-semibold text-sm">Edit Project</h5>
                            <ProjectEditor project={selectedProject} onSave={(id, payload) => { onUpdate(id, payload); setSelectedProject(null); }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </div>
    );
}

function ProjectEditor({ project, onSave }) {
    const [local, setLocal] = useState({ ...project, tags: project.tags.join(', ') });
    return (
        <form onSubmit={e => { e.preventDefault(); onSave(project.id, { ...local, tags: local.tags.split(',').map(s => s.trim()).filter(Boolean) }); }} className="space-y-2 mt-3">
            <input value={local.title} onChange={e => setLocal(l => ({ ...l, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none text-sm" />
            <input value={local.tags} onChange={e => setLocal(l => ({ ...l, tags: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none text-sm" />
            <textarea value={local.desc} onChange={e => setLocal(l => ({ ...l, desc: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none resize-none text-sm" rows="2" />
            <motion.button
                type="submit"
                className="w-full px-3 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Save Changes
            </motion.button>
        </form>
    );
}

function About() {
    return (
        <motion.div
            className="rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg w-full perspective card-3d"
            initial={{ opacity: 0, scale: 0.95, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            whileHover={{ rotateX: 2, rotateY: 1 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            <h3 className="text-xl sm:text-2xl font-bold">About Me</h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I'm an AI/ML engineer with expertise in deep learning, computer vision, and natural language processing. My work focuses on building state-of-the-art models, optimizing neural architectures, and deploying scalable ML systems in production environments.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -15, rotateY: -20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    className="p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover-lift perspective card-3d"
                    whileHover={{ rotateY: 10, rotateX: -5 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <h5 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-300">Education</h5>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">Computer Science & AI Specialization</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 15, rotateY: 20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover-lift perspective card-3d"
                    whileHover={{ rotateY: -10, rotateX: -5 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <h5 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-300">Focus Areas</h5>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">Deep Learning • Vision • NLP</p>
                </motion.div>
            </div>
        </motion.div>
    );
}

function Contact() {
    return (
        <motion.div
            className="rounded-xl bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 hover-lift depth-shadow-lg w-full perspective card-3d"
            initial={{ opacity: 0, scale: 0.95, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            whileHover={{ rotateX: -2, rotateY: 1 }}
            style={{ transformStyle: "preserve-3d" }}
        >
            <h3 className="text-xl sm:text-2xl font-bold">Get In Touch</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">Feel free to reach out for collaborations or just a friendly hello.</p>

            <motion.div
                className="mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <motion.a
                    href="https://www.linkedin.com/in/jinto-johnson-c-bb11b1271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-900 hover:to-black transition shadow-lg shadow-gray-900/50 button-ripple hover-lift text-xs sm:text-sm"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                </motion.a>
            </motion.div>

            <form className="mt-6 sm:mt-8 grid gap-3 sm:gap-4">
                <div>
                    <label className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Name</label>
                    <motion.input
                        placeholder="Your name"
                        className="w-full mt-1 sm:mt-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none transition text-sm"
                        whileFocus={{ scale: 1.01, y: -2 }}
                    />
                </div>
                <div>
                    <label className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
                    <motion.input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full mt-1 sm:mt-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none transition text-sm"
                        whileFocus={{ scale: 1.01, y: -2 }}
                    />
                </div>
                <div>
                    <label className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Message</label>
                    <motion.textarea
                        placeholder="Your message here..."
                        className="w-full mt-1 sm:mt-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-gray-500 outline-none resize-none transition text-sm"
                        rows="4"
                        whileFocus={{ scale: 1.01, y: -2 }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <motion.button
                        type="submit"
                        className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold hover:from-gray-900 hover:to-black transition shadow-lg shadow-gray-900/30 button-ripple hover-lift text-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                    <motion.button
                        type="reset"
                        className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition hover-lift text-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
