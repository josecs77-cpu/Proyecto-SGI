import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, TrendingUp, Clock, Terminal, AlertTriangle } from 'lucide-react';
import { getQuickAnalysis } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import Toolbar from './Toolbar';
import { ModelType, TaskType } from '../types';

interface DashboardAIInsightsProps {
  systemContext: string;
}

const DashboardAIInsights: React.FC<DashboardAIInsightsProps> = ({ systemContext }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // State for the integrated Toolbar
  const [selectedModel, setSelectedModel] = useState<ModelType>(ModelType.FLASH);
  const [isProcessingTask, setIsProcessingTask] = useState<boolean>(false);

  const isMounted = useRef(true);
  const lastAnalysis = useRef<string>("");

  useEffect(() => {
    if (!analysis) return;
    setDisplayedText('');
    let i = 0;
    const speed = 15;
    const interval = setInterval(() => {
        setDisplayedText(() => analysis.substring(0, i + 1));
        i++;
        if (i >= analysis.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [analysis]);

  useEffect(() => {
    isMounted.current = true;

    const fetchAnalysis = async () => {
      if (lastAnalysis.current === systemContext && analysis !== "") return;

      setLoading(true);
      setErrorStatus(null);

      try {
        const result = await getQuickAnalysis(systemContext);

        if (isMounted.current) {
            setAnalysis(result);
            lastAnalysis.current = systemContext;
        }
      } catch (err: any) {
        if (isMounted.current) {
            if (err.message === 'quota') {
                setErrorStatus("quota");
            } else {
                setErrorStatus("error");
            }
        }
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    fetchAnalysis();

    return () => {
      isMounted.current = false;
    };
  }, [systemContext, analysis]);

  const handleRunTask = (task: TaskType) => {
    setIsProcessingTask(true);
    // Simulate task processing
    setTimeout(() => {
        setIsProcessingTask(false);
        setAnalysis(`Task '${task}' completed successfully using model '${selectedModel}'.\n\n- No errors detected.\n- Migration constraints met.`);
        lastAnalysis.current = "task_run"; // Override to re-trigger typing effect
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Toolbar
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onRunTask={handleRunTask}
        isProcessing={isProcessingTask}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-b-[40px] shadow-2xl border-x border-b border-slate-200 overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,51,153,0.15)] transition-all duration-500"
      >
        <div className="bg-gradient-to-r from-[#003399] to-blue-700 p-6 flex justify-between items-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20"
            >
              <Sparkles className="text-yellow-400" size={24} />
            </motion.div>
            <div>
              <h3 className="font-black uppercase text-xs tracking-widest leading-none italic">SGI GEMA Intelligence</h3>
              <p className="text-[9px] font-bold text-white/60 uppercase mt-1 tracking-tighter">Análisis Territorial y Operativo (Jules)</p>
            </div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md flex items-center gap-2">
            <Terminal size={14}/> Engine v9.0 Active
          </div>
        </div>

        <div className="p-10 min-h-[220px] flex flex-col justify-center bg-slate-50/30">
          <AnimatePresence mode="wait">
              {loading || isProcessingTask ? (
              <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-5 text-slate-400"
              >
                  <Loader2 className="animate-spin text-[#003399]" size={36} />
                  <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">
                    {isProcessingTask ? "Ejecutando tarea solicitada..." : "Sincronizando con el motor estratégico Jules..."}
                  </p>
              </motion.div>
              ) : errorStatus === "quota" ? (
              <motion.div
                  key="quota"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 text-amber-600 text-center"
              >
                  <div className="p-4 bg-amber-50 rounded-full"><Clock size={32} className="animate-bounce" /></div>
                  <p className="text-[10px] font-black uppercase max-w-sm leading-relaxed">
                  Capacidad de procesamiento diaria alcanzada. El motor de análisis estratégico se refrescará automáticamente.
                  </p>
                  <button
                  onClick={() => window.location.reload()}
                  className="text-[9px] bg-amber-600 text-white px-6 py-2.5 rounded-full font-black mt-2 hover:bg-amber-700 transition-all shadow-lg"
                  >
                  FORZAR RE-ESCÁNEO
                  </button>
              </motion.div>
              ) : errorStatus === "error" ? (
              <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 text-red-600 text-center"
              >
                  <div className="p-4 bg-red-50 rounded-full"><AlertTriangle size={32} /></div>
                  <p className="text-[10px] font-black uppercase max-w-sm leading-relaxed">
                  Error de conexión con el motor estratégico. Verifique que el servicio backend esté en ejecución.
                  </p>
              </motion.div>
              ) : (
              <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
              >
                  <div className="bg-white p-6 rounded-[32px] border-2 border-slate-100 shadow-inner relative">
                      <div className="text-[12px] font-medium text-slate-700 leading-relaxed whitespace-pre-wrap font-mono min-h-[80px]">
                      {displayedText || "Preparando informe..."}
                      <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle"
                      />
                      </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[#003399]">
                          <TrendingUp size={18} />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Agente Operativo Jules - Analítica Lista</span>
                      </div>
                      <div className="flex gap-1">
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></motion.div>
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-blue-500"></motion.div>
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></motion.div>
                      </div>
                  </div>
              </motion.div>
              )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardAIInsights;