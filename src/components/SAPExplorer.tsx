import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Truck, FileText, ChevronRight, Activity } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const SAPExplorer = () => {
    const { theme } = usePortfolio();
    const [activeNode, setActiveNode] = useState(0);

    const themeColors: Record<string, string> = {
        cyan: "#00f3ff",
        magenta: "#ff00ff",
        amber: "#f59e0b",
        emerald: "#10b981",
        ruby: "#ef4444"
    };
    const currentColor = themeColors[theme] || themeColors.cyan;

    const nodes = [
        {
            title: 'Sales Order',
            tcode: 'VA01',
            icon: <FileText size={24} />,
            description: 'The starting point of the OTC cycle. Capturing customer requirements and pricing.',
            details: ['Table: VBAK, VBAP', 'Logic: Condition Technique', 'Pricing: MWST, PR00']
        },
        {
            title: 'Outbound Delivery',
            tcode: 'VL01N',
            icon: <Truck size={24} />,
            description: 'Material movement and shipping. Linking inventory to customer demand.',
            details: ['Table: LIKP, LIPS', 'Process: Picking & Packing', 'Integration: MM/WM']
        },
        {
            title: 'Billing Document',
            tcode: 'VF01',
            icon: <Database size={24} />,
            description: 'Financial settlement and invoice generation for the customer.',
            details: ['Table: VBRK, VBRP', 'Integration: FI/CO', 'Output: RD00']
        }
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-widest">SAP OTC Architecture</h2>
                    <p className="text-white/30 font-mono text-xs uppercase tracking-[0.3em]">Interactive Process Mapping</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Flow */}
                    <div className="relative flex flex-col items-center gap-8">
                        {nodes.map((node, i) => (
                            <React.Fragment key={i}>
                                <motion.div 
                                    onClick={() => setActiveNode(i)}
                                    className={`relative z-10 w-full max-w-sm p-6 rounded-2xl border transition-all cursor-pointer group ${activeNode === i ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${activeNode === i ? 'text-black bg-primary' : 'text-primary bg-primary/10'}`}>
                                            {node.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white uppercase tracking-wider">{node.title}</h3>
                                            <p className="text-[10px] font-mono text-primary font-bold">{node.tcode}</p>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={18} className="text-primary" />
                                        </div>
                                    </div>
                                </motion.div>
                                {i < nodes.length - 1 && (
                                    <div className="w-1 h-12 bg-gradient-to-b from-primary/40 to-primary/5 rounded-full"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Node Details */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeNode}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-surface/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Activity className="text-primary animate-pulse" size={20} />
                                    <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">Logic Analysis</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-white mb-4">{nodes[activeNode].title}</h3>
                                <p className="text-white/50 leading-relaxed mb-8 font-light italic">"{nodes[activeNode].description}"</p>
                                
                                <div className="space-y-4">
                                    {nodes[activeNode].details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-xl">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,1)]"></div>
                                            <span className="text-sm font-mono text-white/80">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default SAPExplorer;
